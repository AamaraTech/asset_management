import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { WareHouseCreation } from 'src/app/shared/models/wareshouse.model';
import { WareshouseCreationService } from './services/wareshouse-creation.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { Table } from 'primeng/table';
import { CompanyService } from 'src/app/company/modules/company-main-page/services/company.service';
import { Company } from 'src/app/shared/models/company.model';
import { CommonModule } from '@angular/common';
import { DynamicFormGeneratorModule } from 'src/app/dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from 'src/app/material-lib-module/material-lib-module.module';
import { DynamicPrintReceiptGeneratorModule } from 'src/app/dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-warehouse-creation',
  templateUrl: './warehouse-creation.component.html',
  styleUrls: ['./warehouse-creation.component.scss'],
  imports: [
    CommonModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule,
    DynamicPrintReceiptGeneratorModule,
    FormsModule
  ],
  standalone:true
})
export class WarehouseCreationComponent implements OnInit {

  visible: boolean;
  isDialogOpened: boolean = false;

  showDialog() {
    this.visible = true;
  }


  columns: any = [];
  formFields: any = [];
  wareHouseCreation: WareHouseCreation | any = {};
  wareHouseCreationList: WareHouseCreation[] = new Array<WareHouseCreation>();
  selectedWareHouseCreation: WareHouseCreation[] = new Array<WareHouseCreation>();
  showWareHouseCreationModifier: boolean = false;
  companyList: Company[] = new Array<Company>();
  totalRecords = 0;
  page: number = 1;
  loading: boolean;
  searchText: any;
  searchText1: any;
  list_per_page: any;
  matchModeOptions: any = 'Contains';
  filteredColumns: any = [];

  successResponse: boolean;
  progressValue: number = 0;
  disableSaveButton: boolean = false;
  lat = 28.7041; // Set the initial latitude here
  lng = 77.1025; // Set the initial longitude here

  onLocationSelected(location: { lat: number; lng: number }) {
    // Handle the selected location (e.g., save it to your form model)
    console.log('Selected Location:', location);
  }
  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private _wareHouseService: WareshouseCreationService,
    private _companyService: CompanyService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    console.log("warehouse  component initlaized")
    this.route.queryParams.subscribe(p => {
      if (p['page']) {
        this.page = p['page'];
      }
    });

