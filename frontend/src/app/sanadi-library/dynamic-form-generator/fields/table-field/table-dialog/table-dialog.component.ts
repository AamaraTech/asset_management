import { Component, OnInit, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'sanadi-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrl: './table-dialog.component.scss',
})
export class TableDialogComponent implements OnInit {
  private translate = inject(TranslateService);
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);

  field :any;
  //   overlayPanelColumnSchema: null,
  //   overlayPanelList: [{}, {}, {}, {}, {}],
  //   overlayPanelSelectionMode: 'single',
  //   overlayPanelRows: 10,
  //   dialogScrollHeight: '55vh',
  //   overlayPanelFormInitialise: ['productName', 'kit_no'],
  //   overlayPanelPaginator: true,
  //   scrollable: true,
  //   lazy: true,
  //   fontSize: '14px',
  //   queryParams: {},
  //   disabledField: 'false',
  // };
  selectedArray = [];
  loading: boolean;
  totalRecords = 10;
  matchModeOptions;
  display;
  showAddButton:boolean=true;
  disableCheckBoxHeader: boolean;

  private readonly apiService = inject(ApiService)

  ngOnInit(): void {
    this.field = this.config.data

    this.apiService.get(this.field.url)
    .subscribe((res:any)=>{
      if (res?.results) {
        this.field.overlayPanelList = res?.results;
      }
    })
  }

  onSelectAllData(event) {}

  onRowSelect(event) {}

  onRowUnselect(event) {}

  nextPage(event, params) {}

  isCheckBoxDisabled() {
    return false;
  }

  getOverlayPanel(event) {
    this.ref.close(this.selectedArray)
  }
}
