from django import forms
from django.forms import inlineformset_factory
from .models import Asset, AssetCategory, AssetSubcategory


# Form for AssetCategory model
class AssetCategoryForm(forms.ModelForm):
    """ Form for creating and updating AssetCategory instances. """

    class Meta:
        model = AssetCategory
        fields = '__all__'


# Form for AssetSubcategory model
class AssetSubcategoryForm(forms.ModelForm):
    """ Form for creating and updating AssetSubcategory instances. """

    class Meta:
        model = AssetSubcategory
        fields = '__all__'


# Formset for AssetCategory model used as an inline form in AssetForm
AssetCategoryFormSet = inlineformset_factory(AssetCategory, Asset, form=AssetCategoryForm, extra=1, can_delete=False)

# Formset for AssetSubcategory model used as an inline form in AssetForm
AssetSubcategoryFormSet = inlineformset_factory(AssetSubcategory, Asset, form=AssetSubcategoryForm, extra=1,
                                                can_delete=False)


# Form for Asset model
class AssetForm(forms.ModelForm):
    """ Form for creating and updating Asset instances. """

    class Meta:
        model = Asset
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(AssetForm, self).__init__(*args, **kwargs)
        self.fields['asset_category'].queryset = AssetCategory.objects.all()
        self.fields['asset_subcategory'].queryset = AssetSubcategory.objects.all()

    def clean(self):
        cleaned_data = super().clean()
        category = cleaned_data.get('asset_category')
        subcategory = cleaned_data.get('asset_subcategory')
        if not category:
            """ The following two lines are commented out because the 'category' field is not directly present in the Asset model,
            and there is no need to select or display the category name when editing an asset.
            This is handled through inline forms for AssetCategory and AssetSubcategory. """
            # category_name = cleaned_data.get('asset_category')
            # if not category_name:
            self.add_error('asset_category', 'Category name is required if category is not selected.')

        if not subcategory:
            # subcategory_name = cleaned_data.get('asset_subcategory')
            # if not subcategory_name:
            self.add_error('asset_subcategory', 'Subcategory name is required if subcategory is not selected.')

        return cleaned_data
