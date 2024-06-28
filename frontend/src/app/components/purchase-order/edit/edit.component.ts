import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { switchMap } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { InventoryGrnEnum } from 'src/app/core/shared/common/enum/inventory-grn.enum';
import {
  PurchaseOrderEnum,
  PurchaseOrderItemEnum,
} from 'src/app/core/shared/common/enum/purchase-order.enum';
import { FormConfig } from 'src/app/core/shared/common/form-config.service';
import { DateField } from 'src/app/core/shared/common/forms/core/builders/date.builder';
import { DropdownField } from 'src/app/core/shared/common/forms/core/builders/dropdown.builder';
import { InputField } from 'src/app/core/shared/common/forms/core/builders/input.builder';
import {
  OverlayPanelBuilder,
  TableBuilder,
} from 'src/app/core/shared/common/forms/core/builders/table.builder';
import { TextBuilder } from 'src/app/core/shared/common/forms/core/builders/textarea.builder';
import { GrnItem } from 'src/app/core/shared/common/model/inventory-grn.model';
import {
  PurchaseOrderItem,
  PurchaseOrderModel,
} from 'src/app/core/shared/common/model/purchase-order.model';
import { ServiceUrlConstants } from 'src/app/core/shared/utils/service-url-constants';
import { FormFieldUtil } from 'src/app/core/utils/form-field-utils';
import { DynamicFormGeneratorModule } from 'src/app/sanadi-library/dynamic-form-generator/dynamic-form-generator.module';

