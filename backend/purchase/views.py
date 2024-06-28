# views.py
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from purchase.api.serializers import PurchaseOrderSerializer
from purchase.models import PurchaseOrder


# Purchase Order ViewSets
class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer
    search_fields = []
    filterset_fields = {
        'w_id': ['exact'],
        's_id': ['exact']
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
