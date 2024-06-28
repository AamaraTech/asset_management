from django.core.management.base import BaseCommand
from django.db import connection
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from apps.security.models import User

class Command(BaseCommand):
    help = 'Send an email to a specific user'

    def add_arguments(self, parser):
        # Add a command-line argument for specifying the database
        parser.add_argument('--database', type=str, default='tenant_admin', help='Database name')

    def handle(self, *args, **options):
        database_name = options['database']

        with connection.cursor() as cursor:
            # Use parameterized query to prevent SQL injection
            cursor.execute("SELECT first_name, last_name, email, domain_name FROM tenant_company WHERE db_name=%s;", [database_name])
            row = cursor.fetchone()  # Use fetchone to get a single row

        if row:
            first_name, last_name, email, domain_name = row
            recipient_list = [email]
            domain = domain_name
            self.send_tenant_email(recipient_list, email, first_name, domain)

            self.stdout.write(self.style.SUCCESS(f'Email sent successfully to: {email}'))
        else:
            self.stdout.write(self.style.ERROR(f'No data found for database: {database_name}'))

    def send_tenant_email(self, recipient_list, email, first_name, domain):
        print('inside mail')
        user = User.objects.get(email=email)
        print('inside mail user',user)
        # Create a token for email verification
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        activation_link = f'http://{domain}.craftyouridea.local:8000/activate/{uid}/{token}/'

        subject = 'Welcome to Asset Management System'

        message = f'<div><div>' \
                  f'<div><font size="2"><span style="font-size:11pt;">Hi {first_name},<br aria-hidden="true">' \
                  f'Your  invited you to register on the Asset Management System App in order to view and manage your clients for the Asset Management System programs. <br aria-hidden="true">' \
                  f'<br aria-hidden="true">' \
                  f'Please find link for to active your account to access web portal <br aria-hidden="true">' \
                  f'<br aria-hidden="true">' \
                  f'<a href="{activation_link}">Click here to activate your account</a><br aria-hidden="true">' \
                  f'<br aria-hidden="true">' \
                  f'Best Regards,<br aria-hidden="true">' \
                  f'AMS Support<br aria-hidden="true">' \
                  f'</span></font></div>' \
                  f'</div>' \
                  f'</div>'

        email_from = 'donotreply@craftyouridea.com'
        send_mail(subject=subject, message=message, from_email=email_from, recipient_list=recipient_list,
                  html_message=message)
        return True
