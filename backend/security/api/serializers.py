from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from audit_fields.serializers import AuditModelMixinSerializer

from exceptions.utils import api_exception_handler
import traceback

User = get_user_model()


class UserSerializer(AuditModelMixinSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'email', 'password', 'is_staff']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['username'] = validated_data['email']
        user = super().create(validated_data)
        return user

    def to_representation(self, instance):
        res = super(UserSerializer, self).to_representation(instance)
        # res['headOfDepartment'] = res
        # self.fields['headOfDepartment'] =  UserSerializer(instance,read_only=True,many=True)
        res['id'] = instance.id
        return res


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['user_id'] = self.user.id
        data['first_name'] = self.user.first_name
        data['phone_number'] = self.user.phone_number
        data['permission'] = self.user.get_all_permissions()
        if not self.user.is_superuser:
            warehouses = self.user.warehouses.all()
            stores = self.user.stores.all()
            if len(stores) and len(warehouses):
                data['location_type'] = 'multi_locations'
                data['s_id'] = [store.id for store in stores]
                data['w_id'] = [warehouse.id for warehouse in warehouses]
            elif len(stores):
                data['location_type'], data['s_id'] = ('stores', [store.id for store in stores]) if len(
                    stores) > 1 else ('store', stores[0].id)
            elif len(warehouses):
                data['location_type'], data['w_id'] = ('warehouses', [warehouse.id for warehouse in warehouses]) if len(
                    warehouses) > 1 else ('warehouse', warehouses[0].id)
            else:
                raise serializers.ValidationError(f"{self.user.username} is not assigned to a store or warehouse.")

        data['is_superuser'] = self.user.is_superuser
        return data
