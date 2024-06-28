# Generated by Django 4.1.2 on 2024-05-03 01:56

import audit_fields.fields.uuid_auto_field
import audit_fields.models.audit_model_mixin
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import simple_history.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AppEnums',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('modified', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('user_created', models.CharField(blank=True, max_length=200, null=True)),
                ('user_modified', models.CharField(blank=True, max_length=200, null=True)),
                ('ip_address', models.CharField(blank=True, max_length=200, null=True)),
                ('w_id', models.IntegerField(blank=True, default=None, null=True)),
                ('s_id', models.IntegerField(blank=True, default=None, null=True)),
                ('guid', audit_fields.fields.uuid_auto_field.UUIDAutoField(blank=True, editable=False, help_text='System auto field. UUID primary key.')),
                ('is_active', models.BooleanField(default=True)),
                ('enum_key', models.CharField(default=None, max_length=100)),
                ('enum_value', models.JSONField(blank=True, default=dict, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='AppSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('modified', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('user_created', models.CharField(blank=True, max_length=200, null=True)),
                ('user_modified', models.CharField(blank=True, max_length=200, null=True)),
                ('ip_address', models.CharField(blank=True, max_length=200, null=True)),
                ('w_id', models.IntegerField(blank=True, default=None, null=True)),
                ('s_id', models.IntegerField(blank=True, default=None, null=True)),
                ('guid', audit_fields.fields.uuid_auto_field.UUIDAutoField(blank=True, editable=False, help_text='System auto field. UUID primary key.')),
                ('is_active', models.BooleanField(default=True)),
                ('app_key', models.CharField(max_length=50, unique=True)),
                ('app_value', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Warehouse',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('warehouse_name', models.CharField(db_index=True, max_length=255)),
                ('warehouse_code', models.CharField(db_index=True, max_length=20)),
                ('qr_code', models.TextField(blank=True, help_text='QR code text for the product.', null=True, verbose_name='QR Code')),
                ('is_active', models.BooleanField(db_index=True, default=True)),
            ],
            options={
                'verbose_name_plural': 'Warehouses',
                'ordering': ['-id'],
            },
        ),
        migrations.CreateModel(
            name='Store',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('modified', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('user_created', models.CharField(blank=True, max_length=200, null=True)),
                ('user_modified', models.CharField(blank=True, max_length=200, null=True)),
                ('ip_address', models.CharField(blank=True, max_length=200, null=True)),
                ('w_id', models.IntegerField(blank=True, default=None, null=True)),
                ('s_id', models.IntegerField(blank=True, default=None, null=True)),
                ('guid', audit_fields.fields.uuid_auto_field.UUIDAutoField(blank=True, editable=False, help_text='System auto field. UUID primary key.')),
                ('store_name', models.CharField(db_index=True, max_length=255)),
                ('store_code', models.CharField(db_index=True, max_length=20)),
                ('qr_code', models.TextField(blank=True, help_text='QR code text for the product.', null=True, verbose_name='QR Code')),
                ('is_active', models.BooleanField(db_index=True, default=True)),
                ('warehouse', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='warehouse_id', to='warehouse.warehouse')),
            ],
            options={
                'verbose_name_plural': 'Stores',
            },
        ),
        migrations.CreateModel(
            name='HistoricalStore',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('created', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('modified', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('user_created', models.CharField(blank=True, max_length=200, null=True)),
                ('user_modified', models.CharField(blank=True, max_length=200, null=True)),
                ('ip_address', models.CharField(blank=True, max_length=200, null=True)),
                ('w_id', models.IntegerField(blank=True, default=None, null=True)),
                ('s_id', models.IntegerField(blank=True, default=None, null=True)),
                ('guid', audit_fields.fields.uuid_auto_field.UUIDAutoField(blank=True, editable=False, help_text='System auto field. UUID primary key.')),
                ('store_name', models.CharField(db_index=True, max_length=255)),
                ('store_code', models.CharField(db_index=True, max_length=20)),
                ('qr_code', models.TextField(blank=True, help_text='QR code text for the product.', null=True, verbose_name='QR Code')),
                ('is_active', models.BooleanField(db_index=True, default=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
                ('warehouse', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='warehouse.warehouse')),
            ],
            options={
                'verbose_name': 'historical store',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalAppSettings',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('created', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('modified', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('user_created', models.CharField(blank=True, max_length=200, null=True)),
                ('user_modified', models.CharField(blank=True, max_length=200, null=True)),
                ('ip_address', models.CharField(blank=True, max_length=200, null=True)),
                ('w_id', models.IntegerField(blank=True, default=None, null=True)),
                ('s_id', models.IntegerField(blank=True, default=None, null=True)),
                ('guid', audit_fields.fields.uuid_auto_field.UUIDAutoField(blank=True, editable=False, help_text='System auto field. UUID primary key.')),
                ('is_active', models.BooleanField(default=True)),
                ('app_key', models.CharField(db_index=True, max_length=50)),
                ('app_value', models.CharField(max_length=1000)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical app settings',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalAppEnums',
            fields=[
                ('id', models.BigIntegerField(auto_created=True, blank=True, db_index=True, verbose_name='ID')),
                ('created', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('modified', models.DateTimeField(blank=True, default=audit_fields.models.audit_model_mixin.utcnow)),
                ('user_created', models.CharField(blank=True, max_length=200, null=True)),
                ('user_modified', models.CharField(blank=True, max_length=200, null=True)),
                ('ip_address', models.CharField(blank=True, max_length=200, null=True)),
                ('w_id', models.IntegerField(blank=True, default=None, null=True)),
                ('s_id', models.IntegerField(blank=True, default=None, null=True)),
                ('guid', audit_fields.fields.uuid_auto_field.UUIDAutoField(blank=True, editable=False, help_text='System auto field. UUID primary key.')),
                ('is_active', models.BooleanField(default=True)),
                ('enum_key', models.CharField(default=None, max_length=100)),
                ('enum_value', models.JSONField(blank=True, default=dict, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField()),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical app enums',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': 'history_date',
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]
