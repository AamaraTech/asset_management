import { Component, OnInit, inject, signal } from '@angular/core';
import { FormConfig } from 'src/app/core/shared/common/form-config.service';
import { TableFilterComponent } from 'src/app/sanadi-library/table-filter/table-filter.component';

@Component({
  selector: 'sanadi-item-creation',
  standalone: true,
  imports: [TableFilterComponent],
  templateUrl: './item-creation.component.html',
  styleUrl: './item-creation.component.scss',
})
export class ItemCreationComponent implements OnInit {
  itemCreationConfig = signal({
    formName: 'item-creation',
    pageTitle: 'ItemCreation_TC',
    tableHeaders: [
      {
        label: 'asset_code_TC',
        isFilterRequired: false,
      },
      {
        label: 'asset_name_TC',
        isFilterRequired: false,
      },
      {
        label: 'asset_description_TC',
        isFilterRequired: false,
      },
      {
        label: 'asset_type_TC',
        isFilterRequired: false,
      },
      {
        label: 'asset_status_TC',
        isFilterRequired: false,
      },
      {
        label: 'asset_hs_code_TC',
        isFilterRequired: false,
      },
      {
        label: 'asset_category_TC',
        isFilterRequired: false,
      },
      {
        label: 'asset_subcategory_TC',
        isFilterRequired: false,
      },
    ],
    tableBody: [
      'asset_code',
      'asset_name',
      'asset_description',
      'asset_type',
      'asset_status',
      'asset_hs_code',
      'asset_category_name',
      'asset_subcategory_name',
    ],
    editable: true,
    url: {
      post: '/asset/',
      get: '/asset/',
      delete: '/asset/',
      update: '/asset/',
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

  itemCreationForm = signal(null);

  private readonly itemCreationFormConfig = inject(FormConfig);

  ngOnInit(): void {
    this.itemCreationForm.set(this.itemCreationFormConfig.getForm()['item-creation'])
  }
}
