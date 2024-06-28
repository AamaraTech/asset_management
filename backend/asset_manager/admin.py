from django.contrib import admin
from django.forms import inlineformset_factory
from .models import Asset, AssetCategory, AssetSubcategory
from .forms import AssetForm, AssetCategoryForm, AssetSubcategoryForm, AssetCategoryFormSet, AssetSubcategoryFormSet


class AssetCategoryInline(admin.TabularInline):
    """Inline for managing AssetCategory instances within the AssetAdmin."""
    model = AssetCategory
    formset = AssetCategoryFormSet
    extra = 1


class AssetSubcategoryInline(admin.TabularInline):
    """Inline for managing AssetSubcategory instances within the AssetAdmin."""
    model = AssetSubcategory
    formset = AssetSubcategoryFormSet
    extra = 1


# Admin interface customization for Asset model
class AssetAdmin(admin.ModelAdmin):
    """Customizes the Django admin interface for the Asset model."""
    form = AssetForm

    # Fields marked as readonly and not editable in the admin interface
    readonly_fields = ('created_at', 'asset_code', 'asset_serial_number')

    # Search fields for global filter
    search_fields = ['asset_code', 'asset_name']

    # Fields displayed in the list view of the admin interface
    list_display = ('asset_name', 'asset_type', 'asset_status', 'is_active', 'created_at')

    # Filters available in the right sidebar of the list view to filter results
    list_filter = ('asset_type', 'asset_status', 'is_active', 'created_at')

    # Fieldsets organize and group fields in the admin interface
    fieldsets = (
        ('General Information', {
            'fields': ('created_at', 'asset_code', 'asset_name', 'asset_serial_number'),
        }),
        ('Location Information', {
            'fields': ('store', 'asset_category', 'asset_subcategory'),
        }),
        ('Description and Type', {
            'fields': ('asset_description', 'asset_type', 'asset_status'),
        }),
        ('Additional Information', {
            'fields': ('asset_hs_code', 'asset_purchase_cost', 'asset_purchase_date',
                       'asset_manufacturing_date', 'asset_lifecycle'),
        }),
        ('Depreciation Information', {
            'fields': ('asset_value_type', 'depreciation_incremental_percent_per_year',
                       'depreciation_incremental_value_cost'),
        }),
        ('Status', {
            'fields': ('is_active',),
        }),
    )


# Register the Asset model with the customized admin interface
admin.site.register(AssetCategory)
admin.site.register(AssetSubcategory)
admin.site.register(Asset, AssetAdmin)
