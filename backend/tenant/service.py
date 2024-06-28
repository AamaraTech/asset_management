
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import Http404
from django.contrib.auth import get_user_model
User = get_user_model()



def activate_account(uidb64,token):
    uid = force_str(urlsafe_base64_decode(uidb64))
    user = User.objects.get(id=uid)
    if user and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        return True
    else:
        return False