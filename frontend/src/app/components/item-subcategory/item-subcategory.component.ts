import { Component, inject, signal } from '@angular/core';
import { FormConfig } from 'src/app/core/shared/common/form-config.service';
import { TableFilterComponent } from 'src/app/sanadi-library/table-filter/table-filter.component';

@Component({
  selector: 'sanadi-item-subcategory',
  standalone: true,
  imports: [TableFilterComponent],
  templateUrl: './item-subcategory.component.html',
  styleUrl: './item-subcategory.component.scss'
})
export class ItemSubcategoryComponent {
  itemSubCategoryConfig = signal({
    "formName":"item-subcategory",
    "pageTitle": "ItemSubCategory_TC",
    "tableHeaders": [
      {
        "label": "subCategoryCode_TC",
        "isFilterRequired": true
      },
      {
        "label": "subCategory_TC",
        "isFilterRequired": true
      }
    ],
    "tableBody": ["subcategory_code", "subcategory"],
    "editable": true,
    "url": {
      "post": "/asset/subcategories/",
      "get": "/asset/subcategories/",
      "delete": "/asset/subcategories/",
      "update": "/asset/subcategories/"
    },
    "actions": [
      {
        "label": "",
        "icon": "pencil",
        "actionType": "EDIT"
      },
      {
        "label": "",
        "icon": "trash",
        "actionType": "DELETE"
      }
    ],
    "dialogData": {},
    dialogConfig: {
      height: '30%',
      width: 'auto'
    },
    isShowDialog: true,
  }
  )

  itemSubCategoryForm = signal(null);

  private readonly itemSubCategoryFormConfig = inject(FormConfig);

  ngOnInit(): void {
    this.itemSubCategoryForm.set(this.itemSubCategoryFormConfig.getForm()['item-subcategory'])
  }
}
