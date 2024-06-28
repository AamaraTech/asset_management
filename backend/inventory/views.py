from django.shortcuts import render
from rest_framework import viewsets

from inventory.api.serializers import GoodsReceiptNoteSerializer
from inventory.models import GoodsReceiptNote
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.
class GoodsReceiptNoteViewSet(viewsets.ModelViewSet):
    queryset = GoodsReceiptNote.objects.all()
    serializer_class = GoodsReceiptNoteSerializer
    search_fields = []
    filterset_fields = {
        'w_id': ['exact'],
        's_id': ['exact']
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
