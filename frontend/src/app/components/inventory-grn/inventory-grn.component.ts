import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormConfig } from 'src/app/core/shared/common/form-config.service';
import { GRNFormConfig } from 'src/app/core/shared/common/forms/inventory-grn-form.config.service';
import { ServiceUrlConstants } from 'src/app/core/shared/utils/service-url-constants';
import { TableFilterComponent } from 'src/app/sanadi-library/table-filter/table-filter.component';

@Component({
  selector: 'sanadi-inventory-grn',
  standalone: true,
  imports: [TableFilterComponent],
  templateUrl: './inventory-grn.component.html',
  styleUrl: './inventory-grn.component.scss'
})
export class InventoryGrnComponent implements OnInit {
  grnConfig = signal({
    formName: 'inventory-grn',
    pageTitle: 'Goods Received Note',
    tableHeaders: [
      {
        label: 'grn_no_TC',
        field: 'grn_no',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'grn_date_TC',
        field: 'grn_date',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'vendor_bill_TC',
        isFilterRequired: false,
      },
      {
        label: 'vendor_bill_date_TC',
        isFilterRequired: false,
      }
    ],
    tableBody: ['grn_no', 'grn_date', 'vendor_bill', 'vendor_bill_date'],
    editable: true,
    url: {
      post: ServiceUrlConstants.GOODS_RECEIVED_NOTE,
      get: ServiceUrlConstants.GOODS_RECEIVED_NOTE,
      delete: ServiceUrlConstants.GOODS_RECEIVED_NOTE,
      UPDATE: '',
    },
    actions: [
      {
        label: '',
        icon: 'pencil',
        actionType: 'EDIT',
      },
      {
        label: '',
        icon: 'trash',
        actionType: 'DELETE',
      },
    ],
    isShowDialog: false,
    parentRoute: "grn",
    dropdownOptions:{
      filed:{
        "purchase_order":{IsHidden:true}
      }
    }
  });

  grnForm = signal(null);

  private readonly grnFormConfig = inject(FormConfig);

  ngOnInit(): void {
    this.grnForm.set(this.grnFormConfig.getForm()['inventory-grn'])
  }
}
