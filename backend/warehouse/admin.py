from django.contrib import admin
from .models import Warehouse, Store
from .forms import WarehouseForm, StoreForm


# Admin interface customization for Warehouse model
class WarehouseAdmin(admin.ModelAdmin):
    """Customizes the Django admin interface for the Warehouse model."""
    form = WarehouseForm

    # Search fields for global filter
    search_fields = ['warehouse_name', 'warehouse_code']

    # Fields displayed in the list view of the admin interface
    list_display = ('warehouse_name','is_active')

    # Filters available in the right sidebar of the list view to filter results
    list_filter = ('is_active',)

    # Fieldsets organize and group fields in the admin interface
    fieldsets = (
        ('General Information', {
            'fields': ('warehouse_name', 'warehouse_code'),
            # warehouse_location
        }),
        ('QR Code and Status', {
            'fields': ('qr_code', 'is_active'),
        }),
    )


# Register the Warehouse model with the customized admin interface
admin.site.register(Warehouse, WarehouseAdmin)


# Admin interface customization for Store model
class StoreAdmin(admin.ModelAdmin):
    """Customizes the Django admin interface for the Store model."""
    form = StoreForm

    # Search fields for global filter
    search_fields = ['store_name', 'store_code']

    # Fields displayed in the list view of the admin interface
    list_display = ('store_name', 'is_active')

    # Filters available in the right sidebar of the list view to filter results
    list_filter = ('is_active',)

    # Fieldsets organize and group fields in the admin interface
    fieldsets = (
        ('General Information', {
            'fields': ('warehouse', 'store_name', 'store_code'),
            # store_location
        }),
        ('QR Code and Status', {
            'fields': ('qr_code', 'is_active'),
        }),
    )


# Register the Store model with the customized admin interface
admin.site.register(Store, StoreAdmin)
