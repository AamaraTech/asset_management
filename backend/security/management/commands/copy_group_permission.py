from django.core.management.base import BaseCommand
from django.db import connections

from backend.settings import env


class Command(BaseCommand):
    def add_arguments(self, parser):
        # Add a command-line argument for specifying the database
        parser.add_argument('--database', type=str, default=env('DB_NAME'), help='Database name')

    def handle(self, *args, **options):
        custom_db_connection = connections[options['database']]

        with custom_db_connection.cursor() as cursor:
            cursor.execute("""
               DELETE FROM django_admin_log;
               """)

            cursor.execute("""
               DELETE FROM auth_group_permissions;
               """)

            cursor.execute("""
               DELETE FROM auth_group;
               """)

            cursor.execute("""
               DELETE FROM auth_permission;
               """)

            cursor.execute("""
               DELETE FROM django_content_type;
               """)

            cursor.execute("""
               INSERT INTO auth_group
               (id, name)
               SELECT id, name FROM auth_group
               ON CONFLICT (id) DO NOTHING;
               """)

            cursor.execute("""
               INSERT INTO django_content_type
               (id, app_label, model)
               SELECT id, app_label, model FROM django_content_type
               ON CONFLICT (id) DO NOTHING;
               """)

            cursor.execute("""
               INSERT INTO auth_permission
               (id, name, content_type_id, codename)
               SELECT id, name, content_type_id, codename FROM auth_permission
               ON CONFLICT (id) DO NOTHING;
               """)

            cursor.execute("""
               INSERT INTO auth_group_permissions
               (id, group_id, permission_id)
               SELECT id, group_id, permission_id FROM auth_group_permissions
               ON CONFLICT (id) DO NOTHING;
               """)
