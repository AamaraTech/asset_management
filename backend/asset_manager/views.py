# views.py
import json
from django.core.files.base import ContentFile, File
from rest_framework import viewsets, status
from rest_framework.response import Response
from asset_manager.models import Asset, AssetCategory, AssetSubcategory, AssetLocation, AssetSerialNumber
from asset_manager.api.serializers import (
    AssetCategorySerializer,
    AssetSubcategorySerializer,
    AssetSerializer, AssetLocationSerializer, AssetSerialNumberSerializer
)
import traceback
from exceptions.utils import api_exception_handler
from utils.code_generator_service import CodeGeneratorService

from utils.constants import NumberConstructorConstants
from utils.number_constuctor import NumberConstructor
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class AssetCategoryViewSet(viewsets.ModelViewSet):
    queryset = AssetCategory.objects.all()
    serializer_class = AssetCategorySerializer

    def create(self, request, *args, **kwargs):
        try:
            req_data = request.data
            #
            # does_category_exist = AssetCategory.objects.filter(
            #     category_code=req_data.get("category_code")).exists()
            # if does_category_exist:
            #     error_obj = api_exception_handler(
            #         detail="Asset Category Already Exists",
            #         status_code=status.HTTP_400_BAD_REQUEST,
            #         error_info={
            #             "category_code": "Asset Category Already Exists"
            #         },
            #         source="client"
            #     )
            #     return Response({
            #         "request_status": False,
            #         "error": error_obj
            #     }, status=status.HTTP_400_BAD_REQUEST)
            serializer = AssetCategorySerializer(data=req_data, context={'request': self.request})
            if not serializer.is_valid():
                error_obj = api_exception_handler(
                    detail="Invalid Request For Asset Category Creation",
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
            serializer.validated_data['category_code'] = NumberConstructor().generate_next_sequence(
                NumberConstructorConstants.
                CATEGORY_NUMBERING, False)
            assetcategory = serializer.save()
            assetcategory_response_data = AssetCategorySerializer(assetcategory).data
            return Response(
                assetcategory_response_data
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


class AssetSubcategoryViewSet(viewsets.ModelViewSet):
    queryset = AssetSubcategory.objects.all()
    serializer_class = AssetSubcategorySerializer

    def create(self, request, *args, **kwargs):
        try:
            req_data = request.data
            # does_subcategory_exists = AssetSubcategory.objects.filter(
            #     subcategory_code=req_data.get("subcategory_code")).exists()
            # if does_subcategory_exists:
            #     error_obj = api_exception_handler(
            #         detail="Asset Subcategory Already Exists",
            #         status_code=status.HTTP_400_BAD_REQUEST,
            #         error_info={
            #             "subcategory_code": "Asset Subcategory Already Exists"
            #         },
            #         source="client"
            #     )
            #     return Response({
            #         "request_status": False,
            #         "error": error_obj
            #     }, status=status.HTTP_400_BAD_REQUEST)
            serializer = AssetSubcategorySerializer(data=req_data, context={'request': self.request})
            if not serializer.is_valid():
                error_obj = api_exception_handler(
                    detail="Invalid Request For Asset Subcategory Creation",
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
            serializer.validated_data['subcategory_code'] = NumberConstructor().generate_next_sequence(
                NumberConstructorConstants.
                SUBCATEGORY_NUMBERING, False)
            assetsubcategory = serializer.save()
            assetsubcategory_response_data = AssetSubcategorySerializer(assetsubcategory).data
            return Response(
                assetsubcategory_response_data
            )
        except Exception as err:
            err_data = api_exception_handler(
                detail="Unknown System Error While Creating Asset Subcategory",
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


class AssetViewSet(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer

    def create(self, request, *args, **kwargs):
        try:
            req_data = request.data
            category_data = req_data.pop('category') if "category" in req_data else None
            subcategory_data = req_data.pop('subcategory') if "subcategory" in req_data else None
            serializer = AssetSerializer(data=req_data, context={'request': self.request})

            if not serializer.is_valid():
                error_obj = api_exception_handler(
                    detail="Invalid Request For Asset Creation",
                    status_code=status.HTTP_400_BAD_REQUEST,
                    error_info=serializer.errors,
                    source="client",
                    **{"serializer_err": True}
                )
                return Response({
                    "request_status": False,
                    "error": error_obj
                }, status=status.HTTP_400_BAD_REQUEST)

            if category_data:
                if category_data.get("id"):
                    category = AssetCategory.objects.get(id=category_data.get("id"))
                    serializer.validated_data['asset_category'] = category
                else:
                    # If category data is provided, either create a new category or use an existing one
                    category_serializer = AssetCategorySerializer(data=category_data)
                    if not category_serializer.is_valid():
                        error_obj = api_exception_handler(
                            detail="Invalid Request For Asset Category Creation",
                            status_code=status.HTTP_400_BAD_REQUEST,
                            error_info=serializer.errors,
                            source="client",
                            **{"serializer_err": True}
                        )
                        return Response({
                            "request_status": False,
                            "error": error_obj
                        }, status=status.HTTP_400_BAD_REQUEST)
                    category, created = AssetCategory.objects.get_or_create(**category_serializer.validated_data)
                    serializer.validated_data['asset_category'] = category

            if subcategory_data:
                if subcategory_data.get("id"):
                    subcategory = AssetSubcategory.objects.get(id=subcategory_data.get("id"))
                    serializer.validated_data['asset_subcategory'] = subcategory
                else:
                    # If subcategory data is provided, either create a new subcategory or use an existing one
                    subcategory_serializer = AssetSubcategorySerializer(data=subcategory_data)
                    if not subcategory_serializer.is_valid():
                        print("serializer errors",serializer.errors)
                        error_obj = api_exception_handler(
                            detail="Invalid Request For Asset Subcategory Creation",
                            status_code=status.HTTP_400_BAD_REQUEST,
                            error_info=serializer.errors,
                            source="client",
                            **{"serializer_err": True}
                        )
                        return Response({
                            "request_status": False,
                            "error": error_obj
                        }, status=status.HTTP_400_BAD_REQUEST)
                    subcategory, created = AssetSubcategory.objects.get_or_create(
                        **subcategory_serializer.validated_data)
                    serializer.validated_data['asset_subcategory'] = subcategory

            # generate asset code.
            serializer.validated_data['asset_code'] = NumberConstructor().generate_next_sequence(
                NumberConstructorConstants.
                ASSET_NUMBERING, False).zfill(12)
            # Generate QR code image
            data = serializer.validated_data['asset_code']
            qr_code_data = CodeGeneratorService.generate_qr_code(data)
            barcode_buffer = CodeGeneratorService.generate_barcode(data)
            serializer.validated_data['qr_code'] = qr_code_data
            serializer.validated_data['barcode'] = barcode_buffer
            asset = serializer.save()
            asset_response_data = AssetSerializer(asset).data
            return Response(
                data={
                    "request_status": True,
                    "data": asset_response_data
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as err:
            print("error", err)
            err_data = api_exception_handler(
                detail="Unknown System Error While Creating Asset",
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

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            req_data = request.data
            category_data = req_data.pop('category') if "category" in req_data else None
            subcategory_data = req_data.pop('subcategory') if "subcategory" in req_data else None

            # Update the serializer instance with the request data and the existing instance
            serializer = AssetSerializer(instance, data=req_data, partial=True, context={'request': self.request})
            if not serializer.is_valid():
                error_obj = api_exception_handler(
                    detail="Invalid Request For Asset Update",
                    status_code=status.HTTP_400_BAD_REQUEST,
                    error_info=serializer.errors,
                    source="client",
                    **{"serializer_err": True}
                )
                return Response({
                    "request_status": False,
                    "error": error_obj
                }, status=status.HTTP_400_BAD_REQUEST)

            if category_data:
                if category_data.get("id"):
                    category = AssetCategory.objects.get(id=category_data.get("id"))
                    serializer.validated_data['asset_category'] = category
                else:
                    # If category data is provided, either create a new category or use an existing one
                    category_serializer = AssetCategorySerializer(data=category_data)
                    if not category_serializer.is_valid():
                        error_obj = api_exception_handler(
                            detail="Invalid Request For Asset Category Creation",
                            status_code=status.HTTP_400_BAD_REQUEST,
                            error_info=serializer.errors,
                            source="client",
                            **{"serializer_err": True}
                        )
                        return Response({
                            "request_status": False,
                            "error": error_obj
                        }, status=status.HTTP_400_BAD_REQUEST)
                    category, created = AssetCategory.objects.get_or_create(**category_serializer.validated_data)
                    serializer.validated_data['asset_category'] = category

            if subcategory_data:
                if subcategory_data.get("id"):
                    subcategory = AssetSubcategory.objects.get(id=subcategory_data.get("id"))
                    serializer.validated_data['asset_subcategory'] = subcategory
                else:
                    # If subcategory data is provided, either create a new subcategory or use an existing one
                    subcategory_serializer = AssetSubcategorySerializer(data=subcategory_data)
                    if not subcategory_serializer.is_valid():
                        error_obj = api_exception_handler(
                            detail="Invalid Request For Asset Subcategory Creation",
                            status_code=status.HTTP_400_BAD_REQUEST,
                            error_info=serializer.errors,
                            source="client",
                            **{"serializer_err": True}
                        )
                        return Response({
                            "request_status": False,
                            "error": error_obj
                        }, status=status.HTTP_400_BAD_REQUEST)
                    subcategory, created = AssetSubcategory.objects.get_or_create(
                        **subcategory_serializer.validated_data)
                    serializer.validated_data['asset_subcategory'] = subcategory

            asset = serializer.save()
            asset_response_data = AssetSerializer(asset).data
            return Response(
                data={
                    "request_status": True,
                    "data": asset_response_data
                },
                status=status.HTTP_200_OK
            )
        except Exception as err:
            print("error", err)
            err_data = api_exception_handler(
                detail="Unknown System Error While Creating Asset",
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


class AssetLocationViewSet(viewsets.ModelViewSet):
    queryset = AssetLocation.objects.all()
    serializer_class = AssetLocationSerializer
    search_fields = []  # Add the fields you want to search
    filterset_fields = {
        'w_id': ['exact'],
        's_id': ['exact']
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]


class AssetSerialNumberViewSet(viewsets.ModelViewSet):
    queryset = AssetSerialNumber.objects.all()
    serializer_class = AssetSerialNumberSerializer
    search_fields = []
    filterset_fields = {
        'w_id': ['exact'],
        's_id': ['exact'],
        'asset': ['exact']
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
