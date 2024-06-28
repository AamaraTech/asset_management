import psycopg2
from django.db import connection


def get_tenant_connection_list(server_name, username, password, db,port, database_dict):
    try:
        conn = psycopg2.connect(
            host=server_name,
            user=username,
            password=password,
            database=db,
            port=port
        )

        cursor = conn.cursor()

        # Execute SQL select statement
        cursor.execute("SELECT * FROM tenant_company")
        # Get the number of rows in the resultset
        numrows = cursor.rowcount
        # Get and display one row at a time
        DATABASES = database_dict
        for x in range(0, numrows):
            row = cursor.fetchone()
            # if company table updated with extra fields check indexes.
            conn_name = str(row[2]).lower()
            DATABASES[conn_name] = {
                'NAME': str(conn_name).lower(),
                'HOST': server_name,
                'ENGINE': 'django.db.backends.postgresql',
                'USER': username,
                'PASSWORD': password,
                'PORT': port,  # PostgreSQL default port
                'ATOMIC_REQUESTS': True,
                'OPTIONS': {
                    # You can add PostgreSQL-specific options here if needed
                }
            }
        # print("databases",DATABASES)
        # Close the connection
        cursor.close()
        conn.close()
        return DATABASES
    except Exception as e:
        # Handle the exception
        pass
