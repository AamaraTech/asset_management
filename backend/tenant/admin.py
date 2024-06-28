from django import forms
from django.contrib import admin

from .forms import CompanyForm
from .models import Company


class CompanyAdmin(admin.ModelAdmin):
    """ Customizes the Django admin interface for the Company model. """
    form = CompanyForm

    # Fields marked as readonly and not editable in the admin interface
    readonly_fields = ('created_at',)

    # search fields for global filter
    search_fields = ['business_name']

    # Fields displayed in the list view of the admin interface
    list_display = ('business_name', 'created_at', 'phone_number', 'business_category', 'db_name', 'domain_name')

    # Filters available in the right sidebar of the list view to filter results
    list_filter = ('business_name',)

    # Fieldsets organize and group fields in the admin interface
    fieldsets = (
        ('General Information', {
            'fields': ('created_at', 'business_name', 'display_name', 'vat_tax_number', 'phone_number'),
        }),
        ('Logo and Details', {
            'fields': ('business_logo', 'business_details', 'caption', 'db_name', 'domain_name'),
        }),
        ('Location Information', {
            'fields': ('business_address', 'zip_code', 'state', 'country'),
        }),
        ('Categorization', {
            'fields': ('business_category', 'business_description'),
        }),
        ('Additional Information', {
            'fields': ('first_name', 'last_name', 'email','contact_details', 'upload_signature',
                       'business_currency'),
        }),
        ('Status', {
            'fields': ('is_active',),
        }),
    )


# Register the Company model with the customized admin interface
admin.site.register(Company, CompanyAdmin)
