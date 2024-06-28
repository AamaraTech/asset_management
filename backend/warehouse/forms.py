from django import forms
from .models import Warehouse, Store


# Form for Warehouse model
class WarehouseForm(forms.ModelForm):
    """ Form for creating and updating Warehouse instances. """

    class Meta:
        model = Warehouse
        fields = '__all__'


# Form for Store model
class StoreForm(forms.ModelForm):
    """ Form for creating and updating Store instances. """

    class Meta:
        model = Store
        fields = '__all__'
