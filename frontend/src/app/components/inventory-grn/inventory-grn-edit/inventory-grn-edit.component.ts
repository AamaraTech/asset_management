import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { InventoryService } from 'src/app/core/services/inventory-grn.service';
import { InventoryGrnEnum } from 'src/app/core/shared/common/enum/inventory-grn.enum';
import { IInventoryGrnEdit, InventoryGrnModel } from 'src/app/core/shared/common/model/inventory-grn.model';
import { FormFieldUtil } from 'src/app/core/utils/form-field-utils';
import { DynamicFormGeneratorModule } from 'src/app/sanadi-library/dynamic-form-generator/dynamic-form-generator.module';

@Component({
  selector: 'sanadi-inventory-grn-edit',
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
  providers: [InventoryService],
  templateUrl: './inventory-grn-edit.component.html',
  styleUrl: './inventory-grn-edit.component.scss',
})
export class InventoryGrnEditComponent extends FormFieldUtil {
  form: UntypedFormGroup = new FormGroup({
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
  tableField: any;

  formFields = signal<any>(null);
  tabIndex = signal<any>(null);

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

  readonly inventoryService = inject(InventoryService);

  constructor(override translate: TranslateService) {
    super(translate);
  }

  ngOnInit(): void {
    this.loadGrnFormData();
  }

  loadGrnFormData(): void {
    // this.inventoryService.createForm(this.form);
    this.formFields.set(this.getFormFields());
    this.inventoryService.getGrnData(this.form)
    .subscribe((res)=>{
      this.tableField = this.inventoryService.getTableFeilds();
    })
  }

  saveForm() {
    this.inventoryService.updateGrnForm(this.form.value);
  }

  cancel() {
    this.inventoryService.cancel();
  }

  sourceDropdownChangeHandler(initialState, nextState, form) {
    if (nextState === 'purchase_order') {
      this.form.addControl(InventoryGrnEnum.purchase_order, new FormControl());
      this.isPoDropDownVisible.set(true);
    } else {
      const vendorControl = this.form.get(InventoryGrnEnum.vendor);
      vendorControl.enable();
      this.isPoDropDownVisible.set(false);
      this.form.removeControl(InventoryGrnEnum.purchase_order);
    }
  }

  vendorDropdownHandler(initialState, nextState, form) {}

  private poDropdownHandler(initialState, nextState, form) {
    const vendorControl = this.form.get(InventoryGrnEnum.vendor);
    vendorControl.disable();
    let purchaseOrder = this.inventoryService.poDropDownData()?.find((res) => {
      return res.key === nextState;
    });
    vendorControl.setValue(purchaseOrder.key);
  }

  onGrnDateChange(initialState, nextState, formData){
    formData.grn_date = moment(formData?.grn_date).format("YYYY-MM-DD")
    return formData
  }

  onVendorBillDateChange(initialState, nextState, formData){
    formData.vendor_bill_date = moment(formData?.vendor_bill_date).format("YYYY-MM-DD")
    return formData
  }

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
        this.inventoryService.poDropDownData
      ),
      [InventoryGrnEnum.grn_date]: this.getDateField(
        InventoryGrnEnum.grn_date,
        new InventoryGrnModel(),
        this.onGrnDateChange.bind(this)
      ),

      [InventoryGrnEnum.vendor]: this.getDropDownField(
        InventoryGrnEnum.vendor,
        new InventoryGrnModel(),
        this.vendorDropdownHandler.bind(this),
        this.inventoryService.vendorDropDownData
      ),
      [InventoryGrnEnum.vendor_bill]: this.getInputField(
        InventoryGrnEnum.vendor_bill,
        new InventoryGrnModel()
      ),
      [InventoryGrnEnum.vendor_bill_date]: this.getDateField(
        InventoryGrnEnum.vendor_bill_date,
        new InventoryGrnModel(),
        this.onVendorBillDateChange.bind(this)
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
      [InventoryGrnEnum.arrive_date]: this.getDateField(
        InventoryGrnEnum.arrive_date,
        new InventoryGrnModel(),
        this.onVendorBillDateChange.bind(this)
      ),
      [InventoryGrnEnum.exit_date]: this.getDateField(
        InventoryGrnEnum.exit_date,
        new InventoryGrnModel(),
        this.onVendorBillDateChange.bind(this)
      ),
      [InventoryGrnEnum.remarks]: this.getInputField(
        InventoryGrnEnum.remarks,
        new InventoryGrnModel()
      ),
    };
  }
}
