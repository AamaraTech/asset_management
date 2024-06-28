# serializers.py

from rest_framework import serializers
from master.models import VendorMaster, BankDetail, POCDetail, Department, Designation, EmployeeMaster
from audit_fields.serializers import AuditModelMixinSerializer
from utils.constants import NumberConstructorConstants
from utils.number_constuctor import NumberConstructor


class BankDetailSerializer(AuditModelMixinSerializer):
    class Meta:
        model = BankDetail
        fields = [
            'id',
            'bank_name',
            'branch_name',
            'account_name',
            'account_number',
            'swift_code',
            'routing_code'
        ]


class POCDetailSerializer(AuditModelMixinSerializer):
    class Meta:
        model = POCDetail
        fields = [
            'id',
            'name',
            'designation',
            'email',
            'phone_number'
        ]


class VendorMasterSerializer(AuditModelMixinSerializer):
    bank_details = BankDetailSerializer(many=True)
    poc_details = POCDetailSerializer(many=True)

    class Meta:
        model = VendorMaster
        fields = '__all__'

    def create(self, validated_data):
        # Extract nested data from validated_data
        bank_details_data = validated_data.pop('bank_details', [])
        poc_details_data = validated_data.pop('poc_details', [])

        # generate vendor code.
        validated_data['vendor_code'] = NumberConstructor().generate_next_sequence(NumberConstructorConstants.
                                                                                   VENDOR_NUMBERING, False)

        # Create VendorMaster instance
        vendor = VendorMaster.objects.create(**validated_data)

        # Create BankDetail instances related to the VendorMaster using bulk_create
        bank_details_instances = [BankDetail(vendor=vendor, **data) for data in bank_details_data]
        BankDetail.objects.bulk_create(bank_details_instances)

        # Create POCDetail instances related to the VendorMaster using bulk_create
        poc_details_instances = [POCDetail(vendor=vendor, **data) for data in poc_details_data]
        POCDetail.objects.bulk_create(poc_details_instances)

        # Return the created VendorMaster instance
        return vendor

    def update(self, instance, validated_data):
        # Update or create BankDetail instances related to the VendorMaster
        bank_details_data = self.initial_data.pop('bank_details', [])
        validated_data.pop('bank_details', [])
        existing_bank_details_ids = []
        for bank_detail_data in bank_details_data:
            bank_detail_instance = BankDetail.objects.filter(id=bank_detail_data.get('id')).first()
            if bank_detail_instance:
                existing_bank_details_ids.append(bank_detail_instance.id)
                # Update existing instance
                BankDetail.objects.filter(id=bank_detail_instance.id).update(**bank_detail_data)
            else:
                # Create new instance
                new_bank_instance = BankDetail.objects.create(vendor=instance, **bank_detail_data)
                existing_bank_details_ids.append(new_bank_instance.id)

        # Update or create POCDetail instances related to the VendorMaster
        poc_details_data = self.initial_data.pop('poc_details', [])
        validated_data.pop('poc_details', [])
        existing_poc_details_ids = []
        for poc_detail_data in poc_details_data:
            poc_detail_instance = POCDetail.objects.filter(id=poc_detail_data.get('id')).first()
            if poc_detail_instance:
                existing_poc_details_ids.append(poc_detail_instance.id)
                # Update existing instance
                POCDetail.objects.filter(id=poc_detail_instance.id).update(**poc_detail_data)
            else:
                # Create new instance
                new_poc_instance = POCDetail.objects.create(vendor=instance, **poc_detail_data)
                existing_poc_details_ids.append(new_poc_instance.id)

        # Delete BankDetail instances that were not provided in the update data
        instance.bank_details.exclude(id__in=[_id for _id in existing_bank_details_ids]).delete()

        # Delete POCDetail instances that were not provided in the update data
        instance.poc_details.exclude(id__in=[_id for _id in existing_poc_details_ids]).delete()

        return super().update(instance, validated_data)


class DepartmentSerializer(AuditModelMixinSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class DesignationSerializer(AuditModelMixinSerializer):
    class Meta:
        model = Designation
        fields = '__all__'


class EmployeeMasterSerializer(AuditModelMixinSerializer):
    class Meta:
        model = EmployeeMaster
        fields = '__all__'
