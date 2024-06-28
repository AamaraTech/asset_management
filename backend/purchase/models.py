from django.db import models
from django.core.validators import EmailValidator

from asset_manager.models import Asset
from audit_fields.models import AuditUuidModelMixin


class PurchaseOrder(AuditUuidModelMixin):
    # General Information
    source = models.CharField(max_length=255)
    po_no = models.CharField(max_length=1000, unique=True)
    po_date = models.DateField()
    vendor = models.ForeignKey("master.VendorMaster", on_delete=models.PROTECT,
                               related_name='purchase_order_details', null=True)
    poc = models.ForeignKey("master.POCDetail", on_delete=models.PROTECT,
                            related_name='vendor_poc_details', null=True)

    # Vendor Quotation Information
    vendor_quotation_no = models.CharField(max_length=50, blank=True, null=True)
    quotation_date = models.DateField(blank=True, null=True)
    delivery_terms = models.CharField(max_length=255, blank=True, null=True)
    delivery_preference = models.CharField(max_length=255, blank=True, null=True)
    payment_terms = models.CharField(max_length=255, blank=True, null=True)

    # Billing Information
    bill_to_name = models.CharField(max_length=255)
    bill_to_address1 = models.CharField(max_length=255)
    bill_to_address2 = models.CharField(max_length=255, blank=True, null=True)
    bill_to_tax_no = models.CharField(max_length=50, blank=True, null=True)
    bill_to_country = models.CharField(max_length=255)
    bill_to_city = models.CharField(max_length=255)
    bill_to_zip_code = models.CharField(max_length=20)
    bill_to_state = models.CharField(max_length=255)

    # Shipping Information
    ship_to_name = models.CharField(max_length=255)
    ship_to_address1 = models.CharField(max_length=255)
    ship_to_address2 = models.CharField(max_length=255, blank=True, null=True)
    ship_to_tax_no = models.CharField(max_length=50, blank=True, null=True)
    ship_to_country = models.CharField(max_length=255, blank=True)
    ship_to_city = models.CharField(max_length=255, blank=True)
    ship_to_zipcode = models.CharField(max_length=20, blank=True)
    ship_to_state = models.CharField(max_length=255, blank=True)

    sub_total = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_type = models.CharField(max_length=50, blank=True)
    note = models.TextField(blank=True)
    terms_conditions = models.TextField(blank=True)
    docs = models.FileField(upload_to='purchase_order_documents/', null=True, blank=True)

    def __str__(self):
        return f"Purchase Order {self.po_no}"


class PurchaseOrderItem(AuditUuidModelMixin):
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name='purchase_order_items',
                                       null=True)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='asset_details')
    mfr = models.CharField(max_length=255, null=True, blank=True)
    delivery_date = models.DateField(null=True, default=None, blank=True)
    qty = models.PositiveIntegerField(default=0)
    uom = models.CharField(max_length=50, null=True, default=None)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    tax = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return f"{self.part_no} - {self.part_name} ({self.purchase_order})"
