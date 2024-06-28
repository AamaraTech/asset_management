import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { WarehouseCreationComponent } from './modules/warehouse-creation/warehouse-creation.component';
import { WareshouseRoutingModule } from './wareshouse-routing.module';
import { DynamicPrintReceiptGeneratorModule } from '../dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';

import { FormsModule } from '@angular/forms';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
// import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';




@NgModule({
  declarations: [
    // WarehouseCreationComponent,
    // WarehouseListComponent

  ],
  imports: [
    CommonModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule,
    DynamicPrintReceiptGeneratorModule,
    FormsModule,
    
  ],
  providers: [ConfirmationService, DatePipe],
})
export class WareshouseModule {}
