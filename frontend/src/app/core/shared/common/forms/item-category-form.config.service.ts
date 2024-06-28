import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ItemCategoryModel } from '../model/item-category.model';

const lat = 28.7041; // Set the initial latitude here
const lng = 77.1025;

@Injectable({
  providedIn: 'root',
})
export class ItemCategoryFormConfig {
  private translate = inject(TranslateService);

  public readonly ItemCategoryForm =
    () => (dataFromComponent?:any, initialData?: ItemCategoryModel,isEditMode?: boolean, data?: any) =>{
      initialData = new ItemCategoryModel();
    return [
        {
          type: 'input',
          name: 'category_code',
          label: this.translate.instant('categoryCode_TC'),
          placeholder: this.translate.instant('formPlaceholder_SC', {
            label: this.translate.instant('categoryCode_TC'),
          }),
          get value() {
            return isEditMode ? data[this.name] : initialData.category_code;
          },
          validation: {
            required: true,
            minlength: 1,
          },
          // prefixGroupBy: true,
          // prefixGroupByIcon: 'pi-user',
          errorText: {
            required: this.translate.instant('formRequiredError_SC', {
              label: this.translate.instant('categoryCode_TC'),
            }),
            minlength: this.translate.instant('formMaxLengthError_SC', {
              label: this.translate.instant('categoryCode_TC'),
              char: this.translate.instant('one_number'),
            }),
          },
        },
        {
          type: 'input',
          name: 'category',
          label: this.translate.instant('category_TC'),
          placeholder: this.translate.instant('formPlaceholder_SC', {
            label: this.translate.instant('category_TC'),
          }),
          get value() {
            return isEditMode ? data[this.name] : initialData.category;
          },
          validation: {
            required: true,
            minlength: 1,
          },
          // prefixGroupBy: true,
          // prefixGroupByIcon: 'pi-user',
          errorText: {
            required: this.translate.instant('formRequiredError_SC', {
              label: this.translate.instant('category_TC'),
            }),
            minlength: this.translate.instant('formMaxLengthError_SC', {
              label: this.translate.instant('category_TC'),
              char: this.translate.instant('one_number'),
            }),
          },
        },
      ]}
}
