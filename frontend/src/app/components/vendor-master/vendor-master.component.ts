import { Component, inject, signal } from '@angular/core';
import { FormConfig } from 'src/app/core/shared/common/form-config.service';
import { TableFilterComponent } from 'src/app/sanadi-library/table-filter/table-filter.component';

@Component({
  selector: 'sanadi-vendor-master',
  standalone: true,
  imports: [TableFilterComponent],
  templateUrl: './vendor-master.component.html',
  styleUrl: './vendor-master.component.scss',
})
export class VendorMasterComponent {
  vendorMasterConfig = signal({
    formName: 'vendor-master',
    pageTitle: 'Vendor Master',
    tableHeaders: [
      {
        label: 'vendor_name_TC',
        field: 'store_name',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'vendor_code_TC',
        field: 'store_code',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'vendor_type_TC',
        field: 'vendor_type',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'email_TC',
        field: 'email',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
    ],
    tableBody: ['vendor_name', 'vendor_code', 'vendor_type', 'email'],
    editable: true,
    url: {
      post: '/master/vendor/',
      get: '/master/vendor/',
      delete: '/master/vendor/',
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
    isShowDialog: true,
  });
      
  vendorMasterForm = signal(null);

  private readonly vendorMasterFormConfig = inject(FormConfig);

  ngOnInit(): void {
    this.vendorMasterForm.set(this.vendorMasterFormConfig.getForm()['vendor-master'])
  }
}
