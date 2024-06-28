from django.core.management.base import BaseCommand
from tenant.models import Company
from security.models import User  # Import your custom user model
from django.db import connections
from django.core.mail import send_mail
from django.db import connection

from backend.settings import env


class Command(BaseCommand):
    help = 'Create a superuser in a specific database'

    def add_arguments(self, parser):
        # Add a command-line argument for specifying the database
        parser.add_argument('--database', type=str, default=env('DB_NAME'), help='Database name')

    def handle(self, *args, **options):
        print("options",options)
        # custom_db_connection = connections[options['database']]
        database_name = options['database']
        # print("databse",database_name,custom_db_connection)

        with connection.cursor() as cursor:
            print()
            # Use parameterized query to prevent SQL injection
            cursor.execute("SELECT id,first_name,last_name, email,domain_name FROM tenant_company WHERE "
                           "db_name=%s;", [database_name])
            row = cursor.fetchone()  # Use fetchone to get a single row

        if row:
            id , first_name, last_name, email,domain_name = row
            # Set the database attribute on the user object
            user = User(email=email,first_name=first_name,last_name=last_name,is_active=True,is_superuser=True,is_staff=True,tenant_id=id)
            # @TODO Need too add password from env
            password = env('TENANT_PASSWORD')
            user.set_password(password)
            user.save(using=database_name)
            # recipient_list = [email]
            # domain = domain_name
            # self.send_tenant_email(recipient_list, email, password, first_name, domain)
            # create entry in Organization table as well 
            # organization = Organization(organization_name=organization_name,contact_name=first_name,email=email,phone_number="")
            # organization.save(using=database_name)

            self.stdout.write(self.style.SUCCESS(f'Superuser created successfully in database: {database_name}'))
        else:
            self.stdout.write(self.style.ERROR(f'No data found for database: {database_name}'))

