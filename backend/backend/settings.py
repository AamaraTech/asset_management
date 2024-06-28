"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 4.0.1.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.0/ref/settings/
"""
import os
from pathlib import Path
import environ
import datetime
from db_multitenant.utils import update_from_env
from django.db import connection

# Initialise environment variables
env = environ.Env()
environ.Env.read_env()
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = int(env("DEBUG"))

ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS").split(",")

# GDAL_LIBRARY_PATH = r"C:\OSGeo4W\bin\gdal308.dll"
SECURE_CROSS_ORIGIN_OPENER_POLICY = None

TIME_ZONE = 'UTC'


# Application definition
INSTALLED_APPS = [
    'grappelli',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'drf_yasg',
    'django_filters',
    'simple_history',
    'audit_fields',
    'security',
    'tenant',
    'sequences',
    'warehouse',
    'asset_manager',
    'master',
    'purchase',
    'inventory',
    # 'django.contrib.gis',
    'asset_request',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'tenant.tenant_middleware.TenantMiddleware',
    'simple_history.middleware.HistoryRequestMiddleware',
]

DATABASE_ROUTERS = ['tenant.db_router.DbRouter']

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'NAME': env('DB_NAME'),
        'HOST': env('DB_SERVER'),
        'ENGINE': 'django.db.backends.postgresql',
        'USER': env('DB_USERNAME'),
        'PASSWORD': env('DB_PASSWORD'),
        'PORT': env("DB_PORT"),
        'ATOMIC_REQUESTS': True,
        'POOL_OPTIONS': {
            'POOL_SIZE': 20,
            'MAX_OVERFLOW': 10,
            'RECYCLE': 24 * 60 * 60
        },
        'OPTIONS': {
            # 'autocommit': True,
        },
    },

    'AM': {
        'NAME': env('DB_NAME'),
        'HOST': env('DB_SERVER'),
        'ENGINE': 'django.db.backends.postgresql',
        'USER': env('DB_USERNAME'),
        'PASSWORD': env('DB_PASSWORD'),
        'PORT': env("DB_PORT"),
        'ATOMIC_REQUESTS': True,
        'POOL_OPTIONS': {
            'POOL_SIZE': 20,
            'MAX_OVERFLOW': 10,
            'RECYCLE': 24 * 60 * 60
        },
        'OPTIONS': {
            # 'autocommit': True,
        }
    }

}

"""
Fetch Custom database connection from database for tenants
"""
try:
    from .tenant_initalizer import get_tenant_connection_list

    tenant_db_list = get_tenant_connection_list(env('DB_SERVER'), env('DB_USERNAME'), env('DB_PASSWORD'),
                                                env('DB_NAME'),env('DB_PORT'), DATABASES)
    if tenant_db_list:
        DATABASES = tenant_db_list

except Exception as e:
    raise Exception("Error while Loading tenant connection list")

DATABASE_ROUTERS = ['tenant.db_router.DbRouter']
# MULTITENANT_MAPPER_CLASS = 'db_multitenant.mysql_mapper.MySqlMapper'
# update_from_env(database_settings=DATABASES['AM'])

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',

    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
        'rest_framework.permissions.DjangoModelPermissions'
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    #    'EXCEPTION_HANDLER': 'apps.utils.custom_exception_handler.custom_exception_handler',
    'PAGE_SIZE': 10,
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(days=15),
    'REFRESH_TOKEN_LIFETIME': datetime.timedelta(days=30),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': datetime.timedelta(days=1),
    'SLIDING_TOKEN_REFRESH_LIFETIME': datetime.timedelta(days=1),
}
# Password validation
# https://docs.djangoproject.com/en/4.0/ref/settings/#auth-password-validators
AUTH_USER_MODEL = "security.User"
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.0/howto/static-files/

CORS_ORIGIN_ALLOW_ALL = False

APPEND_SLASH = True

STATIC_ROOT = 'staticfiles'

STATIC_URL = '/static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, "media")
ASSET_ROOT = os.path.join(BASE_DIR, "static/amigo-app/assets")
ASSET_URL = '/assets/'

ADMIN_MEDIA_PREFIX = '/static/admin/'

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)

# STATICFILES_DIRS = (os.path.join(BASE_DIR, 'static/'),)
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
)
CORS_ALLOWED_ORIGINS = [
    # "http://sanadi.craftyouridea.local:8000",
    # "http://localhost:4200"
    "http://aamaratech.localhost:4200"
]
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'n3plcpnl0268.prod.ams3.secureserver.net'
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = 'noreply@craftyouridea.com'
EMAIL_HOST_PASSWORD = 'Welcome@2020'  # password associated with above email-id

X_FRAME_OPTIONS = 'ALLOWALL'

XS_SHARING_ALLOWED_METHODS = ['POST', 'GET', 'OPTIONS', 'PUT', 'DELETE']

# Default primary key field type
# https://docs.djangoproject.com/en/4.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
CSRF_TRUSTED_ORIGINS = ['http://amigo-assetmanagement.craftyouridea.com']

CORS_ALLOW_CREDENTIALS = True