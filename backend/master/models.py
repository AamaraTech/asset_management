# models.py

from django.db import models
from audit_fields.models import AuditUuidModelMixin


# Vendor or Party master
class VendorMaster(AuditUuidModelMixin):
    vendor_type = models.CharField(max_length=50)
    vendor_code = models.CharField(max_length=50, unique=True, null=True, default=None)
    vendor_name = models.CharField(max_length=100)
    ref_code = models.CharField(max_length=50, blank=True, null=True)
    address_line1 = models.CharField(max_length=255)
    address_line2 = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    state_code = models.CharField(max_length=10)
    zip_code = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=50)
    alternate_phone_no = models.CharField(max_length=50, blank=True, null=True)
    fax_number = models.CharField(max_length=50, blank=True, null=True)
    tax_number = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(max_length=100, blank=True, null=True)
    note = models.TextField(blank=True, null=True)
    pan_no = models.CharField(max_length=50, blank=True, null=True)
    cin_no = models.CharField(max_length=50, blank=True, null=True)
    reference_no = models.CharField(max_length=50, blank=True, null=True)
    payment_terms = models.CharField(max_length=50, blank=True, null=True)
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.vendor_name


class BankDetail(AuditUuidModelMixin):
    vendor = models.ForeignKey("VendorMaster", on_delete=models.CASCADE, related_name='bank_details', null=True)
    bank_name = models.CharField(max_length=100)
    branch_name = models.CharField(max_length=100)
    account_name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=20)
    swift_code = models.CharField(max_length=20, null=True, blank=True)
    routing_code = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f"Bank Details for {self.vendor.vendor_name}"


class POCDetail(AuditUuidModelMixin):
    vendor = models.ForeignKey(VendorMaster, on_delete=models.CASCADE, related_name='poc_details', null=True)
    name = models.CharField(max_length=100)
    designation = models.CharField(max_length=50)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"POC Details for {self.vendor.vendor_name}"


class Department(AuditUuidModelMixin):
    department_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Designation(AuditUuidModelMixin):
    designation_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class EmployeeMaster(AuditUuidModelMixin):
    employee_name = models.CharField(max_length=255)
    employee_code = models.CharField(max_length=50, unique=True, null=True, default=None)
    designation = models.ForeignKey(Designation, on_delete=models.SET_NULL, null=True, blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True)
    work_location = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.employee_name
