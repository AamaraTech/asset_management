import { signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  GrnItemEnum,
  InventoryGrnEnum,
} from '../shared/common/enum/inventory-grn.enum';
import {
  OverlayPanelBuilder,
  TableBuilder,
} from '../shared/common/forms/core/builders/table.builder';
import {
  GrnItem,
  InventoryGrnModel,
} from '../shared/common/model/inventory-grn.model';
import { ServiceUrlConstants } from '../shared/utils/service-url-constants';
import { FormFieldUtil } from './form-field-utils';

export class InventoryGrnUtil extends FormFieldUtil {
  form: UntypedFormGroup;

  poDropDownData = signal<any>(null);
  vendorDropDownData = signal<any>(null);

  sourceDropdownOptions = signal<any>([
    {
      key: 'direct',
      value: 'Direct',
    },
    {
      key: 'purchase_order',
      value: 'Purchase Order',
    },
  ]);
  isPoDropDownVisible = signal<boolean>(false);

  constructor(public override translate: any) {
    super(translate);
  }

  createForm(form: UntypedFormGroup){
    form = this.newGrnForm();
    return form;
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  getTableData(dataSource = []) {
    return (
      new TableBuilder(this.translate, InventoryGrnEnum.grn_items)
        .columnSchema(this.getTableColumnSchema())
        .formInitialise<GrnItem>(new GrnItem())
        .formSchema(this.getTableFormSchema())
        .getDatasource<Array<GrnItem>>('id', dataSource)
        .enableFooter(true)
        // .addDialog()
        .setTableCaption(true)
        // .setTableCaptionLabel("Testing")
        .setTableCaptionDialogButton(true)
        .setTableCaptionDialogButtonLabel('Add Asset')
        .setExportTableData(true)
        .setField(this.getTableOverlayFiled())
        // .footerInitialise(this.updateQuantity())
        // .onChange(this.onSelectSameBillingAddress.bind(this))
        .build()
    );
  }

  private getTableOverlayFiled(): OverlayPanelBuilder {
    return (
      new OverlayPanelBuilder()
        .setTableName('grn_items')
        .setOverlayPanelColumnSchema([
          { name: 'Asset Name' },
          { name: 'Asset Code' },
        ])
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
    );
  }

  private getTableColumnSchema(): any {
    return [
      GrnItemEnum.asset + '_TC',
      'asset_code_TC',
      'asset_description_TC',
      'asset_serial_number_TC',
      GrnItemEnum.hs_code + '_TC',
      GrnItemEnum.uom + '_TC',
      GrnItemEnum.po_qty + '_TC',
      GrnItemEnum.received_qty + '_TC',
      GrnItemEnum.unit_price + '_TC',
      GrnItemEnum.discount + '_TC',
      GrnItemEnum.discount_amount + '_TC',
      GrnItemEnum.tax + '_TC',
      GrnItemEnum.tax_amount + '_TC',
      GrnItemEnum.sub_total + '_TC',
      GrnItemEnum.total_amount + '_TC',
      GrnItemEnum.reject_qty + '_TC',
      GrnItemEnum.accepted_qty + '_TC',
      GrnItemEnum.balance_qty + '_TC',
      GrnItemEnum.trc_number + '_TC',
      GrnItemEnum.remarks + '_TC',
    ];
  }

  private getTableFormSchema(): any {
    let dropDown = {
      name: 'asset_serial_number',
      type: 'dropdown',
      dialogue: true,
      label: 'test',
      dialogueLabel: 'Enter Serial Number',
      emptyCustomDialogTemplate: true,
      emptyComment: '',
      placeholder: this.translate.instant('enter_Serial_Number_TC', {
        label: this.translate.instant('enter_Serial_Number_TC'),
      }),
      options: [{ productName: 'Vishnu', id: 'vishnu' }],
      optionLabel: 'productName',
      optionValue: 'id',
      dialogueWidth: '80vw',
      dialogueHeight: '80vh',
      saveDialogueData: this.onSaveBarCodeEntry.bind(this),
      dialogueFields: [
        //     new InputField(this.translate, "barcodeValue", false, null, null)
        // .validate(true).addFieldWidth('22%').toObject()
      ],
    };
    return [
      this.createTableInputField('asset', 'input'),
      this.createTableInputField('asset_code', 'input'),
      this.createTableInputField('asset_description', 'input'),
      this.createDropdownField(dropDown),
      this.createTableInputField(GrnItemEnum.hs_code, 'input'),
      this.createTableInputField(GrnItemEnum.uom, 'input'),
      this.createTableInputField(GrnItemEnum.po_qty, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.received_qty, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.unit_price, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.discount, 'input', 'quantity', this.onDiscountChange.bind(this)),
      this.createTableInputField(
        GrnItemEnum.discount_amount,
        'input',
        'quantity'
      ),
      this.createTableInputField(GrnItemEnum.tax, 'input', 'quantity', this.calculateTaxAmount.bind(this)),
      this.createTableInputField(GrnItemEnum.tax_amount, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.sub_total, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.total_amount, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.reject_qty, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.accepted_qty, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.balance_qty, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.trc_number, 'input', 'quantity'),
      this.createTableInputField(GrnItemEnum.remarks, 'input', 'quantity'),
    ];
  }

  updateTableRows(rows) {
    return rows.map((row) => {
      let grnItem: GrnItem = new GrnItem();
      grnItem.asset = row.id;
      grnItem.asset_code = row.asset_code;
      grnItem.asset_description = row.asset_description;
      grnItem.asset_serial_number = row.asset_serial_number;
      grnItem.hs_code = row.asset_hs_code;
      return grnItem;
    });
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

  private poDropdownHandler(initialState, nextState, form) {
    const vendorControl = this.form.get(InventoryGrnEnum.vendor);
    vendorControl.disable();
    // let purchaseOrder = <PurchaseOrderModel>(
    //   this.poDropDownData()?.find((res) => res.id === b)
    // );
    // vendorControl.setValue(purchaseOrder.vendor);
  }

  getDefaultData(res: InventoryGrnModel, form: UntypedFormGroup) {
    form.get(InventoryGrnEnum.grn_no).setValue(res.grn_no);
    form.get(InventoryGrnEnum.grn_date).setValue(res.grn_date);
    form.get(InventoryGrnEnum.source).setValue(res.source);

    // if (form.get(InventoryGrnEnum.source).value === "purchase_order") {
    //   form.get(InventoryGrnEnum.purchase_order).setValue(res.purchase_order)
    // }

    form.get(InventoryGrnEnum.vendor_bill).setValue(res.vendor_bill);
    form
      .get(InventoryGrnEnum.vendor_bill_date)
      .setValue(res.vendor_bill_date);
    form.get(InventoryGrnEnum.vendor_address).setValue(res.vendor_address);

    form.get(InventoryGrnEnum.vendor).setValue(res.vendor);
    form.get(InventoryGrnEnum.other_ref_no).setValue(res.other_ref_no);
    form.get(InventoryGrnEnum.note).setValue(res.note);

    form.get(InventoryGrnEnum.batch_no).setValue(res.batch_no);
    form.get(InventoryGrnEnum.arrive_date).setValue(res.arrive_date);
    form.get(InventoryGrnEnum.exit_date).setValue(res.exit_date);
    form.get(InventoryGrnEnum.vehicle_no).setValue(res.vehicle_no);
    form.get(InventoryGrnEnum.remarks).setValue(res.remarks);
    form.get(InventoryGrnEnum.grn_items).setValue(res.grn_items);
  }

  sourceDropdownChangeHandler(initialState, nextState, formData) {
  }

  vendorDropdownHandler(initialState, nextState, form) {}

  getFormFields() {
    return {
      [InventoryGrnEnum.grn_no]: this.getInputField(
        InventoryGrnEnum.grn_no,
        new InventoryGrnModel()
      ),
      [InventoryGrnEnum.source]: this.getDropDownField(
        InventoryGrnEnum.source,
        new InventoryGrnModel(),
        this.sourceDropdownChangeHandler.bind(this),
        this.sourceDropdownOptions
      ),
      [InventoryGrnEnum.purchase_order]: this.getDropDownField(
        InventoryGrnEnum.purchase_order,
        new InventoryGrnModel(),
        this.poDropdownHandler.bind(this),
        this.poDropDownData
      ),
      [InventoryGrnEnum.grn_date]: this.getDateField(
        InventoryGrnEnum.grn_date,
        new InventoryGrnModel()
      ),

      [InventoryGrnEnum.vendor]: this.getDropDownField(
        InventoryGrnEnum.vendor,
        new InventoryGrnModel(),
        this.vendorDropdownHandler.bind(this),
        this.vendorDropDownData
      ),
      [InventoryGrnEnum.vendor_bill]: this.getInputField(
        InventoryGrnEnum.vendor_bill,
        new InventoryGrnModel()
      ),
      [InventoryGrnEnum.vendor_bill_date]: this.getDateField(
        InventoryGrnEnum.vendor_bill_date,
        new InventoryGrnModel()
      ),
      [InventoryGrnEnum.vendor_address]: this.getInputField(
        InventoryGrnEnum.vendor_address,
        new InventoryGrnModel()
      ),

      [InventoryGrnEnum.other_ref_no]: this.getInputField(
        InventoryGrnEnum.other_ref_no,
        new InventoryGrnModel()
      ),
      [InventoryGrnEnum.batch_no]: this.getInputField(
        InventoryGrnEnum.batch_no,
        new InventoryGrnModel()
      ),
      [InventoryGrnEnum.note]: this.getInputField(
        InventoryGrnEnum.note,
        new InventoryGrnModel()
      ),

      [InventoryGrnEnum.vehicle_no]: this.getInputField(
        InventoryGrnEnum.vehicle_no,
        new InventoryGrnModel()
      ),
      [InventoryGrnEnum.arrive_date]: this.getInputField(
        InventoryGrnEnum.arrive_date,
        new InventoryGrnModel()
      ),
      [InventoryGrnEnum.exit_date]: this.getInputField(
        InventoryGrnEnum.exit_date,
        new InventoryGrnModel()
      ),
      [InventoryGrnEnum.remarks]: this.getInputField(
        InventoryGrnEnum.remarks,
        new InventoryGrnModel()
      ),
    };
  }

  newGrnForm(){
    return new FormGroup({
      [InventoryGrnEnum.grn_no]: new FormControl(),
      [InventoryGrnEnum.grn_date]: new FormControl(null, {
        validators: [Validators.required],
      }),
      [InventoryGrnEnum.source]: new FormControl(null, {
        validators: [Validators.required],
      }),
      // [InventoryGrnEnum.purchase_order]: new FormControl(),
      [InventoryGrnEnum.vendor_bill]: new FormControl(),
      [InventoryGrnEnum.vendor_bill_date]: new FormControl(),
      // [InventoryGrnEnum.vendor_name]: new FormControl(),
      [InventoryGrnEnum.vendor_address]: new FormControl(),
      [InventoryGrnEnum.vendor]: new FormControl(null, {
        validators: [Validators.required],
      }),
      [InventoryGrnEnum.other_ref_no]: new FormControl(),
      [InventoryGrnEnum.note]: new FormControl(),
      [InventoryGrnEnum.batch_no]: new FormControl(),
      [InventoryGrnEnum.arrive_date]: new FormControl(),
      [InventoryGrnEnum.exit_date]: new FormControl(),
      [InventoryGrnEnum.vehicle_no]: new FormControl(),
      [InventoryGrnEnum.remarks]: new FormControl(),
      [InventoryGrnEnum.grn_items]: new FormControl(),
    });
  }
}
