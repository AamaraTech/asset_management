import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Form, UntypedFormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import * as XLSX from 'xlsx';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
@Component({
  selector: 'table-field',
  templateUrl: './table-field.component.html',
  styleUrls: ['./table-field.component.scss'],
})
export class TableFieldComponent implements OnInit, OnDestroy {
  @Input() columnSchema: any = [];
  @Input() formSchema: any = [];
  @Input() formInitialise: any = [];
  @Input() formName: string = '';
  @Input() dataSource: any = [];
  @Input() form: UntypedFormGroup | any;
  @Input() dataKey: string = 'id';
  @Input() field: any = {};
  @Input() scrollHeight: any;
  @Input() hideButton: boolean = false;
  @Input() hideFrozenColumn: boolean = false;
  selectedArray: any = [];
  selectedMainArray: any = [];
  tableCaptionDialogFlag: boolean = false;
  tempArray: any = [];
  filtering: any;
  rowSelected: boolean = false;
  rowUnSelected: boolean = false;
  tempDataSource: any = [];
  display: boolean = false;
  openOverlayDialog: boolean = false;
  printItem: any;
  showPrintModifier: boolean = false;
  printFields: any = [];
  showAddMaterialsModifier: boolean = false;

  get isValid() {
    return this.form?.controls[this.field.name].valid;
  }
  get inValid() {
    return this.form?.controls[this.field.name].invalid;
  }
  get isDirty() {
    return this.form?.controls[this.field.name].dirty;
  }
  get isTouched() {
    return this.form?.controls[this.field.name].touched;
  }
  get isError() {
    return Object.keys(this.form?.controls[this.field?.name]?.errors)?.length;
  }

  statuses: any = [];
  clonedTableData: { [s: string]: any } = {};

  products = [
  ];

  private readonly messageService = inject(MessageService)

  constructor(
    public translate: TranslateService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.form?.get(this.formName)?.setValue(this.dataSource);
    if (this.field?.selectedRow) {
      this.selectedMainArray = this.field?.selectedRow;
    }
    if (this.field.selectedArray !== undefined && this.field.selectedCheckbox) {
      if (this.field.selectedArray.length) {
        this.selectedArray = this.field.selectedArray;
        // console.log("selected array on if", this.selectedArray)
      } else {
        // const _ = require('lodash');
        this.selectedArray = _.chain(this.field?.overlayPanelList)
          .filter((o) => _.some(this.dataSource, (i) => i.tableRowId === o.id))
          .map((o) => ({ ...o, tableRowId: o.id }))
          .value();
        // console.log("selected array on else", this.selectedArray, this.dataSource, this.field?.overlayPanelList)
      }
    }
  }
  buildOrderItemsForm(item: any): UntypedFormGroup {
    return new UntypedFormGroup(item);
  }
  onRowEditInit(item: any) {
    this.clonedTableData[item.id] = { ...item };
    // console.log("check item", this.clonedTableData[item.id])
  }

