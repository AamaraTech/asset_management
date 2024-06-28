from django.db import models

from asset_manager.models import Asset
from audit_fields.models import AuditUuidModelMixin
from master.models import VendorMaster
from purchase.models import PurchaseOrder


class GoodsReceiptNote(AuditUuidModelMixin):
    source_types = (
        ('purchase_order', 'Purchase Order'),
        ('direct', 'Direct')
    )
    # Required Fields
    grn_no = models.CharField(max_length=100, unique=True, null=True, blank=True, default=None)
    batch_no = models.CharField(max_length=100, unique=True, null=True, blank=True, default=None)
    grn_date = models.DateField(null=True)
    source = models.CharField(max_length=20, choices=source_types)
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, null=True, default=None)
    vendor_bill = models.CharField(max_length=20)
    vendor_bill_date = models.DateField(null=True)
    vendor = models.ForeignKey(VendorMaster, on_delete=models.CASCADE, null=True, default=None)

    # Optional Fields
    note = models.TextField(blank=True, null=True)
    other_ref_no = models.CharField(max_length=20, blank=True, null=True)

    # Vehicle Details
    vehicle_no = models.CharField(max_length=20, blank=True, null=True, default="")
    arrive_date = models.DateTimeField(blank=True, null=True)
    exit_date = models.DateTimeField(blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    docs = models.FileField(upload_to='grn_documents/', blank=True, null=True)

    class Meta:
        pass


class GoodsReceiptNoteItem(AuditUuidModelMixin):
    grn = models.ForeignKey(GoodsReceiptNote, on_delete=models.CASCADE, related_name='grn_items', null=True)
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='grn_asset_details', null=True)
    hs_code = models.CharField(max_length=20, blank=True, null=True)
    uom = models.CharField(max_length=20, blank=True, null=True)
    po_qty = models.DecimalField(max_digits=10, decimal_places=2)
    received_qty = models.DecimalField(max_digits=10, decimal_places=2)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    tax = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    tax_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    sub_total = models.DecimalField(max_digits=10, decimal_places=2)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    reject_qty = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    rejected_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    accepted_qty = models.DecimalField(max_digits=10, decimal_places=2)
    balance_qty = models.DecimalField(max_digits=10, decimal_places=2)
    remarks = models.TextField(blank=True, null=True)

    class Meta:
        pass
