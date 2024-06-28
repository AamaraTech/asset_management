from django.db import connection

from backend.settings import env
from django.http import HttpRequest


def hostname_from_the_request(request):
    # Extract the client parameter from the path
    path_components = request.path.split('/')
    # Find the position of 'api' in the path
    if 'api' in path_components:
        api_index = path_components.index('api')
        # Extract the client parameter from the path
        if api_index + 2 < len(path_components):
            client = path_components[api_index + 2].lower()
            return client
    return request.get_host().split(":")[0].lower().split('.')[0]


def tenant_db_from_the_request(request):
    if 'admin' in request.path:
        # If 'tenant_db' is present in the query parameters, store it in the session
        tenant_db_from_query = request.GET.get('tenant_db')
        if tenant_db_from_query:
            request.session['tenant_db'] = tenant_db_from_query
        # Retrieve tenant_db from the session
        tenant_db_from_session = request.session.get('tenant_db')
        return tenant_db_from_session
    hostname = hostname_from_the_request(request)
    tenants_map = get_tenants_map()
    return tenants_map.get(hostname)


def get_tenants_map():
    # print("comes here in tenant middlewar")
    tenants_map = {}
    tenants_map['admin'] = env('DB_NAME')
    with connection.cursor() as cursor:
        cursor.execute("SELECT domain_name, db_name FROM tenant_company;")
        rows = cursor.fetchall()
        for row in rows:
            domain_name, db_name = row
            tenants_map[domain_name] = db_name
    return tenants_map
