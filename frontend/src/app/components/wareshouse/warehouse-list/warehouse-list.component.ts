import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataViewModule } from 'primeng/dataview';
import { ApiService } from 'src/app/core/services/api.service';
import { WarehouseModel } from 'src/app/core/shared/common/model/warehouse.model';

import { MaterialLibModuleModule } from 'src/app/material-lib-module/material-lib-module.module';
import { DynamicFormGeneratorModule } from 'src/app/sanadi-library/dynamic-form-generator/dynamic-form-generator.module';
import { DynamicPrintReceiptGeneratorModule } from 'src/app/sanadi-library/dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';
import { ScrollComponent } from 'src/app/sanadi-library/sanadi-components/scroll/scroll.component';

@Component({
  selector: 'sanadi-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrl: './warehouse-list.component.scss',
  imports: [
    CommonModule,
    DynamicFormGeneratorModule,
    DataViewModule,
    ScrollComponent,
    MaterialLibModuleModule,
    TranslateModule,
    DynamicPrintReceiptGeneratorModule,
    FormsModule,
    
  ],
  standalone:true
})
export class WarehouseListComponent {
  warehouseList : WritableSignal<Array<WarehouseModel>> = signal(new Array<WarehouseModel>());

  private apiService = inject(ApiService)
  private router = inject(Router)
  
  ngOnInit() {
    this.apiService.get("/warehouse")
    .subscribe((res:any)=>{
          if (res?.results) {
            this.warehouseList.set(res?.results)
          }
    })
  }

  onWarehouseSelect(warehouse: WarehouseModel){
    this.router.navigate(['/home'])
  }
}
