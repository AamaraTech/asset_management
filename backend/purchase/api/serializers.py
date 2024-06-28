from audit_fields.serializers import AuditModelMixinSerializer
from purchase.models import PurchaseOrder, PurchaseOrderItem
from utils.constants import NumberConstructorConstants
from utils.number_constuctor import NumberConstructor


class PurchaseOrderItemsSerializer(AuditModelMixinSerializer):
    class Meta:
        model = PurchaseOrderItem
        fields = '__all__'

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.asset is not None:
            data['asset_code'] = instance.asset.asset_code
            data['asset_name'] = instance.asset.asset_name
            data['asset_description'] = instance.asset.asset_description
        return data


class PurchaseOrderSerializer(AuditModelMixinSerializer):
    purchase_order_items = PurchaseOrderItemsSerializer(many=True)

    class Meta:
        model = PurchaseOrder
        fields = '__all__'

    def create(self, validated_data):
        # Extract nested data from validated_data
        purchase_order_item_details = validated_data.pop('purchase_order_items', [])

        # generate purchase order code.
        validated_data['po_no'] = NumberConstructor().generate_next_sequence(
            NumberConstructorConstants.
            PURCHASE_ORDER_NUMBERING, False)

        # Create Purchase Order instance
        instance = super().create(validated_data)

        # Create Purchase Order Item instances related to the VendorMaster using bulk_create
        purchase_order_item_instances = [PurchaseOrderItem(purchase_order=instance, **data) for data in purchase_order_item_details]
        PurchaseOrderItem.objects.bulk_create(purchase_order_item_instances)

        # Return the created VendorMaster instance
        return instance

    def update(self, instance, validated_data):
        # Update or create Purchase order items instances related to the Purchase Order
        purchase_order_item_data = self.initial_data.pop('purchase_order_items', [])
        validated_data.pop('purchase_order_items', [])
        existing_purchase_order_items_ids = []
        for purchase_order_item in purchase_order_item_data:
            purchase_order_item_instance = PurchaseOrderItem.objects.filter(id=purchase_order_item.get('id')).first()
            if purchase_order_item_instance:
                existing_purchase_order_items_ids.append(purchase_order_item_instance.id)
                # Update existing instance
                PurchaseOrderItem.objects.filter(id=purchase_order_item_instance.id).update(**purchase_order_item)
            else:
                # Create new instance
                new_po_item_instance = PurchaseOrderItem.objects.create(purchase_order=instance,
                                                                        asset_id=purchase_order_item.pop('asset', None),
                                                                        **purchase_order_item)
                existing_purchase_order_items_ids.append(new_po_item_instance.id)

        # Delete Purchase Order Items instances that were not provided in the update data
        instance.purchase_order_items.exclude(id__in=[_id for _id in existing_purchase_order_items_ids]).delete()

        return super().update(instance, validated_data)
