import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StoreModel } from '../model/store.model';
import { InputField } from './core/builders/input.builder';

const lat = 28.7041; // Set the initial latitude here
const lng = 77.1025;

@Injectable({
  providedIn: 'root',
})
export class StoreFormConfig {
  private translate = inject(TranslateService);

  public readonly STORE_FORM =
    () => (dataFromComponent?:any, defaultStoreData?: StoreModel, isEditMode?: boolean, data?: any) => {
      defaultStoreData = new StoreModel();
      return [
        {
          type: 'tab',
          headerText: this.translate.instant('warehouseDetails_TC'),
          headerTextArray: ['Store', 'Loaction', 'QR Code'],
          footerText: '',
          fillScreen: 48,
          fields: [
            {
              tabHeader: 'Store',
              fields: [
                new InputField(
                  this.translate,
                  'store_name',
                  isEditMode,
                  data,
                  defaultStoreData
                )
                  .addFieldWidth('45%')
                  .validate(true, 1)
                  .error()
                  .toObject(),
                new InputField(
                  this.translate,
                  'store_code',
                  isEditMode,
                  data,
                  defaultStoreData
                )
                  .addFieldWidth('45%')
                  .validate(true, 1)
                  .error()
                  .toObject(),
                {
                  type: 'map',
                  name: 'store_location',
                  fieldWidth: '100%',
                  label: this.translate.instant('warehouseLocation_TC'),
                  placeholder: this.translate.instant('formPlaceholder_SC', {
                    label: this.translate.instant('warehouseLocation_TC'),
                  }),

                  value: { lat, lng },
                  isDialogOpened: true,
                },
              ],
            },
            {
              tabHeader: 'QR Code',
              fields: [
                // {
                //   type: 'input',
                //   name: 'store_code',
                //   label: this.translate.instant('storeCode_TC'),
                //   placeholder: this.translate.instant('formPlaceholder_SC', {
                //     label: this.translate.instant('storeCode_TC'),
                //   }),
                //   get value() {
                //     return isEditMode ? data[this.name] : defaultStoreData.store_code;
                //   },
                //   validation: {
                //     required: true,
                //     minlength: 1,
                //   },
                //   // prefixGroupBy: true,
                //   // prefixGroupByIcon: 'pi-user',
                //   errorText: {
                //     required: this.translate.instant('formRequiredError_SC', {
                //       label: this.translate.instant('storeCode_TC'),
                //     }),
                //     minlength: this.translate.instant('formMaxLengthError_SC', {
                //       label: this.translate.instant('storeCode_TC'),
                //       char: this.translate.instant('one_number'),
                //     }),
                //   },
                // }
              ],
            }
          ],
        },
      ];
    };
}
