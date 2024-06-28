from rest_framework import serializers
from . import models
from datetime import datetime
from django.utils import timezone


class AuditModelMixinSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AuditModelMixin
        fields = '__all__'

    def create(self, validated_data):
        validated_data['created'] = timezone.now()
        validated_data['modified'] = timezone.now()
        if self.context['request'].user:
            validated_data['user_created'] = self.context['request'].user.first_name + '(' + self.context['request'].user.email + ')'
            # validated_data['device'] = self.context['request'].META.get('HTTP_USER_AGENT')
            validated_data['user_modified'] = self.context['request'].user.first_name + '(' + self.context['request'].user.email + ')'
        validated_data['ip_address'] = self.get_client_ip()
        validated_data['w_id'] = self.get_warehouse()
        validated_data['s_id'] = self.get_store()
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['modified'] = timezone.now()
        # validated_data['device'] = self.context['request'].META.get('HTTP_USER_AGENT')
        validated_data['user_modified'] = str(self.context['request'].user)
        validated_data['ip_address'] = self.get_client_ip()
        validated_data['w_id'] = self.get_warehouse()
        validated_data['s_id'] = self.get_store()
        return super().update(instance, validated_data)

    def get_client_ip(self):
        x_forwarded_for = self.context.get('request').META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[-1].strip()
        else:
            ip = self.context.get('request').META.get('REMOTE_ADDR')
        return ip

    def get_warehouse(self):
        request = self.context.get('request')
        w_id = request.query_params.get('w_id')
        return w_id

    def get_store(self):
        request = self.context.get('request')
        s_id = request.query_params.get('s_id')
        return s_id

