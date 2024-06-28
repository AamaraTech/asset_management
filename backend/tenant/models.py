from django.db import models, transaction
from django.db import connection
from .database_service import DatabaseService
# from .route53_serivce import Route53Service
from .notifications import send_tenant_email
from audit_fields.models import AuditUuidModelMixin


# Company Model.
class Company(models.Model):
    """
    Class used to store the new tenants' information in the global master database
    """
    created_at = models.DateTimeField(auto_now_add=True)
    db_name = models.CharField(max_length=50, unique=True, null=False)
    domain_name = models.CharField(max_length=50, unique=True, null=False)
    business_name = models.CharField(max_length=255, db_index=True, null=False, blank=False, unique=True)
    business_code = models.CharField(max_length=50, null=True, editable=False, blank=True)
    display_name = models.CharField(max_length=255, null=False, blank=False)
    vat_tax_number = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=12, db_index=True)
    # max length can be kept 10 and country code 2 for better control on data
    # TODO: Change 'images/' to the desired folder name
    business_logo = models.ImageField(upload_to='images/')
    business_details = models.JSONField(blank=True,null=True)
    business_address = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=10)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    business_category = models.CharField(max_length=255,
                                         db_index=True)  # after first released this can be moved to new category db
    business_description = models.TextField()
    upload_signature = models.FileField(upload_to='signatures/')
    business_currency = models.CharField(max_length=3)  # Assuming ISO currency code
    is_active = models.BooleanField(default=True)
    # Account Owner Detail
    first_name = models.CharField(max_length=200, default=None, null=False)
    last_name = models.CharField(max_length=200, default=None, null=False)
    email = models.EmailField(max_length=100, unique=True)
    contact_details = models.TextField(default=None, blank=True)
    # Company Caption
    caption = models.CharField(max_length=100, blank=True, default=None)

    class Meta:
        verbose_name_plural = 'Companies'
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        self.db_name = f'tenant_{self.db_name.lower()}'
        instance = super(Company, self).save(*args, **kwargs)
        # Use on_commit to execute operations after the transaction is committed
        transaction.on_commit(lambda: self.handle_on_commit())
        # subdomain_service.create_sub_domain(self.domain_name)
        # send_tenant_email(self.email, self.email, self.first_name, self.domain_name, self.db_name)
        return instance

    def handle_on_commit(self):
        # This method will be called after the transaction is committed
        databases_service = DatabaseService()
        databases_service.create_tenant_db(self.db_name)
        databases_service.apply_database_migrations(self.db_name)

    def __str__(self):
        return self.domain_name


