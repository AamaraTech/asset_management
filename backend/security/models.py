from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models, transaction

# Create your models here.
from audit_fields.models import AuditUuidModelMixin

from warehouse.models import Warehouse, Store


class UserManager(BaseUserManager):

    def _create_user(self, email, password, **extra_fields):
        """
        Creates and saves a User with the given email,and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        try:
            with transaction.atomic():
                user = self.model(email=email, **extra_fields)
                user.set_password(password)
                user.save(using=self._db)
                return user
        except:
            raise

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self._create_user(email=email, password=password, **extra_fields)


class User(AuditUuidModelMixin, AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.

    """
    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = ['first_name', 'phone_number']
    username = models.CharField(max_length=30, blank=True, unique=True)
    email = models.EmailField(max_length=40, unique=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=100, default=None, null=True)
    is_customer = models.BooleanField(default=False)
    tenant_id = models.IntegerField(default=0)
    # warehouse = models.ForeignKey(Warehouse, on_delete=models.DO_NOTHING, default=None, null=True,blank=True)
    # store = models.ForeignKey(Store, on_delete=models.DO_NOTHING, default=None, null=True,blank=True)
    warehouses = models.ManyToManyField(Warehouse, blank=True, default=None)
    stores = models.ManyToManyField(Store, blank=True, default=None)
    objects = UserManager()

    def save(self, *args, **kwargs):
        super(User, self).save(*args, **kwargs)
        return self

    class Meta:
        # display_format = '{user.first_name}'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        swappable = 'AUTH_USER_MODEL'
        permissions = [
            ('canEdit_Manager', 'view Manager')
        ]

    def __str__(self):
        return self.first_name + '(' + self.email + ')'