    this.setWareHouseFields();
    this.setWareHouseTable();
    // this.getWareHouseCreationList(this.page);
    // this.getCompanyList();
  }

  // For Table Show 

  setWareHouseTable() {
    this.columns = [
      { field: 'warehouse_name', label: 'warehouseName_TC' },
      { field: 'warehouse_code', label: 'warehouseCode_TC' },
      { field: 'created', label: 'created_TC', filter: false },
      { field: 'modified', label: 'modified_TC', filter: false },
    ]
  }

  globalSearch(event: any) {
    this.searchText = event;
    this.page = 1;
    this._wareHouseService.getGlobalSearchList(event, this.page).subscribe((res) => {
      this.loading = false;
      this.totalRecords = res?.count;
      this.wareHouseCreationList = res?.results;
    })
  }

  paginate(event: any) {
    this.list_per_page = event.rows;
    this._wareHouseService.getSelectedExportList(this.page, this.list_per_page).subscribe((res) => {
      this.loading = false;
      this.totalRecords = res?.count;
      this.wareHouseCreationList = res?.results;
    })
  }

  export(dt: any) {
    //return dt.exportCSV();
    let element = document.getElementById("table")
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    ws['!cols'][0] = { hidden: true };
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, 'ExportedData.xlsx')
  }

  filter(event: any) {
    this._wareHouseService.getGlobalSearchList(event, 1).subscribe((res) => {
      this.loading = false;
      this.totalRecords = res?.count;
      this.wareHouseCreationList = res?.results;
    })
  }

  clear(table: Table) {
    for (let element of this.columns) {
      if (table.filters[element['field']]) {
        table.filters[element['field']][0].value = null;
      }
    }
    this.filteredColumns = [];
    this.getWareHouseCreationList(this.page = 1);
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('warehouseCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('warehouseCreation_TC') })
  }

  // Dynamic Form Generating Fields
  setWareHouseFields() {
    const lat = 28.7041; // Set the initial latitude here
    const lng = 77.1025; 
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('warehouseDetails_TC'),
        footerText: '',
        fillScreen: 48,
        fields: [
          {
            type: 'text',
            name: 'warehouseName',
            label: this.translate.instant('warehouseName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('warehouseName_TC') }),
            value: this.wareHouseCreation.warehouseName,
            validation: {
              required: true,
              maxlength: 150,
            },
            prefixGroupBy: true,
            prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('warehouseName_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('warehouseName_TC'), char: this.translate.instant('one_fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'warehouseCode',
            label: this.translate.instant('warehouseCode_TC'),
            placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('warehouseCode_TC') }),
            value: this.wareHouseCreation.warehouseCode,
            readonly: 'readonly',
          }
        ]
      }, {
        type: 'fieldset',
        headerText: this.translate.instant('warehouseLocationInfo_TC'),
        footerText: '',
        fillScreen: 100,
        fields: [
          {
            type: 'map',
            name: 'warehouseLocation',
            label: this.translate.instant('warehouseLocation_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('warehouseLocation_TC') }),
            value: this.wareHouseCreation.warehouseLocation || {lat,lng},
            isDialogOpened: this.isDialogOpened
          }
        ]
      }]
  }

  // Get or return fields from dynamic form generator
  getFields() {
    return this.formFields;
  }

  // Get Ware house creation list here
  getWareHouseCreationList(pageNumber: any) {
    this._wareHouseService.getWareHouseCreationLists(pageNumber).subscribe(
      (response) => {
        if (response?.results) {
          this.loading = false;
          this.wareHouseCreationList = response?.results;
          this.totalRecords = response?.count;
        }
      }
    )
  }

  //  For editing the added data
  editWareHouseCreation(WareHouseCreation: WareHouseCreation) {
    this.wareHouseCreation = { ...WareHouseCreation };
    this.setWareHouseFields();
    this.showWareHouseCreationModifier = true;
  }


  deleteWareHouseCreation(event: Event, wareHouseCreation: WareHouseCreation) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', { entity: wareHouseCreation?.warehouseName }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._wareHouseService.removeWareHouseCreation(wareHouseCreation?.id).subscribe(
          (response) => {
            if (response == null) {
              this._sharedService.handleSuccess(
                this.translate.instant('entityDeleteSuccessTitle_TC', { entity: wareHouseCreation?.warehouseName })
              );
            }
            if (this.wareHouseCreationList.length === 1 && this.page > 1) {
              this.page--;
            }
            if (this.filteredColumns.length > 0) {
              const mergedParams = Object.assign({}, ...this.filteredColumns);
              this._wareHouseService.getWareHouseCreationListByMultipleParameters(mergedParams, this.page).subscribe((response) => {
                if (response?.results) {
                  this.loading = false;
                  this.totalRecords = response?.count;
                  this.wareHouseCreationList = response?.results;
                }
              })
            } else if (typeof this.searchText === 'undefined') {
              this.getWareHouseCreationList(this.page);
            } else {
              this._wareHouseService.getGlobalSearchList(this.searchText, this.page).subscribe((res) => {
                this.loading = false;
                this.totalRecords = res?.count;
                this.wareHouseCreationList = res?.results;
              })
            }
          }
        )
      }
    });
  }


  saveWarehouse(wareHouseCreation: WareHouseCreation) {
    this.disableSaveButton = true;
    if (this.wareHouseCreation?.id) {
      wareHouseCreation.id = this.wareHouseCreation?.id;
      // this.clearWareHouseCreation();
    }
    this._wareHouseService.WareHouseCreationModifier(wareHouseCreation).subscribe(
      (response) => {
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: wareHouseCreation?.warehouseName })
          );
          this.successResponse = true;
          this.progressValue = 100;
          setTimeout(() => {
            this.disableSaveButton = false;
            this.showWareHouseCreationModifier = false;
            this.getWareHouseCreationList(this.page);
            this.clearWareHouseCreation();
          }, 1000)
        }
        else {
          this.showWareHouseCreationModifier = true;
          this.successResponse = false;
          this.disableSaveButton = false;
        }
      }
    )
  }

  clearWareHouseCreation() {
    this.wareHouseCreation = {};
    this.setWareHouseFields();
    this.disableSaveButton = false;
    this.progressValue = 0;
  }

  nextPage(event: LazyLoadEvent) {
    this.loading = true;
    this.page = event.first / event.rows + 1;
    this.router.navigate(['/wareshouse/create/'], {
      queryParams: { page: this.page }
    });
    this.filteredColumns = [];
    if (event.filters) {
      for (const [columnName, filterArray] of Object.entries(event.filters)) {
        const filter = filterArray[0];
        if (filter && filter.value) {
          this.filteredColumns.push({ [columnName]: filter.value });
        }
      }
    }
    if (this.filteredColumns.length > 0) {
      const mergedParams = Object.assign({}, ...this.filteredColumns);
      this._wareHouseService.getWareHouseCreationListByMultipleParameters(mergedParams, this.page).subscribe((response) => {
        if (response?.results) {
          this.loading = false;
          this.totalRecords = response?.count;
          this.wareHouseCreationList = response?.results;
        }
      })
    } else if (typeof this.searchText === 'undefined') {
      this.getWareHouseCreationList(this.page);
    } else {
      this._wareHouseService.getGlobalSearchList(this.searchText, this.page).subscribe((res) => {
        this.loading = false;
        this.totalRecords = res?.count;
        this.wareHouseCreationList = res?.results;
      })
    }
  }

  onDialogShow() {
    console.log("comes oher on how")
    this.isDialogOpened = true;
    this.setWareHouseFields();
  }

}
