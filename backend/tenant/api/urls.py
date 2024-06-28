from tenant import api
from rest_framework import routers
from django.urls import include, path
from tenant import views

router = routers.DefaultRouter()
router.register("company", views.CompanyViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('activate/',views.activate, name='activate'),
]