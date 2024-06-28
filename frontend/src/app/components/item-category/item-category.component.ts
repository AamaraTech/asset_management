import { Component, inject, signal } from '@angular/core';
import { FormConfig } from 'src/app/core/shared/common/form-config.service';
import { TableFilterComponent } from 'src/app/sanadi-library/table-filter/table-filter.component';

@Component({
  selector: 'sanadi-item-category',
  standalone: true,
  imports: [TableFilterComponent],
  templateUrl: './item-category.component.html',
  styleUrl: './item-category.component.scss',
})
export class ItemCategoryComponent {
  itemCategoryConfig = signal({
    formName: 'item-category',
    pageTitle: 'ItemCategory_TC',
    tableHeaders: [
      {
        label: 'categoryCode_TC',
        isFilterRequired: true,
      },
      {
        label: 'category_TC',
        isFilterRequired: true,
      },
    ],
    tableBody: ['category_code', 'category'],
    editable: true,
    url: {
      post: '/asset/categories/',
      get: '/asset/categories/',
      delete: '/asset/categories/',
      update: '/asset/categories/',
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
      height: 'auto',
      width: '30%',
    },
    isShowDialog: true,
  });

  itemCategoryForm = signal(null);

  private readonly itemCategoryFormConfig = inject(FormConfig);

  ngOnInit(): void {
    this.itemCategoryForm.set(this.itemCategoryFormConfig.getForm()['item-category'])
  }
}
