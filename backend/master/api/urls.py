# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from master.views import (VendorMasterViewSet, EmployeeMasterViewSet, DepartmentViewSet, DesignationViewSet)

router = DefaultRouter()
router.register(r"vendor", VendorMasterViewSet)
router.register(r"department", DepartmentViewSet)
router.register(r"designation", DesignationViewSet)
router.register(r"employee-master", EmployeeMasterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]