@Component({
  selector: 'sanadi-edit',
  standalone: true,
  imports: [
    DynamicFormGeneratorModule,
    ButtonModule,
    TableModule,
    TabViewModule,
    AccordionModule,
    DatePipe,
    CurrencyPipe,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent {
  showAppSettingsModifier: boolean = false;

  form: UntypedFormGroup = new FormGroup({
    [PurchaseOrderEnum.source]: new FormControl(''),
    [PurchaseOrderEnum.po_no]: new FormControl('', {
      validators: [Validators.required],
    }),
    [PurchaseOrderEnum.po_date]: new FormControl('', {
      validators: [Validators.required],
    }),
    [PurchaseOrderEnum.vendor]: new FormControl(''),
    [PurchaseOrderEnum.poc_name]: new FormControl(''),
    [PurchaseOrderEnum.poc_phone]: new FormControl(''),
    [PurchaseOrderEnum.poc_email]: new FormControl('', {
      validators: [Validators.required],
    }),
    [PurchaseOrderEnum.bill_to_address1]: new FormControl(''),
    [PurchaseOrderEnum.bill_to_address2]: new FormControl(''),
    [PurchaseOrderEnum.bill_to_name]: new FormControl(''),
    [PurchaseOrderEnum.bill_to_tax_no]: new FormControl(''),
    [PurchaseOrderEnum.bill_to_country]: new FormControl(''),
    [PurchaseOrderEnum.bill_to_city]: new FormControl(''),
    [PurchaseOrderEnum.bill_to_zip_code]: new FormControl(''),
    [PurchaseOrderEnum.bill_to_state]: new FormControl(''),

    [PurchaseOrderEnum.ship_to_address1]: new FormControl(''),
    [PurchaseOrderEnum.ship_to_address2]: new FormControl(''),
    [PurchaseOrderEnum.ship_to_name]: new FormControl(''),
    [PurchaseOrderEnum.ship_to_tax_no]: new FormControl(''),
    [PurchaseOrderEnum.ship_to_country]: new FormControl(''),
    [PurchaseOrderEnum.ship_to_city]: new FormControl(''),
    [PurchaseOrderEnum.ship_to_zipcode]: new FormControl(''),
    [PurchaseOrderEnum.ship_to_state]: new FormControl(''),

    [PurchaseOrderEnum.vendor_quotation_no]: new FormControl(''),
    [PurchaseOrderEnum.quotation_date]: new FormControl(''),
    [PurchaseOrderEnum.delivery_terms]: new FormControl(''),
    [PurchaseOrderEnum.delivery_preference]: new FormControl(''),
    [PurchaseOrderEnum.payment_terms]: new FormControl(''),

    [PurchaseOrderEnum.purchase_order_items]: new FormControl([]),
    [PurchaseOrderEnum.terms_conditions]: new FormControl(),
    [PurchaseOrderEnum.note]: new FormControl(),
    [PurchaseOrderEnum.payment_type]: new FormControl(),

    [PurchaseOrderEnum.discount]: new FormControl(),
    [PurchaseOrderEnum.tax_amount]: new FormControl(),
    [PurchaseOrderEnum.sub_total]: new FormControl(),
    [PurchaseOrderEnum.total_amount]: new FormControl(),
  });
  
  params= signal<any>({});
  textAreaNote: TextBuilder;
  tableField: any;

  formFields = signal<any>({});
  formRequest = signal<any>(null);
  routerState = signal<any>(null);
  tabIndex = signal<any>(null);

  poDropDownData = signal<any>([]);

  vendorDropDownData = signal<any>([]);

  isPoDropDownVisible = signal<boolean>(false);

  updateQuantity = signal([
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
    { name: '' },
  ]);

  private translate = inject(TranslateService);
  private formConfig2 = inject(FormConfig);
  private readonly apiService = inject(ApiService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  ngOnInit(): void {

    // this.getFormFields();
    this.textAreaNote = this.getTextAreaField(PurchaseOrderEnum.note)
    this.getVendorDropdownData()
    this.activatedRoute.params
    .pipe(
      switchMap((res: any) => {
        this.params.set(res);
        return this.apiService.get(
          `${ServiceUrlConstants.PURCHASE_ORDER}${res?.id}/`
        );
      })
    )
    .subscribe((res: PurchaseOrderModel) => {
      if (res) {
        this.form.get(PurchaseOrderEnum.source).setValue(res.source)
        this.form.get(PurchaseOrderEnum.po_no).setValue(res.po_no)
        this.form.get(PurchaseOrderEnum.po_date).setValue(res.po_date)
        this.form.get(PurchaseOrderEnum.vendor).setValue(res.vendor)
        this.form.get(PurchaseOrderEnum.poc_name).setValue(res.poc_name)
        this.form.get(PurchaseOrderEnum.poc_phone).setValue(res.poc_phone)
        this.form.get(PurchaseOrderEnum.poc_email).setValue(res.poc_email)
        this.form.get(PurchaseOrderEnum.bill_to_address1).setValue(res.bill_to_address1)
        this.form.get(PurchaseOrderEnum.bill_to_address2).setValue(res.bill_to_address2)
        this.form.get(PurchaseOrderEnum.bill_to_name).setValue(res.bill_to_name)
        this.form.get(PurchaseOrderEnum.bill_to_tax_no).setValue(res.bill_to_tax_no)
        this.form.get(PurchaseOrderEnum.bill_to_country).setValue(res.bill_to_country)
        this.form.get(PurchaseOrderEnum.bill_to_city).setValue(res.bill_to_city)
        this.form.get(PurchaseOrderEnum.bill_to_zip_code).setValue(res.bill_to_zip_code)
        this.form.get(PurchaseOrderEnum.bill_to_state).setValue(res.bill_to_state)

        this.form.get(PurchaseOrderEnum.ship_to_address1).setValue(res.ship_to_address1)
        this.form.get(PurchaseOrderEnum.ship_to_address2).setValue(res.ship_to_address2)
        this.form.get(PurchaseOrderEnum.ship_to_name).setValue(res.ship_to_name)
        this.form.get(PurchaseOrderEnum.ship_to_tax_no).setValue(res.ship_to_tax_no)
        this.form.get(PurchaseOrderEnum.ship_to_country).setValue(res.ship_to_country)
        this.form.get(PurchaseOrderEnum.ship_to_city).setValue(res.ship_to_city)
        this.form.get(PurchaseOrderEnum.ship_to_zipcode).setValue(res.ship_to_zipcode)
        this.form.get(PurchaseOrderEnum.ship_to_state).setValue(res.ship_to_state)

        this.form.get(PurchaseOrderEnum.vendor_quotation_no).setValue(res.vendor_quotation_no)
        this.form.get(PurchaseOrderEnum.quotation_date).setValue(res.quotation_date)
        this.form.get(PurchaseOrderEnum.delivery_terms).setValue(res.delivery_terms)
        this.form.get(PurchaseOrderEnum.delivery_preference).setValue(res.delivery_preference)
        this.form.get(PurchaseOrderEnum.payment_terms).setValue(res.payment_terms)

        this.form.get(PurchaseOrderEnum.purchase_order_items).setValue(res.purchase_order_items)
        this.form.get(PurchaseOrderEnum.terms_conditions).setValue(res.terms_conditions)
        this.form.get(PurchaseOrderEnum.note).setValue(res.note)
        this.form.get(PurchaseOrderEnum.payment_type).setValue(res.payment_type)

        this.form.get(PurchaseOrderEnum.discount).setValue(res.discount)
        this.form.get(PurchaseOrderEnum.tax_amount).setValue(res.tax_amount)
        this.form.get(PurchaseOrderEnum.sub_total).setValue(res.sub_total)
        this.form.get(PurchaseOrderEnum.total_amount).setValue(res.total_amount)
        this.tableField = this.getTableData(res.purchase_order_items);
      }
    });

  }

  saveForm() {
    let data = this.form.value;
    data = {
      ...data,
      id: +(this.params()?.id)
    }
    this.apiService
      .put(`${ServiceUrlConstants.PURCHASE_ORDER}${this.params()?.id}/`, data)
      .subscribe((res) => {
        this.router.navigate([`/purchase-order`]);
      });
  }

  onTabChange(res: any) {
    this.tabIndex.update((tab) => {
      tab = {
        ...tab,
        ...res,
      };
      return tab;
    });
  }

  nextTab() {
    dispatchEvent(new CustomEvent('nextTabChange'));
  }

  previousTab() {
    dispatchEvent(new CustomEvent('prevTabChange'));
  }

  cancel() {
    this.router.navigate([`/${this.routerState()?.config?.parentRoute}`]);
  }

  formatCurrency(value: number) {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  getTableData(dataSource) {
    return (
      new TableBuilder(this.translate, PurchaseOrderEnum.purchase_order_items)
        .columnSchema([
          PurchaseOrderItemEnum.asset_code + '_TC',
          PurchaseOrderItemEnum.asset_name + '_TC',
          PurchaseOrderItemEnum.asset_description + '_TC',
          PurchaseOrderItemEnum.asset_mfr + '_TC',
          PurchaseOrderItemEnum.delivery_date + '_TC',
          PurchaseOrderItemEnum.qty + '_TC',
          PurchaseOrderItemEnum.uom + '_TC',
          PurchaseOrderItemEnum.unit_price + '_TC',
          PurchaseOrderItemEnum.discount + '_TC',
          PurchaseOrderItemEnum.discount_amount + '_TC',
          PurchaseOrderItemEnum.tax + '_TC',
          PurchaseOrderItemEnum.tax_amount + '_TC',
          PurchaseOrderItemEnum.total_amount + '_TC',
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
            updateTableFooter: this.updateTableFooterValues.bind(this),
          },
          {
            name: PurchaseOrderItemEnum.uom,
            type: 'input',
          },
          {
            name: PurchaseOrderItemEnum.unit_price,
            type: 'number',
            onValueChange: this.onChangeCalculationFields.bind(this),
            updateTableFooter: this.updateTableFooterValues.bind(this),
          },
          {
            name: PurchaseOrderItemEnum.discount,
            type: 'number',
            onValueChange: this.onChangeCalculationFields.bind(this),
            updateTableFooter: this.updateTableFooterValues.bind(this),
            suffix: '%',
          },
          {
            name: PurchaseOrderItemEnum.discount_amount,
            type: 'number',
            onValueChange: this.onChangeCalculationFields.bind(this),
            updateTableFooter: this.updateTableFooterValues.bind(this),
          },
          {
            name: PurchaseOrderItemEnum.tax,
            type: 'number',
            onValueChange: this.onChangeCalculationFields.bind(this),
            updateTableFooter: this.updateTableFooterValues.bind(this),
            suffix: '%',
          },
          {
            name: PurchaseOrderItemEnum.tax_amount,
            type: 'number',
            onValueChange: this.onChangeCalculationFields.bind(this),
            updateTableFooter: this.updateTableFooterValues.bind(this),
          },
          {
            name: PurchaseOrderItemEnum.total_amount,
            type: 'number',
          },
        ])
        .getDatasource<Array<PurchaseOrderItem>>('id', dataSource)
        .enableFooter(true)
        .setTableCaption(true)
        // .setTableCaptionLabel("Testing")
        .setTableCaptionDialogButton(true)
        .setTableCaptionDialogButtonLabel('Add Asset')
        .setExportTableData(true)
        .setField(
          new OverlayPanelBuilder()
            .setTableName('purchase_order_items')
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
        )
        .footerInitialise(this.updateQuantity())
        // .onChange(this.onSelectSameBillingAddress.bind(this))
        .build()
    );
  }

  saveDynamicDropdownOption(attribute: any, event: any, form: any) {
    form[attribute] = event[attribute];
    return {
      form: form,
      data: {
        enum_key: attribute,
        enum_value: event[attribute],
      },
    };
  }

  updateDynamicDropdownOptions(response) {
    if (response?.results?.length) {
      const options = (<any>response)?.results[0]?.enum_value;
      return options;
    }
  }

  onChangeCalculationFields(
    value,
    item: PurchaseOrderItem,
    formValue: PurchaseOrderModel
  ) {
    const received_qty = +(item?.qty ?? 0);
    const unit_price = +(item?.unit_price ?? 0);
    const discount_percentage = +(item?.discount ?? 0);
    const tax_percentage = +(item?.tax ?? 0);
    const discountAmount = this.calculateDiscountAmount(
      received_qty,
      unit_price,
      discount_percentage
    );
    const taxAmount = this.calculateTaxAmount(
      received_qty,
      unit_price,
      tax_percentage
    );
    const totalAmount = this.calculateTotalAmount(
      received_qty,
      unit_price,
      discountAmount,
      taxAmount
    );
    if (item) {
      item[PurchaseOrderItemEnum.discount_amount] = discountAmount;
      item[PurchaseOrderItemEnum.tax_amount] = taxAmount;
      item[PurchaseOrderItemEnum.total_amount] = totalAmount;
    }
    return item;
  }

  calculateDiscountAmount(
    receivedQuantity: number,
    unitPrice: number,
    discountPercentage: number
  ): number {
    const discountAmount =
      (unitPrice * receivedQuantity * discountPercentage) / 100;
    return discountAmount;
  }

  calculateTaxAmount(
    receivedQuantity: number,
    unitPrice: number,
    taxPercentage: number
  ): number {
    const taxAmount = (unitPrice * receivedQuantity * taxPercentage) / 100;
    return taxAmount;
  }

  calculateTotalAmount(
    receivedQuantity: number,
    unitPrice: number,
    discountAmount: number,
    taxAmount: number
  ) {
    const totalAmount =
      unitPrice * receivedQuantity - discountAmount + taxAmount;
    return totalAmount;
  }

  updateTableFooterValues(data: PurchaseOrderModel) {
    let totalQty: number = 0;
    let totalTaxAmount: number = 0;
    let totalAmount: number = 0;
    let totalDiscountAmount: number = 0;
    const _ = require('lodash');
    _.forEach(data.purchase_order_items, function (element, key) {
      totalQty += Number(element?.qty ?? 0);
      totalTaxAmount += Number(element?.tax_amount ?? 0);
      totalAmount += Number(element?.total_amount ?? 0);
      totalDiscountAmount += Number(element?.discount_amount ?? 0);
    });
    const subTotal = totalAmount + totalDiscountAmount - totalTaxAmount;
    const purchaseOrderFooterInitialize: any = [];
    const purchaseOrderItemTableForm = Object.keys(PurchaseOrderItemEnum);
    purchaseOrderItemTableForm.forEach((ele, index) => {
      if (index === 0) {
        purchaseOrderFooterInitialize.push({ name: ' ' }); // Due to checkbox
        purchaseOrderFooterInitialize.push({ name: 'Total' });
      } else {
        switch (ele) {
          case PurchaseOrderItemEnum.qty:
            purchaseOrderFooterInitialize.push({ name: totalQty.toFixed(2) });
            break;
          case PurchaseOrderItemEnum.tax_amount:
            purchaseOrderFooterInitialize.push({
              name: totalTaxAmount.toFixed(2),
            });
            break;
          case PurchaseOrderItemEnum.total_amount:
            purchaseOrderFooterInitialize.push({
              name: totalAmount.toFixed(2),
            });
            break;
          default:
            purchaseOrderFooterInitialize.push({ name: '' });
        }
      }
    });
    data.sub_total = subTotal;
    data.tax_amount = totalTaxAmount;
    data.discount = totalDiscountAmount;
    data.total_amount = totalAmount;
    purchaseOrderFooterInitialize.push({ name: '' }); // for action buttons to cover
    this.updateQuantity.set(purchaseOrderFooterInitialize);
    return { form: data, footerInitialize: purchaseOrderFooterInitialize };
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

  getSourceInput() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.source,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .isReadOnly(true)
      .toObject();
  }

  getPoNoInput() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.po_no,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .isReadOnly(true)
      .toObject();
  }

  getPoDate() {
    return (
      new DateField(
        this.translate,
        PurchaseOrderEnum.po_date,
        false,
        null,
        new PurchaseOrderModel()
      )
        .addFieldWidth('32%')
        .validate(true)
        .variantType('basic')
        // .onChange(this.onGrnDateChange.bind(this))
        .addFormat('yy-mm-dd')
        .toObject()
    );
  }

  getVendorBillDate() {
    return (
      new DateField(
        this.translate,
        InventoryGrnEnum.vendor_bill_date,
        false,
        null,
        new PurchaseOrderModel()
      )
        .addFieldWidth('32%')
        .validate(true)
        .variantType('basic')
        // .onChange(this.onGrnDateChange.bind(this))
        .addFormat('yy-mm-dd')
        .toObject()
    );
  }

  getSourceDropDown() {
    let options = signal([
      {
        key: 'direct',
        value: 'Direct',
      },
      {
        key: 'purchase_order',
        value: 'Purchase Order',
      },
    ]);
    return new DropdownField(
      this.translate,
      InventoryGrnEnum.source,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .validate(true)
      .addKeyValueLabel('value', 'key')
      .getOptions(options)
      .variantType('basic')
      .onChange((a, b, c) => {
        if (b === 'purchase_order') {
          this.form.addControl(
            InventoryGrnEnum.purchase_order,
            new FormControl()
          );
          this.isPoDropDownVisible.set(true);
        } else {
          const vendorControl = this.form.get(InventoryGrnEnum.vendor);
          vendorControl.enable();
          this.isPoDropDownVisible.set(false);
          this.form.removeControl(InventoryGrnEnum.purchase_order);
        }
      })
      .toObject();
  }

  getPODropDown() {
    return new DropdownField(
      this.translate,
      InventoryGrnEnum.purchase_order,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .addKeyValueLabel('po_no', 'id')
      .variantType('basic')
      .onChange((a, b, c) => {
        const vendorControl = this.form.get(InventoryGrnEnum.vendor);
        vendorControl.disable();
        let purchaseOrder = <PurchaseOrderModel>(
          this.poDropDownData()?.find((res) => res.id === b)
        );
        vendorControl.setValue(purchaseOrder.vendor);
      })
      .getOptions(this.poDropDownData)
      .toObject();
  }

  getVendorDropDown() {
    return new DropdownField(
      this.translate,
      PurchaseOrderEnum.vendor,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .addKeyValueLabel('vendor_name', 'id')
      .getOptions(this.vendorDropDownData)
      .variantType('basic')
      .toObject();
  }

  getPocName() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.poc_name,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getPocPhone() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.poc_phone,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getPocEmail() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.poc_email,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getVendorBill() {
    return new InputField(
      this.translate,
      InventoryGrnEnum.vendor_bill,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getOtherRef() {
    return new InputField(
      this.translate,
      InventoryGrnEnum.other_ref_no,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getVendorName() {
    return new InputField(
      this.translate,
      InventoryGrnEnum.vendor,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getVendorAddress() {
    return new InputField(
      this.translate,
      InventoryGrnEnum.vendor_address,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getBatchNo() {
    return new InputField(
      this.translate,
      InventoryGrnEnum.batch_no,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getVehicleNo() {
    return new InputField(
      this.translate,
      InventoryGrnEnum.vehicle_no,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getArriveDate() {
    return new InputField(
      this.translate,
      InventoryGrnEnum.arrive_date,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getExitDate() {
    return new InputField(
      this.translate,
      InventoryGrnEnum.exit_date,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getRemarks() {
    return new InputField(
      this.translate,
      InventoryGrnEnum.remarks,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getBillTOAddress1() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.bill_to_address1,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getBillTOAddress2() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.bill_to_address2,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getBillToName() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.bill_to_name,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getBilltoTax() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.bill_to_tax_no,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getBillToCountry() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.bill_to_country,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getBillToCity() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.bill_to_city,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getBillToZip() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.bill_to_zip_code,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getBillToState() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.bill_to_state,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getShipTOAddress1() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.ship_to_address1,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getShipTOAddress2() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.ship_to_address2,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getShipToName() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.ship_to_name,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getShiptoTax() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.ship_to_tax_no,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getShipToCountry() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.ship_to_country,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getShipToCity() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.ship_to_city,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getShipToZip() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.ship_to_zipcode,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getShipToState() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.ship_to_state,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getVendorQuotation() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.vendor_quotation_no,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getQuateDate() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.quotation_date,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getDeliveryTerms() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.delivery_terms,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getDeliveryPreference() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.delivery_preference,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }
  getPaymentTerms() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.payment_terms,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getPaymentType() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.payment_type,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getNote() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.note,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getTermsAndCondition() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.terms_conditions,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getDiscount() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.discount,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getTaxAmount() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.tax_amount,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getSubTotal() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.sub_total,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getTotalAmount() {
    return new InputField(
      this.translate,
      PurchaseOrderEnum.total_amount,
      false,
      null,
      new PurchaseOrderModel()
    )
      .addFieldWidth('32%')
      .variantType('basic')
      .validate(true)
      .toObject();
  }

  getTextAreaField(name?:string){
    return new TextBuilder(
      this.translate,
      name,
      false,
      null,
      new PurchaseOrderModel()
    )
  }

  // Vendor Dropdown Api

  getVendorDropdownData(){
    this.apiService.get(`${ServiceUrlConstants.VENDOR_MASTER}`)
    .subscribe((res:any)=>{
      if (res?.results) {
        this.vendorDropDownData.set(res?.results)
      }
    })
  }
}
