# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from inventory.views import GoodsReceiptNoteViewSet

router = DefaultRouter()
router.register(r"grn", GoodsReceiptNoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
]