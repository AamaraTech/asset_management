# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from purchase.views import PurchaseOrderViewSet

router = DefaultRouter()
router.register(r"purchase-order", PurchaseOrderViewSet)

urlpatterns = [
    path('', include(router.urls)),
]