# views.py
import traceback
from sqlite3 import DatabaseError, IntegrityError

from django.db import transaction
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

from exceptions.utils import api_exception_handler
from master.models import VendorMaster, Department, Designation, EmployeeMaster
from master.api.serializers import VendorMasterSerializer, DepartmentSerializer, DesignationSerializer, \
    EmployeeMasterSerializer
from rest_framework.response import Response
from rest_framework import viewsets, status

from utils.constants import NumberConstructorConstants
from utils.exception_handler import ExceptionsHandler, ApiException
from utils.number_constuctor import NumberConstructor

exception_handler = ExceptionsHandler()


class VendorMasterViewSet(viewsets.ModelViewSet):
    queryset = VendorMaster.objects.all()
    serializer_class = VendorMasterSerializer
    search_fields = ['vendor_name', 'vendor_code']
    filterset_fields = {
        'id': ['exact', 'in'],
        'vendor_name': ['exact', 'iexact', 'contains', 'icontains', 'startswith', 'endswith'],
        'vendor_code': ['exact', 'iexact', 'contains', 'icontains', 'startswith', 'endswith'],
        'w_id': ['exact'],
        's_id': ['exact']
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
    search_fields = []
    filterset_fields = {
        'w_id': ['exact'],
        's_id': ['exact']
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]


class DesignationViewSet(viewsets.ModelViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    search_fields = []
    filterset_fields = {
        'w_id': ['exact'],
        's_id': ['exact']
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]


class EmployeeMasterViewSet(viewsets.ModelViewSet):
    queryset = EmployeeMaster.objects.all()
    serializer_class = EmployeeMasterSerializer
    search_fields = []
    filterset_fields = {
        'w_id': ['exact'],
        's_id': ['exact']
    }
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            req_data = request.data
            designation_data = req_data.pop('designation') if "designation" in req_data else None
            department_data = req_data.pop('department') if "department" in req_data else None
            serializer = EmployeeMasterSerializer(data=req_data, context={'request': self.request})

            if not serializer.is_valid():
                exception_handler.handle_serializer_errors(serializer,
                                                           "Invalid Request For Employee Creation")

            if designation_data:
                if isinstance(designation_data, dict):
                    # If designation data is provided, either create a new designation or use an existing one
                    designation_serializer = DesignationSerializer(data=designation_data)
                    if not designation_serializer.is_valid():
                        exception_handler.handle_serializer_errors(designation_serializer,
                                                                   "Invalid Request For Employee Creation",status.HTTP_409_CONFLICT)
                    designation, created = Designation.objects.get_or_create(**designation_serializer.validated_data)
                    serializer.validated_data['designation'] = designation
                else:
                    print("designation",designation_data)
                    serializer.validated_data['designation'] = designation_data

            if department_data:
                if isinstance(department_data, dict):
                    # If subcategory data is provided, either create a new subcategory or use an existing one
                    department_serializer = DepartmentSerializer(data=department_data)
                    if not department_serializer.is_valid():
                        exception_handler.handle_serializer_errors(department_serializer,
                                                                   "Invalid Request For Employee Creation",
                                                                   status.HTTP_409_CONFLICT)
                    department, created = Department.objects.get_or_create(
                        **department_serializer.validated_data)
                    serializer.validated_data['department'] = department
                else:
                    serializer.validated_data['department_id'] = department_data

            # generate employee code.
            serializer.validated_data['employee_code'] = NumberConstructor().generate_next_sequence(
                NumberConstructorConstants.
                EMPLOYEE_NUMBERING, False).zfill(12)

            employee = serializer.save()
            employee_response_data = EmployeeMasterSerializer(employee).data

            return Response(
                data={
                    "request_status": True,
                    "data": employee_response_data
                },
                status=status.HTTP_201_CREATED
            )
        except ApiException as api_exception:
            return Response(
                api_exception.error_info
                , status=api_exception.status_code)
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

    @transaction.atomic
    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            req_data = request.data
            designation_data = req_data.pop('designation') if "designation" in req_data else None
            department_data = req_data.pop('department') if "department" in req_data else None
            serializer = EmployeeMasterSerializer(instance, data=req_data, context={'request': self.request})

            if not serializer.is_valid():
                exception_handler.handle_serializer_errors(serializer, "Invalid Request For Employee Update")

            if designation_data and isinstance(designation_data, dict):
                if isinstance(designation_data, dict):
                    designation_serializer = DesignationSerializer(data=designation_data)
                    if not designation_serializer.is_valid():
                        exception_handler.handle_serializer_errors(designation_serializer,
                                                                   "Invalid Request For Employee Update")

                    designation, created = Designation.objects.get_or_create(
                        **designation_serializer.validated_data)
                    serializer.validated_data['designation'] = designation
                else:
                    serializer.validated_data['designation'] = designation_data

            if department_data:
                if isinstance(department_data, dict):
                    department_serializer = DepartmentSerializer(data=department_data)
                    if not department_serializer.is_valid():
                        exception_handler.handle_serializer_errors(department_serializer,
                                                                   "Invalid Request For Employee Update")
                    department, created = Department.objects.get_or_create(
                        **department_serializer.validated_data)
                    serializer.validated_data['department'] = department
                else:
                    serializer.validated_data['department_id'] = department_data

            employee = serializer.save()
            employee_response_data = EmployeeMasterSerializer(employee).data

            return Response(
                data={
                    "request_status": True,
                    "data": employee_response_data
                },
                status=status.HTTP_200_OK
            )
        except ApiException as api_exception:
            return Response(api_exception.error_info, status=api_exception.status_code)

