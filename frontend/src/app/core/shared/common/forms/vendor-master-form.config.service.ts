import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ItemCreationModel } from '../model/item-creation.model';
import { ApiService } from 'src/app/core/services/api.service';
import * as moment from "moment";
import { forkJoin, of } from 'rxjs';
import { DropdownField } from './core/builders/dropdown.builder';
import { InputField } from './core/builders/input.builder';
import { DateField } from './core/builders/date.builder';
import { TabBuilder } from './core/builders/tab.builder';
import { TableBuilder } from './core/builders/table.builder';
import { BankDetail, PocDetail, VendorMasterModel } from '../model/vendor-master.model';
import { TextBuilder } from './core/builders/textarea.builder';

const list: any = [
  ]

@Injectable({
  providedIn: 'root',
})
export class VendorMasterFormConfig {
  private translate = inject(TranslateService);
  private apiService = inject(ApiService);

  public readonly VendorMasterForm =
    () =>
    (dataFromComponent?:any, initialData?: VendorMasterModel, isEditMode?: boolean, data?: VendorMasterModel) => {
      initialData = new VendorMasterModel();
      const pocDetail= isEditMode ? data?.poc_details : initialData.poc_details;
      const bankDetail= isEditMode ? data?.bank_details : initialData.bank_details;
      return [
        new TabBuilder(this.translate)
        .addTabFields([
          {
            tabHeader: this.translate.instant('vendor_Details_TC'),
            fields: [
              {
                type: 'accordion',
                fields: [
                  {
                    // @ts-ignore
                    accordionHeader: this.translate.instant('vendor_Details_TC'),
                    fields:[
                      new InputField(this.translate,"vendor_type",isEditMode,data,initialData).addFieldWidth('45%')
                      .isReadOnly(true)
                      .toObject(),
                      new InputField(this.translate,"vendor_code",isEditMode,data,initialData).addFieldWidth('45%')
                      .validate(true)
                      .toObject(),
                      new InputField(this.translate,"vendor_name",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                      new InputField(this.translate,"ref_code",isEditMode,data,initialData).addFieldWidth('45%').toObject()
                    ]
                  },
                  {
                    // @ts-ignore
                    accordionHeader: this.translate.instant('address_Details_TC'),
                    // fieldWidth: '45%',
                    fields: [
                        new InputField(this.translate,"address_line1",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"address_line2",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"country",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"city",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"state",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"state_code",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"zip_code",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"phone_number",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"alternate_phone_no",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"fax_number",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"tax_number",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                        new InputField(this.translate,"email",isEditMode,data,initialData).addFieldWidth('45%').toObject()
                    ],
                  },
                  {
                    // @ts-ignore
                    accordionHeader: this.translate.instant('other_Details_TC'),
                    fields :[
                      new InputField(this.translate,"pan_no",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                      new InputField(this.translate,"cin_no",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                      new InputField(this.translate,"reference_no",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                      new InputField(this.translate,"payment_terms",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                      new InputField(this.translate,"payment_method",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                      new InputField(this.translate,"remarks",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                    ]
                  },
                ]
              },
              new TextBuilder(this.translate,"note",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
            ],
          },
          {
            tabHeader: this.translate.instant('POC_Details_TC'),
            // fieldWidth: '45%',
            fields: [
                new TableBuilder(this.translate, "poc_details", this.translate.instant('POC_Details_TC'))
                .columnSchema([
                    'name_TC',
                    'designation_TC',
                    'email_TC',
                    'phone_number_TC',
                  ])
                .formInitialise<PocDetail>(new PocDetail())
                .formSchema([
                    {
                      name: 'name',
                      type: 'input',
                    },
                    {
                      name: 'designation',
                      type: 'input',
                    },
                    {
                      name: 'email',
                      type: 'input',
                    },
                    {
                      name: 'phone_number',
                      type: 'input',
                    },
                  ])
                .getDatasource<Array<PocDetail>>('id', pocDetail)
                .build()
            ],
          },
          {
            tabHeader: this.translate.instant('bank_Details_TC'),
            // fieldWidth: '45%',
            fields: [
              new TableBuilder(this.translate, "bank_details", this.translate.instant('bank_Details_TC'))
                .columnSchema([
                  'bank_name_TC',
                  "branch_name_TC",
                  "account_name_TC",
                  "account_number_TC",
                  "swift_code_TC",
                  "routing_code_TC",
                  ])
                .formInitialise<BankDetail>(new BankDetail())
                .formSchema([
                  {
                    name: 'bank_name',
                    type: 'input',
                  },
                  {
                    name: 'branch_name',
                    type: 'input',
                  },
                  {
                    name: 'account_name',
                    type: 'input'
                  },
                  {
                    name: 'account_number',
                    type: 'input',
                  },
                  {
                    name: 'swift_code',
                    type: 'input',
                  },
                  {
                    name: 'routing_code',
                    type: 'input',
                  }
                  ])
                .getDatasource<Array<BankDetail>>('id', bankDetail)
                .build(),
            ],
          },
        ])
      ];
    };
}
