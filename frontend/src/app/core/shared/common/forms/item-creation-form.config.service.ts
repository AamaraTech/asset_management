import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ItemCreationModel } from '../model/item-creation.model';
import { ApiService } from 'src/app/core/services/api.service';
import * as moment from 'moment';
import { forkJoin, of } from 'rxjs';
import { DropdownField } from './core/builders/dropdown.builder';
import { InputField } from './core/builders/input.builder';
import { DateField } from './core/builders/date.builder';
import { TabBuilder } from './core/builders/tab.builder';
import { ServiceUrlConstants } from '../../utils/service-url-constants';
import { ItemCategoryModel } from '../model/item-category.model';
import { ItemSubCategoryModel } from '../model/item-subcategory.model';

@Injectable({
  providedIn: 'root',
})
export class ItemCreationFormConfig {
  subCategories = signal([]);
  categories = signal([]);
  categoryData = new ItemCategoryModel();
  subcategoryData = new ItemSubCategoryModel();
  private translate = inject(TranslateService);
  private apiService = inject(ApiService);

  public readonly ItemCreationForm =
    () =>
    (
      dataFromComponent?: any,
      initialData?: ItemCreationModel,
      isEditMode?: boolean,
      data?: any
    ) => {
      initialData = new ItemCreationModel();

      forkJoin([this.getCategories(), this.getSubCategories()]).subscribe(
        ([categories, subcategories]) => {
          this.categories.set((<any>categories)?.results);
          this.subCategories.set((<any>subcategories)?.results);
        }
      );

      return [
        new TabBuilder(this.translate).addTabFields([
          {
            tabHeader: this.translate.instant('Asset_Details_TC'),
            fields: [
              new InputField(
                this.translate,
                'asset_code',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
              new InputField(
                this.translate,
                'asset_name',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
              new InputField(
                this.translate,
                'asset_serial_number',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
              new InputField(
                this.translate,
                'asset_description',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
              new DropdownField(
                this.translate,
                'asset_category',
                isEditMode,
                data,
                initialData,
                true
              )
                .addFieldWidth('45%')
                .addSubfields(
                  new InputField(
                    this.translate,
                    'category',
                    isEditMode,
                    data,
                    this.categoryData.category
                  ).toObject()
                )
                .addKeyValueLabel('category', 'id')
                .getOptions(this.categories)
                .onChange(this.onCategoryChangeEvent.bind(this))
                .saveData(this.saveDynamicDropdownData.bind(this, 'asset_category'))
                .getUrlConfig({
                  post:{
                   url:ServiceUrlConstants.CATEGORY_CRUD,
                  },
                  get:{
                   url:ServiceUrlConstants.CATEGORY_CRUD,
                  }
                 })
                 .bindOption(this.updateDynamicDropdownOptions.bind(this))
                .toObject(),
              new DropdownField(
                this.translate,
                'asset_subcategory',
                isEditMode,
                data,
                initialData,
                true
              )
                .addFieldWidth('45%')
                .addSubfields(
                  new InputField(
                    this.translate,
                    'subcategory',
                    isEditMode,
                    data,
                    this.subcategoryData.subcategory
                  ).toObject()
                )
                .addKeyValueLabel('subcategory', 'id')
                .getOptions(this.subCategories)
                .saveData(this.saveDynamicDropdownData.bind(this, 'asset_subcategory'))
                .getUrlConfig({
                  post:{
                   url:ServiceUrlConstants.SUBCATEGORY_CRUD,
                  },
                  get:{
                   url:ServiceUrlConstants.SUBCATEGORY_CRUD,
                  }
                 })
                 .bindOption(this.updateDynamicDropdownOptions.bind(this))
                .toObject(),

              new DropdownField(
                this.translate,
                'asset_type',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .getOptions(this.getAssetTypes())
                .toObject(),
              new DropdownField(
                this.translate,
                'asset_status',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .getOptions(this.getAssetStatuses())
                .toObject(),
            ],
          },
          {
            tabHeader: this.translate.instant('Commercial_Details_TC'),
            // fieldWidth: '45%',
            fields: [
              new InputField(
                this.translate,
                'asset_hs_code',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
              new InputField(
                this.translate,
                'asset_purchase_cost',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
              new DateField(
                this.translate,
                'asset_purchase_date',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .addFormat('yy-mm-dd')
                .onChange(this.onManufacturingDateChange.bind(this))
                .toObject(),
              new DateField(
                this.translate,
                'asset_manufacturing_date',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .addFormat('yy-mm-dd')
                .onChange(this.onManufacturingDateChange.bind(this))
                .toObject(),
              new InputField(
                this.translate,
                'asset_lifecycle',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
              new InputField(
                this.translate,
                'asset_value_type',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
              new InputField(
                this.translate,
                'depreciation_incremental_percent_per_year',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
              new InputField(
                this.translate,
                'depreciation_incremental_value_cost',
                isEditMode,
                data,
                initialData
              )
                .addFieldWidth('45%')
                .toObject(),
            ],
          },
          {
            tabHeader: this.translate.instant('qrCode_TC'),
            // fieldWidth: '45%',
            fields: [
              {
                type: "image",
                label: this.translate.instant('qr_code_TC'),
                src: isEditMode ? data.qr_code :initialData.qr_code
              },
              {
                type: "image",
                label: this.translate.instant('barcode_TC'),
                src: isEditMode ? data.barcode :initialData.barcode
              }
            ],
          },
        ]),
      ];
    };

  private getAssetTypes(): any {
    return signal([
      { id: 'physical', name: 'Physical Asset' },
      { id: 'intellectual', name: 'Intellectual Asset' },
    ]);
  }

  private getAssetStatuses(): any {
    return signal([
      { id: 'new', name: 'New' },
      { id: 'used', name: 'Used' },
      { id: 'renewed', name: 'Renewed' },
      { id: 'rented', name: 'Rented' },
    ]);
  }

  saveDynamicDropdownData(attribute: any, event: any, form: any) {
    // form[attribute] = {};
    // form[attribute]['id'] = null;
    // form[attribute] = {
    //   ...form[attribute],
    //   ...event,
    // };
    // return of(form);
    return {data:event,attribute:attribute}
  }

  onCategoryChangeEvent(attribute: any, event: any, form: any){

  }

  onPurchaseDateChange(prev: any, next: any, formValue: any) {
    formValue.asset_purchase_date = moment(
      formValue?.asset_purchase_date
    ).format('YYYY-MM-DD');
    return formValue;
  }

  onManufacturingDateChange(prev: any, next: any, formValue: any) {
    formValue.asset_manufacturing_date = moment(
      formValue?.asset_manufacturing_date
    ).format('YYYY-MM-DD');
    return formValue;
  }

  getCategories() {
    return this.apiService.get('/asset/categories/');
  }

  getSubCategories() {
    return this.apiService.get('/asset/subcategories/');
  }

  updateDynamicDropdownOptions(response){
    if(response?.results?.length){
      const options=(<any>response)?.results;
      return options;
    }
  }
}
