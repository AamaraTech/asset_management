import { Injectable, inject } from '@angular/core';
import { StoreFormConfig } from './forms/store-form-config.servce';
import { ItemCategoryFormConfig } from './forms/item-category-form.config.service';
import { ItemSubCategoryFormConfig } from './forms/item-subcategory-form.config.service';
import { ItemCreationFormConfig } from './forms/item-creation-form.config.service';
import { VendorMasterFormConfig } from './forms/vendor-master-form.config.service';
import { PurchaseOrderFormConfig } from './forms/purchase-order-form.config.service';
import { EmployeeCreationFormConfig } from './forms/employee-creation-form.config.service';
import { LocationFormConfig } from './forms/location-form.config.service';
import { GRNFormConfig } from './forms/inventory-grn-form.config.service';

@Injectable({
  providedIn: 'root',
})
export class FormConfig {
  private readonly storeForm = inject(StoreFormConfig);
  private readonly itemCategoryForm = inject(ItemCategoryFormConfig);
  private readonly itemSubCategoryForm = inject(ItemSubCategoryFormConfig);
  private readonly itemCreationForm = inject(ItemCreationFormConfig);
  private readonly vendorMasterForm = inject(VendorMasterFormConfig);
  private readonly purchaseOrderForm = inject(PurchaseOrderFormConfig);
  private readonly employeeCreationForm = inject(EmployeeCreationFormConfig);
  private readonly locationForm = inject(LocationFormConfig);
  private readonly inventoryGrnForm = inject(GRNFormConfig);

  getForm() {
    return {
      stores: this.storeForm.STORE_FORM(),
      'item-category': this.itemCategoryForm.ItemCategoryForm(),
      'item-subcategory': this.itemSubCategoryForm.ItemSubCategoryForm(),
      'item-creation': this.itemCreationForm.ItemCreationForm(),
      'vendor-master': this.vendorMasterForm.VendorMasterForm(),
      'purchase-order': this.purchaseOrderForm.PurchaseOrderForm(),
      'employee-creation' : this.employeeCreationForm.EmployeeCreationForm(),
      'location' : this.locationForm.LocationForm(),
      'inventory-grn' : this.inventoryGrnForm.InventoryGrnForm()
    };
  }
}
