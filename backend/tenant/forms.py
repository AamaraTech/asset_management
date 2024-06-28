# forms.py
from django import forms
from .models import Company


class CompanyForm(forms.ModelForm):
    """ A Django ModelForm for the Company model. """
    class Meta:
        model = Company
        fields = '__all__'
