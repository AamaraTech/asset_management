import logging
from threading import local
import threading
LOGGER = logging.getLogger('db_multitenant')
Thread_Local = threading.local()
import os

class MultiTenantThreadlocal(local):
    """Thread-local state.  An instance of this should be attached to a
    database connection.

    The first time a request is processed, the tenant name is looked up and
    set in this class.  When a cursor is accquired on that connection,
    the database wrapper will apply the tenant name.
    """
    def __init__(self):
        # setattr(Thread_Local, "DB",None)
        self.reset()

    def get_tenant_name(self):
        return self.tenant_name

    def set_tenant_name(self, tenant_name):
        # os.environ.setdefault('TENANT_DATABASE_NAME','tenant_'+tenant_name)
        self.tenant_name = tenant_name

    def get_db_name(self):
        if os.environ.get('TENANT_DATABASE_NAME'):
            self.db_name = os.environ.get('TENANT_DATABASE_NAME')
        print("inside thread local",self.db_name)
        return self.db_name

    def set_db_name(self, db_name):
        # Sanity check; this is highly simplistic; mappers should sanitize.
        if db_name and ';' in db_name:
            raise ValueError('Illegal database name: %s' % db_name)
        self.db_name = db_name

    def set_cache_prefix(self, prefix):
        self.cache_prefix = prefix

    def get_cache_prefix(self):
        return self.cache_prefix

    def reset(self):
        self.tenant_name = None
        self.db_name = None
        self.cache_prefix = None
