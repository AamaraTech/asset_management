from rest_framework import serializers

from tenant.models import  Company

from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
import datetime
from sequences import get_next_value





User = get_user_model()


def generate_organiztion_code():
    prefix_code = 'AMS_ORG'
    code = get_next_value(prefix_code, 000)
    code = prefix_code + str(code).zfill(3)
    return code


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

    # def create(self, validated_data):
    #     # Extract email from validated_data
    #     email = validated_data.get('email')
    #     domain=validated_data.get('domain_name')
    #     print('Seralizer',validated_data)
    #     validated_data['organization_code'] = generate_organiztion_code()
    #
    #     # Generate password based on dbName and current year
    #     current_year = datetime.datetime.now().year
    #     password = f"{current_year}"
    #
    #     organization = Organization.objects.create(**validated_data)
    #     # Create a user instance with hashed password
    #     # user = User.objects.create(
    #     #     email=email,
    #     #     first_name=validated_data['first_name'],
    #     #     last_name=validated_data['last_name'],
    #     #     password=make_password(password),
    #     #     is_external_user=True,
    #     #     is_staff=True
    #     # )
    #
    #     # Send an email using your notification service
    #     tenant_send_email(user.id, user.first_name, [user.email], password,domain)
    #
    #     return organization

