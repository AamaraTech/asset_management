import { Routes } from '@angular/router';
import { authGuard } from './core/shared/common/auth.gaurd';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: async () =>
      (await import('./components/home/home.component')).HomeComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: async () =>
      (await import('./core/shared/components/login/login.component'))
        .LoginComponent,
  },
  {
    path: 'wareshouse-list',
    loadComponent: async () =>
      (
        await import(
          './components/wareshouse/warehouse-list/warehouse-list.component'
        )
      ).WarehouseListComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'store-list',
    loadComponent: async () =>
      (await import('./components/store-list/store-list.component'))
        .StoreListComponent,
    data: { title: 'Store List' },
    // canActivate: [authGuard],
  },
  {
    path: 'store',
    loadComponent: async () =>
      (await import('./components/stores/stores.component')).StoresComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'item-subcategory',
    loadComponent: async () =>
      (await import('./components/item-subcategory/item-subcategory.component'))
        .ItemSubcategoryComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'item-category',
    loadComponent: async () =>
      (await import('./components/item-category/item-category.component'))
        .ItemCategoryComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'item-creation',
    loadComponent: async () =>
      (await import('./components/item-creation/item-creation.component'))
        .ItemCreationComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'vendor-master',
    loadComponent: async () =>
      (await import('./components/vendor-master/vendor-master.component'))
        .VendorMasterComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'purchase-order',
    loadComponent: async () =>
      (await import('./components/purchase-order/purchase-order.component'))
        .PurchaseOrderComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'purchase-order/new',
    loadComponent: async () =>
      (await import('./components/purchase-order/create/create.component')).CreateComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'purchase-order/edit/:id',
    loadComponent: async () =>
      (await import('./components/purchase-order/edit/edit.component')).EditComponent,
    data: { formData: 'Store List' },
    // canActivate: [authGuard],
  },
  {
    path: 'grn',
    loadComponent: async () =>
      (await import('./components/inventory-grn/inventory-grn.component'))
        .InventoryGrnComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'grn/new',
    loadComponent: async () =>
      (await import('./components/inventory-grn/inventory-grn-create/inventory-grn-create.component')).InventoryGrnCreateComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'grn/edit/:id',
    loadComponent: async () =>
      (await import('./components/inventory-grn/inventory-grn-edit/inventory-grn-edit.component')).InventoryGrnEditComponent,
    data: { formData: 'Store List' },
    // canActivate: [authGuard],
  },
  {
    path: 'location',
    loadComponent: async () =>
      (await import('./components/location/location.component'))
        .LocationComponent,
    // canActivate: [authGuard],
  },
  {
    path: 'employee-creation',
    loadComponent: async () =>
      (
        await import(
          './components/employee-creation/employee-creation.component'
        )
      ).EmployeeCreationComponent,
    canActivate: [authGuard],
  },
 
  {
    path: 'playground',
    loadComponent: async () =>
      (
        await import(
          './core/shared/components/form-playground/form-playground.component'
        )
      ).FormPlaygroundComponent,
  },
  // 404: Page not found
  {
    path: '**',
    loadComponent: async () =>
      (await import('./core/shared/components/error404/error404.component'))
        .Error404Component,
  },
];
