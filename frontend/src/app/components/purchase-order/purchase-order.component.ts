import { HttpParams } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ServiceUrlConstants } from 'src/app/core/shared/utils/service-url-constants';
import { TableFilterComponent } from 'src/app/sanadi-library/table-filter/table-filter.component';

@Component({
  selector: 'sanadi-purchase-order',
  standalone: true,
  imports: [TableFilterComponent],
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.scss',
})
export class PurchaseOrderComponent implements OnInit {
  private readonly apiService = inject(ApiService);
  purchaseOrderConfig = signal({
    formName: 'purchase-order',
    pageTitle: 'Purchase Order',
    tableHeaders: [
      {
        label: 'source_TC',
        field: 'source',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'po_no_TC',
        field: 'po_no',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'po_date_TC',
        isFilterRequired: true,
      },
      {
        label: 'vendor_quotation_no_TC',
        isFilterRequired: true,
      },
      {
        label: 'ship_to_tax_no_TC',
        isFilterRequired: true
      }
    ],
    tableBody: ['source', 'po_no', 'po_date', 'vendor_quotation_no', 'ship_to_tax_no'],
    editable: true,
    url: {
      post: '/purchase/purchase-order/',
      get: '/purchase/purchase-order/',
      delete: '/purchase/purchase-order/',
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
    dialogData: {},
    isShowDialog: false,
    parentRoute: "purchase-order",
    dropdownOptions:{
      'vendor-options':[],
      "payment_terms": [],
      "delivery_terms":[]
    }
  });

  ngOnInit(): void {
    this.apiService.get(ServiceUrlConstants.VENDOR_MASTER).subscribe((res:any)=>{
      if (res?.results) {
        this.purchaseOrderConfig.update((config)=>{
           config.dropdownOptions['vendor-options'] = res?.results;
           return config
        })
      }
    })

    forkJoin([this.getPaymentTerms(), this.getDeliveryTerms()])
    .subscribe(([paymentTermsResponse, deliveryTermsResponse])=>{
      this.purchaseOrderConfig.update((config)=>{
        config.dropdownOptions['payment_terms'] = (<any>paymentTermsResponse)?.results[0]?.enum_value;
        config.dropdownOptions['delivery_terms'] = (<any>deliveryTermsResponse)?.results[0]?.enum_value;
        return config
     })
    })
  }

  getPaymentTerms(){
    return this.apiService.get(ServiceUrlConstants.APP_ENUMS, new HttpParams().append("enum_key", "payment_terms"))
  }

  getDeliveryTerms(){
    return this.apiService.get(ServiceUrlConstants.APP_ENUMS, new HttpParams().append("enum_key", "delivery_terms"))
  }
}
