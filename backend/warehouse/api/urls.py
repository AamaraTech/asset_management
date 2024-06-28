# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from warehouse.views import StoreViewSet,WarehouseViewSet,AppSettingsViewSet, AppEnumsViewSet


router = DefaultRouter()
router.register(r'AppEnums', AppEnumsViewSet)
router.register(r'AppSettings', AppSettingsViewSet)
router.register(r'stores', StoreViewSet)
router.register(r'', WarehouseViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
