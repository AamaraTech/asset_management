from copy import deepcopy

from django.db import connection
from django.conf import LazySettings, settings
from django.core.mail import send_mail
import subprocess
from django.core.management import call_command
from django.conf import settings
from db_multitenant.threadlocal import MultiTenantThreadlocal
from db_multitenant.migration_handler import TenantMigrationHandler
from security.models import User
import os
import threading
# from .route53_serivce import Route53Service

Thread_Local = threading.local()

class DatabaseService(LazySettings,MultiTenantThreadlocal):

    def create_tenant_db(self, db_name):
        """
        Fucntion creates tenant specific database
        """
        with connection.cursor() as cursor:
            cmd = "CREATE DATABASE " + db_name
            cursor.execute(cmd)
            dbs = settings.DATABASES.copy()
            # new_db = dbs['default']
            # new_db['NAME'] = db_name
            # dbs[db_name] = new_db

            # Create a new database configuration by copying the default one
            new_db_config = deepcopy(dbs['default'])

            # Update the NAME attribute for the new database
            new_db_config['NAME'] = db_name

            # Add the new database configuration to settings.DATABASES
            settings.DATABASES[db_name] = new_db_config
            # self._wrapped.DATABASES[db_name] = new_db
            # settings.DATABASES[db_name] = new_db
            # settings.DATABASES = dbs
            # connection.get_threadlocal().set_db_name('default')
            # self._wrapped = empty
            # self.configure(DATABASES=dbs)
        return db_name

    def apply_database_migrations(self, db_name):
        """
        Fucntion migrate the db models to tenant database  
        """

        setattr(Thread_Local, "DB", db_name)
        # os.environ.setdefault('TENANT_DATABASE_NAME',db_name)

        cmd = '--database='+db_name
        call_command('migrate', cmd)
        call_command('create_admin_superuser',cmd)
        call_command('copy_group_permission',cmd)
        # call_command('send_mail', cmd)
        # del os.environ['TENANT_DATABASE_NAME']
        return None
