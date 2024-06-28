import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GrnItem, InventoryGrnModel } from '../model/inventory-grn.model';
import { TabBuilder } from './core/builders/tab.builder';
import { InputField } from './core/builders/input.builder';
import { GrnItemEnum, InventoryGrnEnum } from '../enum/inventory-grn.enum';
import { DateField } from './core/builders/date.builder';
import * as moment from 'moment';
import { DropdownField } from './core/builders/dropdown.builder';
import { OverlayPanelBuilder, TableBuilder } from './core/builders/table.builder';
import { TextBuilder } from './core/builders/textarea.builder';
import { ApiService } from 'src/app/core/services/api.service';
import { ServiceUrlConstants } from '../../utils/service-url-constants';
import { PurchaseOrderEnum } from '../enum/purchase-order.enum';
import { UntypedFormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GRNFormConfig {
  private translate = inject(TranslateService);
  private readonly apiService = inject(ApiService);

  private assets = signal(null);
  private sourceList = signal([
    {
      key: 'direct',
      value: 'Direct'
    },
    {
      key: 'purchase_order',
      value: 'Purchase Order'
    }
  ])

  public readonly InventoryGrnForm =
    () =>
    (dataFromComponent?:any, initialData?: InventoryGrnModel, isEditMode?: boolean, data?: InventoryGrnModel) => {
      let grn = new GrnItem();
      grn.asset = 1;
      grn.hs_code = "test hscode"
      let list = isEditMode ? data.grn_items : [];

      initialData = new InventoryGrnModel();
      initialData.grn_date = moment().format("YYYY-MM-DD");
      initialData.exit_date = moment().format("YYYY-MM-DD[T]HH:mm:ss");
      initialData.arrive_date = moment().format("YYYY-MM-DD[T]HH:mm:ss");

      return [
        new TabBuilder(this.translate)
        .addTabFields([

          {
            tabHeader: this.translate.instant('grn_details_TC'),
            fields: [
              {
                type: 'accordion',
                fields: [
                  {
                    // @ts-ignore
                    accordionHeader: this.translate.instant('grn_details_TC'),
                    fields:[
                      // grn_no
                      new InputField(this.translate, InventoryGrnEnum.grn_no, isEditMode, data, initialData)
                      .addFieldWidth('32%')
                      .isReadOnly(true)
                      .toObject(),
                      new DropdownField(this.translate, InventoryGrnEnum.source, isEditMode, data, initialData)
                      .addFieldWidth('32%')
                      .validate(true)
                      .addKeyValueLabel('value', 'key')
                      .getOptions(this.sourceList)
                      .onChange(this.onSourceDropdownChange.bind(this))
                      .toObject(),
                      new DropdownField(this.translate, InventoryGrnEnum.purchase_order, isEditMode, data, initialData)
                      .addFieldWidth('32%')
                      .addKeyValueLabel('value', 'key')
                      // .isReadOnlyField(true)
                      .isFieldHidden(dataFromComponent?.filed["purchase_order"].IsHidden)
                      .getOptions(this.sourceList)
                      .toObject(),
                      new DateField(this.translate, InventoryGrnEnum.grn_date,isEditMode,data,initialData)
                      .addFieldWidth('32%')
                      .validate(true)
                      .onChange(this.onGrnDateChange.bind(this))
                      .addFormat("yy-mm-dd")
                      .toObject(),
                      // new InputField(this.translate, InventoryGrnEnum.source, isEditMode, data, initialData).addFieldWidth('22%').toObject(),
                    
                      
                      new InputField(this.translate, InventoryGrnEnum.vendor_bill, isEditMode, data, initialData).addFieldWidth('32%').validate(true).toObject(),
                      new DateField(this.translate, InventoryGrnEnum.vendor_bill_date,isEditMode,data,initialData)
                      .addFieldWidth('32%')
                      .addFormat("yy-mm-dd")
                      .validate(true)
                      .onChange(this.onVendorBillDateChange.bind(this))
                      .toObject(),
                      new DropdownField(this.translate, InventoryGrnEnum.vendor, isEditMode, data, initialData)
                      .addFieldWidth('32%')
                      .addKeyValueLabel('value', 'key')
                      .getOptions(this.sourceList)
                      .toObject(),
                      // new InputField(this.translate, InventoryGrnEnum.vendor_bill, isEditMode, data, initialData).addFieldWidth('32%').toObject(), //vendor address is not part of api response
                      new InputField(this.translate, InventoryGrnEnum.other_ref_no, isEditMode, data, initialData)
                      .validate(true).addFieldWidth('32%').toObject(),

                      new TextBuilder(this.translate, InventoryGrnEnum.note, isEditMode, data, initialData).addFieldWidth('32%')
                      .validate(true).toObject(),
                        
                    ]
                  },
                  {
                    // @ts-ignore
                    accordionHeader: this.translate.instant('vehicle_details_TC'),
                    fields:[
                      new InputField(this.translate, InventoryGrnEnum.vehicle_no, isEditMode, data, initialData)
                      .validate(true).addFieldWidth('22%').toObject(),
                      new DateField(this.translate, InventoryGrnEnum.arrive_date,isEditMode,data,initialData)
                      .addFieldWidth('22%')
                      .validate(true)
                      .addFormat("yy-mm-dd")
                      .toObject(),
                      new DateField(this.translate, InventoryGrnEnum.exit_date,isEditMode,data,initialData)
                      .addFieldWidth('22%')
                      .validate(true)
                      .addFormat("yy-mm-dd")
                      .toObject(),
                      new TextBuilder(this.translate, InventoryGrnEnum.remarks, isEditMode, data, initialData).addFieldWidth('100%').toObject(),
                    ]
                  }
                ]
              }
            ],
          },
          {
            tabHeader: this.translate.instant('addProducts_TC'),
            // fieldWidth: '45%',
            fields: [
                new TableBuilder(this.translate, InventoryGrnEnum.grn_items)
                .columnSchema([
                    GrnItemEnum.asset+"_TC",
                    "asset_code_TC",
                    "asset_description_TC",
                    "asset_serial_number_TC",
                    GrnItemEnum.hs_code+"_TC",
                    GrnItemEnum.uom+"_TC",
                    GrnItemEnum.po_qty+"_TC",
                    GrnItemEnum.received_qty+"_TC",
                    GrnItemEnum.unit_price+"_TC",
                    GrnItemEnum.discount+"_TC",
                    GrnItemEnum.discount_amount+"_TC",
                    GrnItemEnum.tax+"_TC",
                    GrnItemEnum.tax_amount+"_TC",
                    GrnItemEnum.sub_total+"_TC",
                    GrnItemEnum.total_amount+"_TC",
                    GrnItemEnum.reject_qty+"_TC",
                    GrnItemEnum.accepted_qty+"_TC",
                    GrnItemEnum.balance_qty+"_TC",
                    GrnItemEnum.trc_number+"_TC",
                    GrnItemEnum.remarks+"_TC",
                  ])
                  
                .formInitialise<GrnItem>(new GrnItem())
                .formSchema([
                    {
                      name: "asset",
                      type: 'input',
                    },
                    {
                      name: "asset_code",
                      type: 'input',
                    },
                    {
                      name: "asset_description",
                      type: 'input',
                    },
                    {
                      name: "asset_serial_number",
                      type: 'dropdown',
                      dialogue: true,
                      label:"test",
                      dialogueLabel: "Enter Serial Number",
                      emptyCustomDialogTemplate: true,
                      emptyComment:"",
                      placeholder: this.translate.instant('enter_Serial_Number_TC', { label: this.translate.instant('enter_Serial_Number_TC') }),
                      options: [{productName:"Vishnu","id":"vishnu"}],
                      optionLabel: "productName",
                      optionValue: "id",
                      dialogueWidth: '80vw',
                      dialogueHeight: '80vh',
                      saveDialogueData: this.onSaveBarCodeEntry.bind(this),
                      dialogueFields: [
                          new InputField(this.translate, "barcodeValue", isEditMode, data, initialData)
                      .validate(true).addFieldWidth('22%').toObject()
                      ]
                    },
                    {
                      name: GrnItemEnum.hs_code,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.uom,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.po_qty,
                      type: 'input',
                      id: 'quantity',
                      // onValueChange: this.onQuantityChange.bind(this)
                    },
                    {
                      name: GrnItemEnum.received_qty,
                      type: 'input',
                      id: 'quantity',
                      // onValueChange: this.onReceivedQuantity.bind(this)
                    },
                    {
                      name: GrnItemEnum.unit_price,
                      type: 'input',
                      id: 'quantity',
                      // onValueChange: this.onUnitPriceChange.bind(this)
                    },
                    {
                      name: GrnItemEnum.discount,
                      type: 'input',
                      onValueChange: this.onDiscountChange.bind(this)
                    },
                    {
                      name: GrnItemEnum.discount_amount,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.tax,
                      type: 'input',
                      onValueChange: this.calculateTaxAmount.bind(this)
                    },
                    {
                      name: GrnItemEnum.tax_amount,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.sub_total,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.total_amount,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.reject_qty,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.accepted_qty,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.balance_qty,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.trc_number,
                      type: 'input',
                    },
                    {
                      name: GrnItemEnum.remarks,
                      type: 'input',
                    }
                  ])
                .getDatasource<Array<GrnItem>>('id', list)
                .enableFooter(true)
                // .addDialog()
                .setTableCaption(true)
                // .setTableCaptionLabel("Testing")
                .setTableCaptionDialogButton(true)
                .setTableCaptionDialogButtonLabel("Add Asset")
                .setExportTableData(true)
                .setField(
                  new OverlayPanelBuilder()
                  .setTableName("grn_items")
                  .setOverlayPanelColumnSchema([{name:"Asset Name"}, {name:"Asset Code"}])
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
                // .footerInitialise(this.updateQuantity())
                // .onChange(this.onSelectSameBillingAddress.bind(this))
                .build(),
                new InputField(this.translate,PurchaseOrderEnum.sub_total,isEditMode,data,initialData).addFieldWidth('22%').toObject(),
                new InputField(this.translate,PurchaseOrderEnum.discount,isEditMode,data,initialData).addFieldWidth('22%').toObject(),
                new InputField(this.translate,PurchaseOrderEnum.tax_amount,isEditMode,data,initialData).addFieldWidth('22%').toObject(),
                new InputField(this.translate,PurchaseOrderEnum.total_amount,isEditMode,data,initialData).addFieldWidth('22%').toObject(),
            ],
          }
        ])
      ];
    };

  onGrnDateChange(prevState, nextState, formValue: InventoryGrnModel) {
    formValue.grn_date = moment(formValue?.grn_date).format("YYYY-MM-DD")
    return formValue
  }

  onVendorBillDateChange(prevState, nextState, formValue: InventoryGrnModel) {
    formValue.vendor_bill_date = moment(formValue?.vendor_bill_date).format("YYYY-MM-DD")
    return formValue
  }

  getAssets(){
    this.apiService.get(ServiceUrlConstants.ASSET)
    .subscribe((res:any)=>{
      this.assets.set(res?.results)

    })
  }

  updateTableRows(rows){

    return rows.map((row)=>{
      let grnItem: GrnItem = new GrnItem();
      grnItem.asset = row.id;
      grnItem.asset_code = row.asset_code;
      grnItem.asset_description = row.asset_description;
      grnItem.asset_serial_number = row.asset_serial_number;
      grnItem.hs_code = row.asset_hs_code;
      return grnItem
    })
  }

  onDiscountChange(a,b){
    const received_qty = +(b.received_qty);
    const unit_price = +(b.unit_price);
    const discount_percentage = +(b.discount);
    const discountAmount = this.calculateDiscountAmount(received_qty, unit_price, discount_percentage)

    b[GrnItemEnum.discount_amount] = discountAmount;
    b[GrnItemEnum.sub_total] = (received_qty * unit_price) - discountAmount;;
    return b;
  }

  onTaxChange(a,b){
    const received_qty = +(b.received_qty);
    const unit_price = +(b.unit_price);
    const tax_percentage = +(b.tax);
    const taxAmount = this.calculateDiscountAmount(received_qty, unit_price, tax_percentage)

    b[GrnItemEnum.tax_amount] = taxAmount;
    return b;
  }

  calculateDiscountAmount(receivedQuantity: number, unitPrice: number, discountPercentage: number): number {
      const discountAmount = (unitPrice * receivedQuantity * discountPercentage) / 100;
      return discountAmount;
  }

  calculateTaxAmount(a, b): number {
    const sub_total = +(b.sub_total);
    const tax_percentage = +(b.tax);
    b[GrnItemEnum.tax_amount] = (sub_total * tax_percentage) / 100;
    b[GrnItemEnum.total_amount] = b[GrnItemEnum.sub_total] +  b[GrnItemEnum.tax_amount];
    return b
  }

  onSourceDropdownChange(prevValue, selectedValue, formData){
    if (selectedValue === "purchase_order") {
      
    }

    return null
  }

  onSaveBarCodeEntry(event, form, index){
    let values = event?.get(index);
    if (values?.length) {
      let grnItemBarcodes = values.map((item)=>item['code']).join(",");
      if (form?.grn_items?.length) { 
        form.grn_items[index]['asset_serial_number'] = grnItemBarcodes;
      }
    }
    else{
      form.grn_items[index]['asset_serial_number'] = values;
    }
    return form;
  }
}
