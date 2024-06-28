import re

from django.db import IntegrityError
from rest_framework import serializers

from audit_fields.serializers import AuditModelMixinSerializer
from inventory.models import GoodsReceiptNote, GoodsReceiptNoteItem
from utils.constants import NumberConstructorConstants
from utils.number_constuctor import NumberConstructor

from asset_manager.models import AssetSerialNumber


class GoodsReceiptNoteItemSerializer(AuditModelMixinSerializer):
    class Meta:
        model = GoodsReceiptNoteItem
        fields = '__all__'

    def to_internal_value(self, data):
        # Extract the field that is not validated but needs to be included
        asset_serial_numbers = data.get('asset_serial_numbers', None)
        data.pop('asset_code', None)
        data.pop('asset_name', None)
        data.pop('asset_description', None)
        # print("asset_serial_numbers_instance", asset_serial_numbers)
        if asset_serial_numbers is not None:
            asset = data.get('asset', None)
            serial_numbers = re.split(r'[\n,]+', asset_serial_numbers)
            # Create Purchase Order Item instances related to the VendorMaster using bulk_create
            for number in serial_numbers:
                if AssetSerialNumber.objects.filter(asset_id=asset, serial_number=number).exists():
                    pass
                else:
                    AssetSerialNumber.objects.create(asset_id=asset, serial_number=number)
        # Call the parent class method to handle the remaining validation
        validated_data = super().to_internal_value(data)
        return validated_data

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.asset is not None:
            data['asset_code'] = instance.asset.asset_code
            data['asset_name'] = instance.asset.asset_name
            data['asset_description'] = instance.asset.asset_description
        return data


class GoodsReceiptNoteSerializer(AuditModelMixinSerializer):
    grn_items = GoodsReceiptNoteItemSerializer(many=True)

    class Meta:
        model = GoodsReceiptNote
        fields = '__all__'

    def create(self, validated_data):
        # Extract nested data from validated_data
        grn_item_details = validated_data.pop('grn_items', [])
        # generate purchase order code.
        validated_data['grn_no'] = NumberConstructor().generate_next_sequence(
            NumberConstructorConstants.
            GRN_NUMBERING, False)
        validated_data['batch_no'] = NumberConstructor().generate_next_sequence(
            NumberConstructorConstants.
            BATCH_NUMBERING, False)

        # Create Purchase Order instance
        instance = super().create(validated_data)

        # Create Purchase Order Item instances related to the VendorMaster using bulk_create
        grn_item_instances = [GoodsReceiptNoteItem(grn=instance, **data) for data in
                              grn_item_details]
        GoodsReceiptNoteItem.objects.bulk_create(grn_item_instances)

        # Return the created VendorMaster instance
        return instance

    # def create_asset(self, grn_items):
    #      for item in grn_items:
    #          if 'asset' in grn_items:
    #      return

    # Update GRN
    def update(self, instance, validated_data):
        # Update or create grn items instances related to the GRN Model
        grn_item_data = self.initial_data.pop('grn_items', [])
        validated_data.pop('grn_items', [])

        existing_grn_item_items_ids = []
        for grn_item in grn_item_data:
            purchase_grn_item_instance = GoodsReceiptNoteItem.objects.filter(id=grn_item.get('id')).first()
            if purchase_grn_item_instance:
                existing_grn_item_items_ids.append(purchase_grn_item_instance.id)
                # Update existing instance
                GoodsReceiptNoteItem.objects.filter(id=purchase_grn_item_instance.id).update(**grn_item)
            else:
                # Create new instance
                new_grn_item_instance = GoodsReceiptNoteItem.objects.create(grn=instance,
                                                                            asset_id=grn_item.pop('asset',
                                                                                                  None),
                                                                            **grn_item)
                existing_grn_item_items_ids.append(new_grn_item_instance.id)

        # Delete GRN Items instances that were not provided in the update data
        instance.grn_items.exclude(id__in=[_id for _id in existing_grn_item_items_ids]).delete()

        return super().update(instance, validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.vendor is not None:
            data['vendor_name'] = instance.vendor.vendor_name
            data['vendor_address'] = instance.vendor.address_line1

        return data
