# serializers.py
from rest_framework import serializers
from asset_manager.models import Asset, AssetCategory, AssetSubcategory, AssetLocation, AssetSerialNumber

from audit_fields.serializers import AuditModelMixinSerializer


class AssetCategorySerializer(AuditModelMixinSerializer):
    class Meta:
        model = AssetCategory
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)


class AssetSubcategorySerializer(AuditModelMixinSerializer):
    class Meta:
        model = AssetSubcategory
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)


class AssetSerialNumberSerializer(AuditModelMixinSerializer):
    class Meta:
        model = AssetSerialNumber
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)


class AssetSerializer(AuditModelMixinSerializer):
    asset_serial_numbers = AssetSerialNumberSerializer(many=True,required=False)

    class Meta:
        model = Asset
        fields = '__all__'

    def create(self, validated_data):
        return super().create(validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Include the names of related AssetCategory and AssetSubcategory instances
        if 'asset_category' in data and instance.asset_category is not None:
            data['asset_category_name'] = instance.asset_category.category

        if 'asset_subcategory' in data and instance.asset_subcategory is not None:
            data['asset_subcategory_name'] = instance.asset_subcategory.subcategory
        return data


class AssetLocationSerializer(AuditModelMixinSerializer):
    class Meta:
        model = AssetLocation
        fields = '__all__'
