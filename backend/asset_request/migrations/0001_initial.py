# Generated by Django 5.0.6 on 2024-06-22 11:07

import audit_fields.fields.uuid_auto_field
import audit_fields.models.audit_model_mixin
import django.db.models.deletion
import simple_history.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('master', '0003_alter_historicalbankdetail_options_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='AssetRequestItem',
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
                ('asset_code', models.CharField(default=None, max_length=50, null=True)),
                ('asset_name', models.CharField(default=None, max_length=255, null=True)),
                ('required_date', models.DateField(default=None, max_length=255, null=True)),
                ('asset_description', models.CharField(default=None, max_length=50, null=True)),
                ('unit', models.CharField(default=None, max_length=50, null=True)),
                ('qty', models.PositiveBigIntegerField(default=None, null=True)),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AssetRequest',
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
                ('ar_no', models.CharField(max_length=1000, unique=True)),
                ('request_date', models.DateField(null=True)),
                ('created_by', models.DateField(null=True)),
                ('department', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='asset_request_details', to='master.department')),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='HistoricalAssetRequest',
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
                ('ar_no', models.CharField(db_index=True, max_length=1000)),
                ('request_date', models.DateField(null=True)),
                ('created_by', models.DateField(null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('department', models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='master.department')),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical asset request',
                'verbose_name_plural': 'historical asset requests',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
        migrations.CreateModel(
            name='HistoricalAssetRequestItem',
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
                ('asset_code', models.CharField(default=None, max_length=50, null=True)),
                ('asset_name', models.CharField(default=None, max_length=255, null=True)),
                ('required_date', models.DateField(default=None, max_length=255, null=True)),
                ('asset_description', models.CharField(default=None, max_length=50, null=True)),
                ('unit', models.CharField(default=None, max_length=50, null=True)),
                ('qty', models.PositiveBigIntegerField(default=None, null=True)),
                ('history_id', models.AutoField(primary_key=True, serialize=False)),
                ('history_date', models.DateTimeField(db_index=True)),
                ('history_change_reason', models.CharField(max_length=100, null=True)),
                ('history_type', models.CharField(choices=[('+', 'Created'), ('~', 'Changed'), ('-', 'Deleted')], max_length=1)),
                ('history_user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'historical asset request item',
                'verbose_name_plural': 'historical asset request items',
                'ordering': ('-history_date', '-history_id'),
                'get_latest_by': ('history_date', 'history_id'),
            },
            bases=(simple_history.models.HistoricalChanges, models.Model),
        ),
    ]
