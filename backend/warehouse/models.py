from django.db import models

from audit_fields.models import AuditUuidModelMixin


# from django.contrib.gis.db import models as gis_models  # Import GIS models from Django


# Warehouse model for storing information about company warehouses
class Warehouse(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    # warehouse belongs to single company, if this is not true, the above field is not required
    warehouse_name = models.CharField(max_length=255, db_index=True)
    # add optional nick_name
    # ideally warehouse_type is required as there can be multiple types of warehouses, but as per requirement
    # since its explicitly mentioned single warehouse commenting this part, needs more discussion on this
    warehouse_code = models.CharField(max_length=20, db_index=True)
    # warehouse_location = gis_models.PointField(geography=True, null=True, blank=True)
    qr_code = models.TextField(blank=True, null=True, verbose_name="QR Code",
                               help_text="QR code text for the product.")
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        verbose_name_plural = 'Warehouses'
        ordering = ['-id']

    def __str__(self):
        return self.warehouse_name


# Store model for storing information about warehouse store information.
class Store(AuditUuidModelMixin):
    warehouse = models.ForeignKey(Warehouse, on_delete=models.CASCADE, related_name="warehouse_id")
    store_name = models.CharField(max_length=255, db_index=True)
    store_code = models.CharField(max_length=20, db_index=True)
    # store_location = gis_models.PointField(geography=True, null=True, blank=True)
    qr_code = models.TextField(blank=True, null=True, verbose_name="QR Code",
                               help_text="QR code text for the product.")
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        verbose_name_plural = 'Stores'
        # ordering = ['-modified']

    def __str__(self):
        return self.store_name


class AppSettings(AuditUuidModelMixin):
    app_key = models.CharField(max_length=50, unique=True)
    app_value = models.CharField(max_length=1000)

    class Meta:
        pass


class AppEnums(AuditUuidModelMixin):
    enum_key = models.CharField(max_length=100, default=None)
    enum_value = models.JSONField(default=dict, blank=True, null=True)

    class Meta:
        pass
