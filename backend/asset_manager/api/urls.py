# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from asset_manager.views import (
    AssetCategoryViewSet,
    AssetSubcategoryViewSet,
    AssetViewSet, AssetLocationViewSet, AssetSerialNumberViewSet
)



router = DefaultRouter()
router.register(r'asset-serial-numbers', AssetSerialNumberViewSet)
router.register(r'categories', AssetCategoryViewSet)
router.register(r'subcategories', AssetSubcategoryViewSet)
router.register(r'asset-location', AssetLocationViewSet)
# router.register(r"create", AssetCreateViewSet)
router.register(r"", AssetViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
