import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataViewModule } from 'primeng/dataview';
import { ApiService } from 'src/app/core/services/api.service';
import { StoreModel } from 'src/app/core/shared/common/model/store.model';
import { MaterialLibModuleModule } from 'src/app/material-lib-module/material-lib-module.module';
import { DynamicFormGeneratorModule } from 'src/app/sanadi-library/dynamic-form-generator/dynamic-form-generator.module';
import { DynamicPrintReceiptGeneratorModule } from 'src/app/sanadi-library/dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';
import { ScrollComponent } from 'src/app/sanadi-library/sanadi-components/scroll/scroll.component';

@Component({
  selector: 'sanadi-store-list',
  standalone: true,
  imports: [
    CommonModule,
    DynamicFormGeneratorModule,
    DataViewModule,
    ScrollComponent,
    MaterialLibModuleModule,
    TranslateModule,
    DynamicPrintReceiptGeneratorModule,
    FormsModule
  ],
  templateUrl: './store-list.component.html',
  styleUrl: './store-list.component.scss'
})
export class StoreListComponent {

  @Input("title") title : string = "";

  storeList = signal(new Array<StoreModel>())

  private apiService = inject(ApiService)
  private router = inject(Router)


  ngOnInit() {
    this.apiService.get("/warehouse/stores/")
    .subscribe((res:any)=>{
        if (res?.results) {
          this.storeList.set(res?.results);
        }
    })
  }

  onStoreSelect(store: StoreModel){
    this.router.navigate(['/home'])
  }
}
