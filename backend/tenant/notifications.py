from django.db import connections
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator

from django.contrib.auth import get_user_model
User = get_user_model()

def send_tenant_email(recipient_list, email, first_name, domain, db_name):
    # Manually create a database connection using the 'db_name'
    custom_db_connection = connections[db_name]

    # Fetch the user from the custom database connection
    with custom_db_connection.cursor() as cursor:
        cursor.execute("SELECT email FROM security_user WHERE email = %s", [email])
        user_data = cursor.fetchone()
    if user_data:
        email = user_data
        print('db_name',db_name)
        print('email', email)
        # user_customerdb = User.objects.using('tenant_customer1').get(email='arjunp@sanaditechnologies.com')
        user_customerdb = User.objects.using(db_name).get(email=email[0])
        print('user', user_customerdb.id)
        # Create a token for email verification
        token = default_token_generator.make_token(user_customerdb)
        uid = urlsafe_base64_encode(force_bytes(user_customerdb.id))

        activation_link = f'http://{domain}.craftyouridea.com/api/tenants/v1/activate/?uidb64={uid}&token={token}'

        subject = 'Welcome to Asset Management System'

        message = f'<div><div>' \
                  f'<div><font size="2"><span style="font-size:11pt;">Hi {first_name},<br aria-hidden="true">' \
                  f'Your invited you to register on the Asset Management System App in order to view and manage your clients for the Asset Management System programs. <br aria-hidden="true">' \
                  f'<br aria-hidden="true">' \
                  f'Please find link for to activate your account to access the web portal <br aria-hidden="true">' \
                  f'<br aria-hidden="true">' \
                  f'<a href="{activation_link}">Click here to activate your account</a><br aria-hidden="true">' \
                  f'<br aria-hidden="true">' \
                  f'Best Regards,<br aria-hidden="true">' \
                  f'Asset Management System Support<br aria-hidden="true">' \
                  f'</span></font></div>' \
                  f'</div>' \
                  f'</div>'

        email_from = 'donotreply@craftyouridea.com'
        print('Sending mail',recipient_list)
        send_mail(subject=subject, message=message, from_email=email_from, recipient_list=[recipient_list],
                  html_message=message)
        print('Mail sent')
        return True
    else:
        # Handle the case where the user does not exist in the custom database
        return False
