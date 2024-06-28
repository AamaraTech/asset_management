import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseCreationComponent } from './modules/warehouse-creation/warehouse-creation.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'warehouse',
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: WarehouseCreationComponent,
  },
  {
    path: 'list',
    // loadComponent: async () =>
    //   (await import('./warehouse-list/warehouse-list.component'))
    //     .WarehouseListComponent,
    component: WarehouseListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WareshouseRoutingModule {}
