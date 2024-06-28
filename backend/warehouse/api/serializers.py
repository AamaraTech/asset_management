# serializers.py
from rest_framework import serializers
from asset_manager.models import Asset, AssetCategory, AssetSubcategory

from warehouse.models import Store, Warehouse, AppSettings, AppEnums
from audit_fields.serializers import AuditModelMixinSerializer


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = '__all__'


class WarehouseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Warehouse
        fields = '__all__'


class AppSettingsSerializer(AuditModelMixinSerializer):
    class Meta:
        model = AppSettings
        fields = '__all__'


class AppEnumsSerializer(AuditModelMixinSerializer):
    class Meta:
        model = AppEnums
        fields = '__all__'

    def create(self, validated_data):
        enum_key = validated_data.get("enum_key", None)
        enum_value = validated_data.get("enum_value", None)
        if enum_key:
            existing_app_enum = AppEnums.objects.filter(enum_key=enum_key).first()
            if existing_app_enum:
                existing_enum_value = existing_app_enum.enum_value
                if existing_enum_value:
                    if isinstance(existing_enum_value, list):
                        exists = any(item['name'] == enum_value for item in existing_enum_value)
                        if exists:
                            pass
                        else:
                            existing_enum_value.append({"id": enum_value, "name": enum_value})
                    else:
                        existing_enum_value = [{"id": existing_enum_value, "name": existing_enum_value},
                                               {"id": enum_value, "name": enum_value}]
                else:
                    existing_enum_value = [{"id": enum_value, "name": enum_value}]
                existing_app_enum.enum_value = existing_enum_value
                existing_app_enum.save()
                return existing_app_enum
        new_app_enum = AppEnums(enum_key=enum_key,
                                enum_value=[{"id": enum_value, "name": enum_value}])
        new_app_enum.save()
        return new_app_enum

    def validate(self, attrs):
        enum_key = attrs.get("enum_key", None)
        enum_value = attrs.get("enum_value", None)
        if enum_value is None or enum_value.strip() == "":
            raise serializers.ValidationError("Value cannot be empty")
        if enum_key and enum_value:
            existing_app_enums = AppEnums.objects.filter(enum_key__iexact=enum_key)
            for existing_app_enum in existing_app_enums:
                existing_enum_values = existing_app_enum.enum_value
                if isinstance(existing_enum_values, list):
                    for existing_value in existing_enum_values:
                        if existing_value.get("name").strip().lower() == enum_value.strip().lower():
                            raise serializers.ValidationError(
                                f"{enum_value} already exists."
                            )

        return attrs
