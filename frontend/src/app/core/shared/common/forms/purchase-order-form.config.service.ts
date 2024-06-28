import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/core/services/api.service';
import { PurchaseOrderEnum, PurchaseOrderItemEnum } from '../enum/purchase-order.enum';
import { DeliveryTermsModel, PaymentTermsModel, PurchaseOrderItem, PurchaseOrderModel } from '../model/purchase-order.model';
import { InputField } from './core/builders/input.builder';
import { TabBuilder } from './core/builders/tab.builder';
import { OverlayPanelBuilder, TableBuilder } from './core/builders/table.builder';
import { FormObserver } from './core/form-observer';
import { DateField } from './core/builders/date.builder';
import * as moment from 'moment';
import { DropdownField } from './core/builders/dropdown.builder';
import { ServiceUrlConstants } from '../../utils/service-url-constants';
import { PocDetail, VendorMasterModel } from '../model/vendor-master.model';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PurchaseOrderFormConfig {
  private translate = inject(TranslateService);
  private apiService = inject(ApiService);
  private readonly formObserver = inject(FormObserver);

  updateQuantity = signal([
    { name: "" }, { name: "" }, { name: "" }, { name: "" },{ name: "" },{ name: "" },{ name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }
  ]);

  vendorListDropdownData = signal<VendorMasterModel[]>([]);
  deliveryTermsDropdownData = signal<VendorMasterModel[]>([]);
  paymentTermsDropdownData = signal<VendorMasterModel[]>([]);
  vendorPOCList = signal<PocDetail[]>([]);
  deliveryTerms = new DeliveryTermsModel();
  paymentTerms = new PaymentTermsModel();

  public readonly PurchaseOrderForm =
    () =>
      (dataFromComponent?: any, initialData?: PurchaseOrderModel, isEditMode?: boolean, data?: any) => {
        initialData = new PurchaseOrderModel();
        initialData.po_date = moment(new Date()).format("YYYY-MM-DD");
        this.getVendorDropDownData(dataFromComponent['vendor-options']);
        this.deliveryTermsDropdownData.set(dataFromComponent['delivery_terms']);
        this.paymentTermsDropdownData.set(dataFromComponent['payment_terms']);
        let list = isEditMode ? data.purchase_order_items : [];
        return [
          new TabBuilder(this.translate)
            .addTabFields([
              {
                tabHeader: this.translate.instant('purchase_Order_Details_TC'),
                fields: [
                  {
                    type: 'accordion',
                    fields: [
                      {
                        // @ts-ignore
                        accordionHeader: this.translate.instant('purchase_Order_Details_TC'),
                        fields: [
                          new InputField(this.translate, PurchaseOrderEnum.source, isEditMode, data, initialData).addFieldWidth('45%')
                            .validate(true)
                            .toObject(),
                          new InputField(this.translate, PurchaseOrderEnum.po_no, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                          new DateField(this.translate, PurchaseOrderEnum.po_date, isEditMode, data, initialData).addFieldWidth('45%')
                            .addFieldWidth('45%')
                            .onChange(this.onManufacturingDateChange.bind(this))
                            .addFormat("yy-mm-dd")
                            .validate(true)
                            .toObject(),
                          new DropdownField(this.translate, PurchaseOrderEnum.vendor, isEditMode, data, initialData)
                            .addFieldWidth('45%')
                            .addKeyValueLabel('vendor_name', 'id')
                            .getOptions(this.vendorListDropdownData)
                            .onChange(this.onVendorSelection.bind(this))
                            .toObject(),
                          new DropdownField(this.translate, PurchaseOrderEnum.poc, isEditMode, data, initialData)
                            .addFieldWidth('45%')
                            .addKeyValueLabel('name', 'id')
                            .getOptions(this.vendorPOCList)
                            .onChange(this.onPOCNameChange.bind(this))
                            .toObject(),
                          // new InputField(this.translate,PurchaseOrderEnum.poc_name,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                          new InputField(this.translate, PurchaseOrderEnum.poc_phone, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                          new InputField(this.translate, PurchaseOrderEnum.poc_email, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                        ]
                      },
                      {
                        // @ts-ignore
                        accordionHeader: this.translate.instant('address_Details_TC'),
                        // fieldWidth: '45%',
                        fields: [
                          {
                            type: 'multi-blocks',
                            // @ts-ignore
                            headerText: "Bill To",
                            fillScreen: "",
                            legendAlign: "",
                            blockDivider: "",
                            fields: [
                              new InputField(this.translate, PurchaseOrderEnum.bill_to_name, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.bill_to_address1, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.bill_to_address2, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.bill_to_tax_no, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.bill_to_country, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.bill_to_city, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.bill_to_zip_code, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.bill_to_state, isEditMode, data, initialData).addFieldWidth('100%').toObject(),

                            ]
                          },
                          {
                            type: 'multi-blocks',
                            // @ts-ignore
                            headerText: "Ship To",
                            fillScreen: "",
                            legendAlign: "",
                            blockDivider: "",
                            fields: [
                              new InputField(this.translate, PurchaseOrderEnum.ship_to_name, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.ship_to_address1, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.ship_to_address2, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.ship_to_tax_no, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.ship_to_country, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.ship_to_city, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.ship_to_zipcode, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                              new InputField(this.translate, PurchaseOrderEnum.ship_to_state, isEditMode, data, initialData).addFieldWidth('100%').toObject()
                            ]
                          }

                        ],
                      },
                      {
                        // @ts-ignore
                        accordionHeader: this.translate.instant('other_Details_TC'),
                        fields: [
                          new InputField(this.translate, PurchaseOrderEnum.vendor_quotation_no, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                          new DateField(this.translate, PurchaseOrderEnum.quotation_date, isEditMode, data, initialData).addFieldWidth('45%')
                            .addFieldWidth('45%')
                            .onChange(this.onQuotationDateChange.bind(this))
                            .addFormat("yy-mm-dd")
                            .toObject(),
                          new DropdownField(this.translate, PurchaseOrderEnum.delivery_terms, isEditMode, data, initialData, true)
                            .addFieldWidth('45%')
                            .addKeyValueLabel('name', 'id')
                            .getOptions(this.deliveryTermsDropdownData)
                            .onChange(this.onVendorSelection.bind(this))
                            .addSubfields(
                              new InputField(
                                this.translate,
                                'delivery_terms',
                                isEditMode,
                                data,
                                this.deliveryTerms.delivery_terms
                              ).toObject()
                            )
                            .saveData(this.saveDynamicDropdownOption.bind(this, 'delivery_terms'))
                            .getUrlConfig({
                              post: {
                                url: ServiceUrlConstants.APP_ENUMS,
                                params: {
                                  enum_key: 'delivery_terms'
                                }
                              },
                              get: {
                                url: ServiceUrlConstants.APP_ENUMS,
                                params: {
                                  enum_key: 'delivery_terms'
                                }
                              }
                            })
                            .bindOption(this.updateDynamicDropdownOptions.bind(this))
                            .toObject(),
                          // new InputField(this.translate,PurchaseOrderEnum.delivery_terms,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                          new InputField(this.translate, PurchaseOrderEnum.delivery_preference, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                          new DropdownField(this.translate, PurchaseOrderEnum.payment_terms, isEditMode, data, initialData, true)
                            .addFieldWidth('45%')
                            .addKeyValueLabel('name', 'id')
                            .getOptions(this.paymentTermsDropdownData)
                            .onChange(this.onVendorSelection.bind(this))
                            .addSubfields(
                              new InputField(
                                this.translate,
                                'payment_terms',
                                isEditMode,
                                data,
                                this.paymentTerms.payment_terms
                              ).toObject()
                            )
                            .saveData(this.saveDynamicDropdownOption.bind(this, 'payment_terms'))
                            .getUrlConfig({
                              post: {
                                url: ServiceUrlConstants.APP_ENUMS,
                                params: {
                                  enum_key: 'payment_terms'
                                }
                              },
                              get: {
                                url: ServiceUrlConstants.APP_ENUMS,
                                params: {
                                  enum_key: 'payment_terms'
                                }
                              }
                            })
                            .bindOption(this.updateDynamicDropdownOptions.bind(this))
                            .toObject(),
                          // new InputField(this.translate,PurchaseOrderEnum.payment_terms,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                          new InputField(this.translate, PurchaseOrderEnum.payment_type, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                          new InputField(this.translate, PurchaseOrderEnum.note, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                          new InputField(this.translate, PurchaseOrderEnum.terms_conditions, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                        ]
                      },
                    ]
                  },
                  //   new InputField(this.translate,"note",isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                ],
              },
              {
                tabHeader: this.translate.instant('addProducts_TC'),
                // fieldWidth: '45%',
                fields: [
                  new TableBuilder(this.translate, PurchaseOrderEnum.purchase_order_items)
                    .columnSchema([
                      PurchaseOrderItemEnum.asset_code + "_TC",
                      PurchaseOrderItemEnum.asset_name + "_TC",
                      PurchaseOrderItemEnum.asset_description + "_TC",
                      PurchaseOrderItemEnum.asset_mfr + "_TC",
                      PurchaseOrderItemEnum.delivery_date + "_TC",
                      PurchaseOrderItemEnum.qty + "_TC",
                      PurchaseOrderItemEnum.uom + "_TC",
                      PurchaseOrderItemEnum.unit_price + "_TC",
                      PurchaseOrderItemEnum.discount + "_TC",
                      PurchaseOrderItemEnum.discount_amount + "_TC",
                      PurchaseOrderItemEnum.tax + "_TC",
                      PurchaseOrderItemEnum.tax_amount + "_TC",
                      PurchaseOrderItemEnum.total_amount + "_TC",
                    ])
                    .formInitialise<PurchaseOrderItem>(new PurchaseOrderItem())
                    .formSchema([
                      {
                        name: PurchaseOrderItemEnum.asset_code,
                        type: 'input',
                      },
                      {
                        name: PurchaseOrderItemEnum.asset_name,
                        type: 'input',
                      },
                      {
                        name: PurchaseOrderItemEnum.asset_description,
                        type: 'input',
                      },
                      {
                        name: PurchaseOrderItemEnum.asset_mfr,
                        type: 'input',
                      },
                      {
                        name: PurchaseOrderItemEnum.delivery_date,
                        type: 'date',
                      },
                      {
                        name: PurchaseOrderItemEnum.qty,
                        type: 'number',
                        onValueChange: this.onChangeCalculationFields.bind(this),
                        updateTableFooter:this.updateTableFooterValues.bind(this)
                      },
                      {
                        name: PurchaseOrderItemEnum.uom,
                        type: 'input',
                      },
                      {
                        name: PurchaseOrderItemEnum.unit_price,
                        type: 'number',
                        onValueChange: this.onChangeCalculationFields.bind(this),
                        updateTableFooter:this.updateTableFooterValues.bind(this)
                      },
                      {
                        name: PurchaseOrderItemEnum.discount,
                        type: 'number',
                        onValueChange: this.onChangeCalculationFields.bind(this),
                        updateTableFooter:this.updateTableFooterValues.bind(this),
                        suffix:"%"
                      },
                      {
                        name: PurchaseOrderItemEnum.discount_amount,
                        type: 'number',
                        onValueChange: this.onChangeCalculationFields.bind(this),
                        updateTableFooter:this.updateTableFooterValues.bind(this)
                      },
                      {
                        name: PurchaseOrderItemEnum.tax,
                        type: 'number',
                        onValueChange: this.onChangeCalculationFields.bind(this),
                        updateTableFooter:this.updateTableFooterValues.bind(this),
                        suffix:"%"
                      },
                      {
                        name: PurchaseOrderItemEnum.tax_amount,
                        type: 'number',
                        onValueChange: this.onChangeCalculationFields.bind(this),
                        updateTableFooter:this.updateTableFooterValues.bind(this)
                      },
                      {
                        name: PurchaseOrderItemEnum.total_amount,
                        type: 'number',
                      }

                    ])
                    .getDatasource<Array<PurchaseOrderItem>>('id', list)
                    .enableFooter(true)
                    .setTableCaption(true)
                    // .setTableCaptionLabel("Testing")
                    .setTableCaptionDialogButton(true)
                    .setTableCaptionDialogButtonLabel("Add Asset")
                    .setExportTableData(true)
                    .setField(
                      new OverlayPanelBuilder()
                        .setTableName("purchase_order_items")
                        .setOverlayPanelColumnSchema([{ name: "Asset Name" }, { name: "Asset Code" }])
                        // .setOverlayPanelList(this.apiService.get(ServiceUrlConstants.ASSET))
                        .setOnUpdateRows(this.updateTableRows.bind(this))
                        .setOverlayPanelSelectionMode('single')
                        .setOverlayPanelRows(10)
                        .setDialogScrollHeight('55vh')
                        .setOverlayPanelFormInitialise(['asset_name', 'asset_code'])
                        .setOverlayPanelPaginator(true)
                        .setScrollable(true)
                        .setLazy(true)
                        .setFontSize('14px')
                        .setQueryParams({})
                        .setDisabledField('false')
                        .setUrls(ServiceUrlConstants.ASSET)
                        .build()
                    )
                    .footerInitialise(this.updateQuantity())
                    // .onChange(this.onSelectSameBillingAddress.bind(this))
                    .build(),
                  new InputField(this.translate, PurchaseOrderEnum.sub_total, isEditMode, data, initialData).addFieldWidth('45%')
                    .isReadOnly(true)
                    .toObject(),
                  new InputField(this.translate, PurchaseOrderEnum.discount, isEditMode, data, initialData).addFieldWidth('45%')
                    .isReadOnly(true)
                    .toObject(),
                  new InputField(this.translate, PurchaseOrderEnum.tax_amount, isEditMode, data, initialData).addFieldWidth('45%')
                    .isReadOnly(true)
                    .toObject(),
                  new InputField(this.translate, PurchaseOrderEnum.total_amount, isEditMode, data, initialData).addFieldWidth('45%')
                    .isReadOnly(true)
                    .toObject(),
                ],
              }
            ])
        ];
      };

  onSelectSameBillingAddress(a, b: PurchaseOrderItem[], c: PurchaseOrderModel) {
    this.formObserver.updateForm({ formType: "purchasseOrder", isUpdated: true });
    // this.updateQuantity.update(() => ([{ name: "" }, { name: "" }, { name: "" }, { name: "" },{ name: "" },{ name: "" }, { name: 6789 }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "" }, { name: "Tax Amount" }, { name: "Total Amount" }, { name: "" }]))
    c.purchase_order_items = b;
    return c;

  }

  onQuantityChange(a, b: PurchaseOrderItem[]) {
    return a;
  }

  onManufacturingDateChange(prev: any, next: any, formValue: any) {
    formValue.po_date = moment(formValue?.po_date).format("YYYY-MM-DD")
    return formValue
  }

  onQuotationDateChange(prev: any, next: any, formValue: PurchaseOrderModel) {
    formValue.quotation_date = moment(formValue?.quotation_date).format("YYYY-MM-DD")
    return formValue
  }

  getVendorDropDownData(dropdownList: any) {
    this.vendorListDropdownData.set(dropdownList)
  }

  onVendorSelection(prevState, nextState, formField) {
    this.vendorPOCList.set(this.vendorListDropdownData().find((item) => item.id === nextState).poc_details);
    formField[PurchaseOrderEnum.poc_name] = this.vendorPOCList()
    return formField
  }

  onPOCNameChange(prevState, nextState, formField) {
    formField[PurchaseOrderEnum.poc_email] = prevState[0]?.email
    formField[PurchaseOrderEnum.poc_phone] = prevState[0]?.phone_number
    return formField
  }

  saveDynamicDropdownOption(attribute: any, event: any, form: any) {
    form[attribute] = event[attribute]
    return {
      form: form, data: {
        enum_key: attribute,
        enum_value: event[attribute]
      }
    }
  }

  updateDynamicDropdownOptions(response) {
    if (response?.results?.length) {
      const options = (<any>response)?.results[0]?.enum_value;
      return options;
    }
  }

  updateTableRows(rows) {
    if(rows){
      return rows.map((row) => {
        let poItem: PurchaseOrderItem = new PurchaseOrderItem();
        poItem.asset = row.id;
        poItem.asset_code = row.asset_code;
        poItem.asset_description = row.asset_description;
        poItem.asset_name = row.asset_name;
        return poItem
      })
    }
  }


  onChangeCalculationFields(value, item: PurchaseOrderItem,formValue:PurchaseOrderModel) {
    const received_qty = +(item?.qty ?? 0);
    const unit_price = +(item?.unit_price ?? 0);
    const discount_percentage = +(item?.discount ?? 0);
    const tax_percentage = +(item?.tax ?? 0);
    const discountAmount = this.calculateDiscountAmount(received_qty, unit_price, discount_percentage);
    const taxAmount = this.calculateTaxAmount(received_qty, unit_price, tax_percentage);
    const totalAmount = this.calculateTotalAmount(received_qty, unit_price, discountAmount, taxAmount);
    if (item) {
      item[PurchaseOrderItemEnum.discount_amount] = discountAmount;
      item[PurchaseOrderItemEnum.tax_amount] = taxAmount;
      item[PurchaseOrderItemEnum.total_amount] = totalAmount;
    }
    return item;
  }

  calculateDiscountAmount(receivedQuantity: number, unitPrice: number, discountPercentage: number): number {
    const discountAmount = (unitPrice * receivedQuantity * discountPercentage) / 100;
    return discountAmount;
  }

  calculateTaxAmount(receivedQuantity: number, unitPrice: number, taxPercentage: number): number {
    const taxAmount = (unitPrice * receivedQuantity * taxPercentage) / 100;
    return taxAmount;
  }

  calculateTotalAmount(receivedQuantity: number, unitPrice: number, discountAmount: number, taxAmount: number) {
    const totalAmount = ((unitPrice * receivedQuantity) - discountAmount) + taxAmount;
    return totalAmount;
  }

  updateTableFooterValues(data:PurchaseOrderModel){
      let totalQty: number = 0;
      let totalTaxAmount: number = 0;
      let totalAmount: number = 0;
      let totalDiscountAmount:number = 0;
      const _ = require("lodash");
      _.forEach(data.purchase_order_items, function (element, key) {
        totalQty += Number(element?.qty??0);
        totalTaxAmount += Number(element?.tax_amount??0);
        totalAmount += Number(element?.total_amount??0);
        totalDiscountAmount += Number(element?.discount_amount??0);
      });
      const subTotal = (totalAmount + totalDiscountAmount)-totalTaxAmount;
      const purchaseOrderFooterInitialize:any = [];
      const purchaseOrderItemTableForm=Object.keys(PurchaseOrderItemEnum);
      purchaseOrderItemTableForm.forEach((ele, index) => {
        if (index === 0) {
         purchaseOrderFooterInitialize.push({ name: ' ' }); // Due to checkbox 
         purchaseOrderFooterInitialize.push({ name: 'Total' });
        }
        else {
          switch (ele) {
            case PurchaseOrderItemEnum.qty:
             purchaseOrderFooterInitialize.push({ name: totalQty.toFixed(2) });
              break;
            case PurchaseOrderItemEnum.tax_amount:
             purchaseOrderFooterInitialize.push({ name: totalTaxAmount.toFixed(2) });
              break;
            case PurchaseOrderItemEnum.total_amount:
             purchaseOrderFooterInitialize.push({ name: totalAmount.toFixed(2) });
              break;
            default:
             purchaseOrderFooterInitialize.push({ name: '' });
          }
        }
      })
      data.sub_total=subTotal;
      data.tax_amount=totalTaxAmount;
      data.discount=totalDiscountAmount;
      data.total_amount=totalAmount;
      purchaseOrderFooterInitialize.push({ name: '' }); // for action buttons to cover
      this.updateQuantity.set(purchaseOrderFooterInitialize);
      return {form:data,footerInitialize:purchaseOrderFooterInitialize};
  }


  onSaveBarCodeEntry(event, form){
    if (event['barcodeValue']) {
      // let serialNumberList = []
      // serialNumberList.push(event['barcodeValue']);
      
      form?.grn_items.forEach((grnItem)=>{
        grnItem['asset_serial_number'] += ","+ event['barcodeValue']
      })
    }
   

    return form;
  }
  
}
 