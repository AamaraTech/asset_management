import { Component, inject, signal } from '@angular/core';
import { FormConfig } from 'src/app/core/shared/common/form-config.service';
import { TableFilterComponent } from 'src/app/sanadi-library/table-filter/table-filter.component';

@Component({
  selector: 'sanadi-stores',
  standalone: true,
  imports: [TableFilterComponent],
  templateUrl: './stores.component.html',
  styleUrl: './stores.component.scss',
})
export class StoresComponent {
  storeConfig = signal({
    formName: 'stores',
    pageTitle: 'Store_TC',
    tableHeaders: [
      {
        label: 'store_name_TC',
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
        label: 'store_code_TC',
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
        label: 'store_loction_TC',
        isFilterRequired: true,
      },
      {
        label: 'qrCode_TC',
        isFilterRequired: true,
      },
    ],
    tableBody: ['store_name', 'store_code', 'w_id', 'qr_code'],
    editable: true,
    url: {
      post: '/warehouse/stores/',
      get: '/warehouse/stores/',
      delete: '/warehouse/stores/',
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
    dialogConfig: {
      height: '70%',
      width: '50%'
    },
    isShowDialog: true,
  });
    
  storesForm = signal(null);

  private readonly storesFormConfig = inject(FormConfig);

  ngOnInit(): void {
    this.storesForm.set(this.storesFormConfig.getForm()['stores'])
  }
}
