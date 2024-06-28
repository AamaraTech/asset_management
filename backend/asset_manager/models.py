from django.db import models

from master.models import EmployeeMaster
from warehouse.models import Store

from audit_fields.models import AuditUuidModelMixin


# Model for Asset Categories
class AssetCategory(AuditUuidModelMixin):
    # TODO: after eventual roll out category needs to be moved out with more fine # grained details
    created_at = models.DateTimeField(auto_now_add=True)
    category_code = models.CharField(max_length=20, db_index=True, null=True)
    category = models.CharField(max_length=255, db_index=True)
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        verbose_name_plural = "Asset Categories"
        ordering = ['-created_at']

    def __str__(self):
        return self.category


# Model for Asset Subcategories
class AssetSubcategory(AuditUuidModelMixin):
    # TODO: after eventual roll out this needs to be moved out with more fine grained details
    created_at = models.DateTimeField(auto_now_add=True)
    subcategory_code = models.CharField(max_length=20, null=True)
    subcategory = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name_plural = "Asset Subcategories"
        ordering = ['-created_at']

    def __str__(self):
        return self.subcategory


# Class defining choices for Asset Types
class AssetType(models.TextChoices):
    """
    Choices for the type of assets.

    Attributes:
        PHYSICAL: Represents a physical asset.
        INTELLECTUAL: Represents an intellectual asset.
    """
    PHYSICAL = 'physical', 'Physical Asset'
    INTELLECTUAL = 'intellectual', 'Intellectual Asset'


# Class defining choices for Asset Status
class AssetStatus(models.TextChoices):
    """
    Choices for the status of assets.

    Attributes:
        NEW: Represents a new asset.
        USED: Represents a used asset.
        RENEWED: Represents a renewed asset.
        RENTED: Represents a rented asset.
    """
    NEW = 'new', 'New'
    USED = 'used', 'Used'
    RENEWED = 'renewed', 'Renewed'
    RENTED = 'rented', 'Rented'


# Class defining choices for Asset Value Types
class AssetValueType(models.TextChoices):
    """
    Choices for the value type of assets.

    Attributes:
        DEPRECIATING: Represents a depreciating asset value.
        INCREMENTING: Represents an incrementing asset value.
    """
    DEPRECIATING = 'depreciating', 'Depreciating'
    INCREMENTING = 'incrementing', 'Incrementing'


# Model for Assets
class Asset(AuditUuidModelMixin):
    created_at = models.DateTimeField(auto_now_add=True)
    asset_code = models.CharField(max_length=20, unique=True, db_index=True)
    asset_name = models.CharField(max_length=500, db_index=True)
    asset_serial_number = models.CharField(max_length=50)  # needs discussion on editable part
    store = models.ForeignKey(Store, on_delete=models.PROTECT, null=True, blank=True, related_name="asset_store")
    asset_category = models.ForeignKey(AssetCategory, on_delete=models.SET_NULL, null=True, blank=True)
    asset_subcategory = models.ForeignKey(AssetSubcategory, on_delete=models.SET_NULL, null=True, blank=True)
    asset_description = models.TextField(blank=True, null=True)
    asset_type = models.CharField(max_length=20,
                                  choices=AssetType.choices)
    asset_status = models.CharField(max_length=20, choices=AssetStatus.choices)

    asset_hs_code = models.CharField(max_length=20, blank=True, null=True)
    asset_purchase_cost = models.DecimalField(max_digits=10, decimal_places=2, default=0, blank=True, null=True)
    asset_purchase_date = models.DateField(blank=True, null=True)
    asset_manufacturing_date = models.DateField(blank=True, null=True)
    asset_lifecycle = models.DurationField(blank=True, null=True)
    asset_value_type = models.CharField(max_length=20,
                                        choices=AssetValueType.choices,
                                        blank=True, null=True)
    depreciation_incremental_percent_per_year = models.DecimalField(max_digits=5, decimal_places=2, blank=True,
                                                                    null=True)
    depreciation_incremental_value_cost = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    is_active = models.BooleanField(default=True, db_index=True)
    qr_code = models.TextField(blank=True, null=True, verbose_name="QR Code",
                               help_text="QR code text for the product.")
    barcode = models.TextField(blank=True, null=True, verbose_name="Barcode",
                               help_text="Barcode text for the product.")

    class Meta:
        verbose_name_plural = "Assets"
        ordering = ['-created_at']


class AssetSerialNumber(AuditUuidModelMixin):
    asset = models.ForeignKey(Asset, on_delete=models.SET_NULL, null=True, blank=True,
                              related_name='asset_serial_numbers')
    serial_number = models.CharField(max_length=255, blank=True, null=True, default=None)
    is_sold = models.BooleanField(default=False)
    invoice_number = models.CharField(max_length=255, null=True, blank=True, default=None)
    is_approved = models.BooleanField(default=False)

    class Meta:
        unique_together = ('asset', 'serial_number')


class AssetLocation(AuditUuidModelMixin):
    location_name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    site = models.CharField(max_length=50, null=True, blank=True)
    co_ordinates = models.CharField(max_length=50, blank=True, null=True)
    floor = models.CharField(max_length=50, blank=True, null=True)
    room_name = models.CharField(max_length=100, blank=True, null=True)
    room_number = models.CharField(max_length=20, blank=True, null=True)
    location_incharge = models.ForeignKey(EmployeeMaster, on_delete=models.PROTECT, null=True, blank=True)

    def __str__(self):
        return self.location_name
