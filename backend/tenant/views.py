from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from . import models
from .api import serializer
from .service import activate_account
from django.shortcuts import render

User = get_user_model()


@api_view(['GET'])
@permission_classes([AllowAny, ])
def activate(request):
    try:
        uidb64 = request.query_params['uidb64']
        token = request.query_params['token']
        activate = activate_account(uidb64, token)
        template_name = 'email_verification_status.html'
        if activate:
            response_data = {"message": "Your account activated successfully"}
            return render(request, template_name, response_data)
        else:
            response_data = {"message": "Your account activation failed"}
            return render(request, template_name, response_data)
    except Exception as e:
        return Response({"message": "An error occurred"}, status=status.HTTP_403_FORBIDDEN)


class CompanyViewSet(viewsets.ModelViewSet):
    """ViewSet for the Lookup class"""
    queryset = models.Company.objects.all()
    serializer_class = serializer.CompanySerializer



