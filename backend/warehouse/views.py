import traceback

from django.core.files.base import ContentFile
from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, filters
from rest_framework.response import Response

from warehouse.models import Store

from exceptions.utils import api_exception_handler
from warehouse.models import Warehouse, AppSettings, AppEnums

from warehouse.api.serializers import WarehouseSerializer, StoreSerializer, AppSettingsSerializer, AppEnumsSerializer

from utils.code_generator_service import CodeGeneratorService


# warehouse model ViewSets

class WarehouseViewSet(viewsets.ModelViewSet):
    queryset = Warehouse.objects.all()
    serializer_class = WarehouseSerializer
    filterset_fields = {
        'id': ['exact', 'in']
    }
    filter_backends = [DjangoFilterBackend]

    def create(self, request, *args, **kwargs):
        try:
            req_data = request.data
            serializer = WarehouseSerializer(data=req_data)
            if not serializer.is_valid():
                error_obj = api_exception_handler(
                    detail="Invalid Request For Warehouse Creation",
                    status_code=status.HTTP_400_BAD_REQUEST,
                    error_info=serializer.errors,
                    source="client",
                    **{"serializer_err": True}
                )
                return Response({
                    "request_status": False,
                    "error": error_obj
                },
                    status=status.HTTP_400_BAD_REQUEST
                )
            warehouse_code = serializer.validated_data['warehouse_code']
            data = f'{warehouse_code.zfill(12)}'
            qr_code_data = CodeGeneratorService.generate_qr_code(data)
            serializer.validated_data['qr_code'] = qr_code_data
            warehouse = serializer.save()
            warehouse_response_data = WarehouseSerializer(warehouse).data
            return Response(
                data={
                    "request_status": True,
                    "data": warehouse_response_data
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as err:
            print("error", err)
            err_data = api_exception_handler(
                detail="Unknown System Error While Creating Warehouse",
                status_code=status.HTTP_400_BAD_REQUEST,
                error_info={
                    "error": str(err),
                    "debug_info": traceback.format_exc(),
                    "request_data": request.data
                },
                source="server"
            )
            return Response({
                "request_status": False,
                "error": {
                    "detail": err_data.get("detail")
                }
            }, status=status.HTTP_400_BAD_REQUEST)


class StoreViewSet(viewsets.ModelViewSet):
    queryset = Store.objects.all()
    serializer_class = StoreSerializer
    search_fields = ['store_name', 'store_code']
    filterset_fields = {
        'id': ['exact', 'in'],
        'store_name': ['exact', 'iexact', 'contains', 'icontains', 'startswith', 'endswith'],
        'store_code': ['exact', 'iexact', 'contains', 'icontains', 'startswith', 'endswith'],
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

    def create(self, request, *args, **kwargs):
        try:
            req_data = request.data
            serializer = StoreSerializer(data=req_data)
            if not serializer.is_valid():
                error_obj = api_exception_handler(
                    detail="Invalid Request For Store Creation",
                    status_code=status.HTTP_400_BAD_REQUEST,
                    error_info=serializer.errors,
                    source="client",
                    **{"serializer_err": True}
                )
                return Response({
                    "request_status": False,
                    "error": error_obj
                },
                    status=status.HTTP_400_BAD_REQUEST
                )
            store_code = serializer.validated_data['store_code']
            data = f'{store_code.zfill(12)}'
            qr_code_data = CodeGeneratorService.generate_qr_code(data)
            serializer.validated_data['qr_code'] = qr_code_data
            store = serializer.save()
            store_response_data = StoreSerializer(store).data
            return Response(
                data={
                    "request_status": True,
                    "data": store_response_data
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as err:
            print("error", err)
            err_data = api_exception_handler(
                detail="Unknown System Error While Creating Asset Category",
                status_code=status.HTTP_400_BAD_REQUEST,
                error_info={
                    "error": str(err),
                    "debug_info": traceback.format_exc(),
                    "request_data": request.data
                },
                source="server"
            )
            return Response({
                "request_status": False,
                "error": {
                    "detail": err_data.get("detail")
                }
            }, status=status.HTTP_400_BAD_REQUEST)


class AppSettingsViewSet(viewsets.ModelViewSet):
    """ViewSet for the Lookup class"""
    queryset = AppSettings.objects.all()
    serializer_class = AppSettingsSerializer


class AppEnumsViewSet(viewsets.ModelViewSet):
    """ViewSet for the Lookup class"""
    queryset = AppEnums.objects.all()
    serializer_class = AppEnumsSerializer
    search_fields = ['enum_key', 'enum_value']
    filterset_fields = {
        'id': ['exact', 'in'],
        'enum_key': ['exact', 'iexact', 'contains', 'icontains', 'startswith', 'endswith']
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]


