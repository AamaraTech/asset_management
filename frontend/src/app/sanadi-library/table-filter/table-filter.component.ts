import { CommonModule } from '@angular/common';
import { Component, Input, inject, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { switchMap } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';
import { InputTextModule } from 'primeng/inputtext';
import { DialogFooterComponent } from './dialog/dialog-footer/dialog-footer.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ApiService } from 'src/app/core/services/api.service';
import { MenuModule } from 'primeng/menu';
import { FlexLayoutModule } from '../flex-layout/module';
import { Router } from '@angular/router';
import { ProgressKnobComponent } from 'src/app/core/shared/components/progress-knob/progress-knob.component';

@Component({
  selector: 'sanadi-table-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ConfirmPopupModule,
    TranslateModule,
    FlexLayoutModule,
    MenuModule,
    ProgressKnobComponent
  ],  
  providers: [DialogService],
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss',
})
export class TableFilterComponent {
  dataSource = [];
  @Input() config: any;
  formConfig = input<any>([]);
  ref: DynamicDialogRef | undefined;
  page: number = 1;
  filteredColumns: Array<any> = [];
  loading: boolean = false;
  totalRecords: number = 0;

  apiService = inject(ApiService);
  dialogService = inject(DialogService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  private readonly router = inject(Router);

  items: MenuItem[];


  constructor() {}

  ngOnInit() {
    this.getApiDataByActivatedRoute(this.getCurrentPage());
    this.items = [
      {
        label: 'Active',
        icon: 'pi pi-refresh',
        command: () => {
          // this.update();
        },
      },
      {
        label: 'InActive',
        icon: 'pi pi-times',
        command: () => {
          // this.delete();
        },
      },
    ];
  }

  onAction(event: Event, item, actionType) {
    if (actionType === 'EDIT') {
      if (this.config.isShowDialog){
        this.show(item, true);
      }
      else{
        this.router.navigate([`/${this.config.parentRoute}/edit/${item.id}`], {
          // queryParams: { 
          //   formName: this.config.formName
          // },
          state: {
            item:item,
            config: this.config
          }
        })
      }
      
    } else if (actionType === 'DELETE') {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure you want to proceed?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.apiService
            .delete(this.config.url.delete, item.id)
            .pipe(
              switchMap(() => {
                this.messageService.add({
                  key: 'toaster',
                  severity: 'success',
                  summary: 'Deleted',
                  detail: 'Successfully deleted the record',
                  life: 3000,
                });
                return this.apiService.get(
                  this.config.url.get,
                  this.getCurrentPage()
                );
              })
            )
            .subscribe((response: any) => {
              this.totalRecords = response.count;
              this.dataSource = response.results;
            });
        },
        reject: () => {
          this.messageService.add({
            key: 'toaster',
            severity: 'error',
            summary: 'Rejected',
            detail: 'You have rejected',
            life: 3000,
          });
        },
      });
    } else if (actionType === 'APPROVE') {
    }
  }

  show(item?: any, isEditMode?: boolean) {
    if (this.config.isShowDialog) {
      this.ref = this.dialogService.open(DialogComponent, {
        header: this.config.pageTitle,
        width: this.config.dialogConfig?this.config.dialogConfig?.width:'100%',
        height: this.config.dialogConfig?this.config.dialogConfig?.height:'100%',
        contentStyle: { overflow: 'auto' },
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw',
        },
        dismissableMask:false,
        appendTo:'body',
        maximizable: true,
        data: {
          config: this.config,
          form: this.formConfig(),
          item: item,
          isEditMode: isEditMode,
          ...this.config.dialogData,
        },
        templates: {
          footer: DialogFooterComponent,
        },
      });
  
      this.ref.onClose.subscribe((response: any) => {
        if (response) {
          this.apiService
            .post(this.config.url.post, {
              ...response,
              // TODO: REMOVE BELOW Entries
              is_active: true,
              // warehouse: 1,
            })
            .pipe(
              switchMap(() => {
                return this.apiService.get(
                  this.config.url.get,
                  this.getCurrentPage()
                );
              })
            )
            .subscribe((response: any) => {
              this.totalRecords = response.count;
              this.dataSource = response.results;
            });
        }
      });
    }
    else{
      this.router.navigate([`/${this.config.parentRoute}/new`], {
        // queryParams: { 
        //   formName: this.config.formName
        // },
        state: {
          item:item,
          config: this.config
        }
      })//.navigateByUrl('/${this.config.parentRoute}/new', { state: { id:100 , name:'Maya' } });
    }
  

    // this.ref.onMaximize.subscribe((value) => { });
  }

  // This function is triggered when the user navigates to the next page or when triggers column filter in the table.
  nextPage(event: TableLazyLoadEvent) {
    console.log("event",event)
    // Set loading to true to indicate that data is being loaded.
    this.loading = true;
    // Calculate the current page based on the provided event parameters.
    this.page = event.first / event.rows + 1;
    // Initialize the array to store column filters.
    this.filteredColumns = [];

    // Check if filters are applied in the table event.
    if (event.filters) {
      // Iterate through each filter and add it to the filteredColumns array.
      for (const [columnName, filterArray] of Object.entries(event.filters)) {
        const filter = filterArray[0];
        if (filter && filter.value) {
          this.filteredColumns.push({
            [`${columnName}__${filter?.matchMode?.toLowerCase()}`]:
              filter.value,
          });
        }
      }
    }

    // Check if any filters are applied.
    if (this.filteredColumns.length > 0) {
      // Merge filters and pagination parameters for the API request.
      const mergedParams = Object.assign({}, ...this.filteredColumns, {
        page: this.page,
      });
      // Make an API request using the merged parameters.
      this.apiService
        .get(this.config.url.get, mergedParams)
        .subscribe((response: any) => {
          // Update data source and total records based on the API response.
          if (response?.results) {
            this.loading = false;
            this.totalRecords = response.count;
            this.dataSource = response.results;
          }
        });
    } else {
      const queryParams = event.globalFilter
        ? { ...this.getCurrentPage(), search: event.globalFilter }
        : this.getCurrentPage();
      // if (this.page !== 1) {
        this.getApiDataByActivatedRoute(queryParams);
      // }
    }
  }

  // Global search for table
  globalSearch(event, dt) {
    dt.filterGlobal(event.target.value);
    this.page = 1; // backend search starts from page 1
  }

  // Fetch data based on the route configuration when no filters are applied.
  getApiDataByActivatedRoute(queryParams: Object) {
    this.loading=true;
    this.apiService
      .get(this.config.url.get, queryParams)
      .subscribe((res: any) => {
        if (res?.results) {
          this.loading = false;
          this.totalRecords = res.count;
          this.dataSource = res.results
        }
      });
  }

  getCurrentPage() {
    return { page: this.page };
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
