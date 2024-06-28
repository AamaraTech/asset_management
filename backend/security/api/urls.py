

from django.conf import settings

from django.urls import include, path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView


from django.contrib.auth import views as auth_views

from security.views import CreateUserAPIView, CustomTokenObtainPairView, change_password, get_user_permissions

router = routers.DefaultRouter()


urlpatterns = [
    path('usermanager/', CreateUserAPIView.as_view()),
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('change_password', change_password, name="change_password"),
    path('get_permissions', get_user_permissions, name="get_user_permissions"),
]