  onRowEditSave(item: any) {
    if (item[this.dataKey]) {
      delete this.clonedTableData[item[this.dataKey]];
      // this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    }
    this.form.get(this.formName).setValue(this.dataSource);
    // console.log(this.formName)
    // this.onTableValueChangeHandler(this.dataSource, this.field)
    if (typeof this.field.onRowEditSave === 'function') {
      this.field?.onRowEditSave(this.form.value);
    }

    this.field.footerInitialise;
  }

  onRowEditCancel(item: any, index: number) {
    this.dataSource[index] = this.clonedTableData[item[this.dataKey]];
    delete this.clonedTableData[item[this.dataKey]];
  }

  onRowAddInit() {
    const id = this.generateUniqueId();
    let item: any = {};
    Object.assign(item, this.formInitialise);
    item.id = id;
    if (item.hasOwnProperty('sequence')) {
      item.sequence = this.generateSerialNo(this.dataSource);
    }
    // console.log("item o row add init", item)
    this.dataSource.push(item);
    this.clonedTableData[id] = { ...item };
    // console.log('datasource', this.dataSource);
  }

  generateUniqueId() {
    return Math.floor(1000000000000 + Math.random() * 9000) + 'A';
  }

  onRowDeleteInit(item: any, index: number, tableValue) {
    delete this.clonedTableData[item[this.dataKey]];
    this.dataSource.splice(index, 1);
    if (item.hasOwnProperty('sequence')) {
      this.dataSource.forEach((ele, index) => {
        ele.sequence = index + 1;
      });
    }
    this.form.get(this.formName).setValue(this.dataSource);
    this.onTableValueChangeHandler(1, this.field, tableValue);
    if (typeof this.field.onRowEditSave === 'function') {
      this.field?.onRowEditSave(this.form.value);
    }
  }

  getDropDownText(itemId: string, fieldOptions: any) {
    let value = itemId;
    // console.log("check dropdown Text", fieldOptions?.options, fieldOptions?.optionValue, itemId)
    // console.log("filter value", fieldOptions?.options.filter((e) => {
    // console.log("check element", e.id === itemId);
    //   e.id === itemId
    // }))
    if (fieldOptions?.options?.length) {
      const filteredValue = fieldOptions?.options.filter(
        (e: any) => e[fieldOptions?.optionValue] === itemId
      );

      value = filteredValue?.length
        ? filteredValue[0][fieldOptions?.optionLabel]
        : this.fallBackDisplayText(itemId, fieldOptions);
      // console.log("check dropdown value text", value)
    }

    return value;
  }

  fallBackDisplayText(itemId: string, fieldOptions: any) {
    let value = itemId;
    // console.log("check dropdown", value)

    if (fieldOptions?.displayOptions?.length) {
      const filteredValue = fieldOptions?.displayOptions.filter(
        (e: any) => e[fieldOptions?.optionValue] === itemId
      );
      value = filteredValue?.length
        ? filteredValue[0][fieldOptions?.optionLabel]
        : itemId;
    }

    return value;
  }

  async onChangeHandler($event: any, field: any, item: any) {
    if ($event?.value && typeof field.onValueChange === 'function') {
      this.clonedTableData[item.id] = await field?.onValueChange(
        $event?.value,
        item
      );
      Object.assign(
        this.dataSource.filter((e) => e.id === item.id)[0],
        this.clonedTableData[item.id]
      );
    }
    if ($event?.value && typeof field.getTableRowID === 'function') {
      this.field?.getTableRowID(item);
    }
  }
  onValueChangeHandler($event: any, field: any, item: any) {
    // console.log("check item",item)
    if ($event && typeof field.onValueChange === 'function') {
      this.clonedTableData[item.id] = field?.onValueChange(
        $event,
        item,
        this.form.value
      );
      Object.assign(
        this.dataSource.filter((e) => e.id === item.id)[0],
        this.clonedTableData[item.id]
      );
      if (this.field?.tableFooter) {
        if (typeof field.updateTableFooter === 'function') {
          const result: { form: Form; footerInitialize: any } =
            field?.updateTableFooter(this.form.value);
          if (result?.form) {
            this.form.patchValue(result?.form);
          }
          this.field.footerInitialise = result?.footerInitialize;
        }
      }
    }
  }
  onTableValueChangeHandler($event: any, field: any, item) {
    // console.log("field in table",field,item,$event)
    if ($event && typeof field.onValueChange === 'function') {
      const value = this.field?.onValueChange($event, item, this.form.value);
      if (value) {
        this.form.patchValue(value);
      }
    }
  }
  showDialog(item: any) {
    this.display = true;
    this.field?.getTableRowID(item);
  }

  // saveDialogueData(event: any) {
  //   this.field?.saveDialogueData(event);
  // console.log('dialogue data', event);
  //   this.display = false;
  // }

  selectedBarCode = new Map();
  saveDialogueData(event: any, field, index) {
    let value = event.value;
    let isRecordExists = this.products.some((product)=> product?.code === value)
    if (!isRecordExists) {
      this.products.push({code:value});
      this.selectedBarCode.set(index, this.products)
  
      field?.saveDialogueData(this.selectedBarCode, this.form.value, index);
      this.display = false;
    }
    else{
      this.messageService.add({
        severity: 'warn',
        summary: "Barcode Exists",
        detail: "Barcode Exists",
        life: 1000,
      })
    }
   
  }

  removeBarCode(rowIndex, field, productField){
    this.products  =  this.products.filter((product)=> product.code !== productField.code);
    this.selectedBarCode.set(rowIndex, this.products);
    field?.saveDialogueData(this.selectedBarCode, this.form.value, rowIndex);
    this.display = false;
  }

  // handleDialogue(event: any) {
  // console.log("check event closing",event)
  //   this.field.closeDialogueEvent(event)
  //   return event;
  // }
  handleDialogue(event: any) {
    // console.log("check event closing", event)
    this.field?.closeDialogueEvent(event, this.form.value);
    return event;
  }

  onView(item, index, tableValue) {
    this.field?.viewData(item, index, tableValue, this.form.value);
  }

  generateSerialNo(dataSource) {
    return dataSource.length + 1;
  }

  onCloseOverlayPanel(event, op) {
    if (this.field.selectedArray !== undefined && this.field.selectedCheckbox) {
      this.selectedArray = this.selectedArray.filter((o) =>
        this.dataSource.some((i) => i.tableRowId === o.tableRowId)
      );
      this.tempDataSource = [];
      this.tempArray = [];
      this.ngOnInit();
    }
  }

  onRowSelect(event: any) {
    // event.data.tableRowId = event.data.id
    this.tempArray.push(event.data);
    this.tempDataSource = this.dataSource.filter((o) =>
      this.selectedArray.some((i) => i.tableRowId !== o.tableRowId)
    );
    // this.dataSource =
    this.rowSelected = true;
  }
  onRowUnselect(event: any) {
    this.tempArray = this.tempArray.filter((e) => e.id !== event.data.id);
    this.rowUnSelected = true;
    this.tempDataSource = this.dataSource.filter((o) =>
      this.selectedArray.some((i) => i.tableRowId === o.tableRowId)
    );
    // this.dataSource =
  }

  getOverlayPanel(event: any) {
    if (this.field?.selectedCheckbox === true) {
      this.dataSource = this.tempDataSource;
      this.form.get(this.formName).setValue(this.dataSource);
    } else {
      this.tempArray = this.selectedArray;
    }
    if (typeof this.field.getOverlayPanel === 'function') {
      this.field?.getOverlayPanel(
        this.tempArray,
        this.form.value,
        this.selectedArray
      );
      this.filtering = 'none';
    }
  }

  getSelectedArray(event: any) {
    if (typeof this.field.getSelectedArray === 'function') {
      this.field?.getOverlayPanel(
        this.selectedMainArray,
        this.form.value,
        this.formInitialise
      );
    }
  }

  onSelectAllData(event) {
    // console.log("on select all data", event, event.data)
    this.form.get(this.formName).setValue(this.dataSource);
    // this.selectedArray=this.field.overlayPanelList;
    this.tempArray = this.selectedArray;
  }

  globalSearch(event: any, tb: any) {
    return tb.filterGlobal(event.target.value, 'contains');
  }

  showTableCaptionDialog(event: any) {
    this.tableCaptionDialogFlag = true;
    // this.onMainTableRowSelect(this.selectedMainArray);
    this.dialogService
      .open(TableDialogComponent, {
        // header: "Testing",
        height: '50rem',
        width: '50rem',
        data: this.field?.field,
      })
      .onClose.subscribe((res) => {
        const responseFromActual = this.field?.field?.updateRows(res);
        const updatedResponse = responseFromActual.map((ele) => ({
          ...ele,
          id: this.generateUniqueId(),
        }));
        this.dataSource = updatedResponse;
        this.form.get(this.field?.field?.tableName).patchValue(updatedResponse);
      });
  }

  handleTableCaptionDialog(event: any) {
    if (typeof this.field.onCloseTableCaptionDialog === 'function') {
      this.field.onCloseTableCaptionDialog(event, this.form.value);
      return event;
    }
  }

  savetableCaptionDialogData(event: any) {
    if (typeof this.field.savetableCaptionDialogData === 'function') {
      this.field?.savetableCaptionDialogData(
        event,
        this.form.value,
        this.selectedMainArray
      );
      this.tableCaptionDialogFlag = false;
    }
  }

  export(dt: any) {
    let element = document.getElementById('dt');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // ws['!cols'][0] = { hidden: true };
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(
      wb,
      this.field.exportTableLabel
        ? this.field.exportTableLabel
        : 'ExportedData.xlsx'
    );
  }

  onMainTableRowSelect(event) {
    if (typeof this.field.onMainTableRowSelect === 'function') {
      this.field?.onMainTableRowSelect(event.data, this.form.value);
    }
  }

  getPrintFields() {
    // console.log(this.printFields)
    return this.printFields;
  }

  rowPrint(item) {
    this.printItem = item;
    this.showPrintModifier = true;
    this.generateFields();
  }

  generateFields() {
    this.printFields = [
      {
        type: this.field.printForm,
        value: this.printItem,
      },
    ];
  }

  ngOnDestroy(): void {
    console.log('Table Field Destroyed');
  }

  test($event) {}
}
