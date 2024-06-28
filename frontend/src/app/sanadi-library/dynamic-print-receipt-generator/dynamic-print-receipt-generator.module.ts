import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptFieldBuilderComponent } from './components/receipt-field-builder/receipt-field-builder.component';
import { ReceiptBuilderComponent } from './components/receipt-builder/receipt-builder.component';
import { HeaderComponent } from './print-components/header/header.component';
import { FooterComponent } from './print-components/footer/footer.component';
import { NgxPrintModule } from 'ngx-print';

import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterHeaderComponent } from './print-components/footer-header/footer-header.component';
import { FooterBodyComponent } from './print-components/footer-body/footer-body.component';
import { MaterialLibModuleModule } from 'src/app/material-lib-module/material-lib-module.module';



@NgModule({
  declarations: [
    ReceiptFieldBuilderComponent,
    ReceiptBuilderComponent,
    HeaderComponent,
    FooterComponent,
    FooterHeaderComponent,
    FooterBodyComponent
  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialLibModuleModule
  ],
  exports: [
    ReceiptBuilderComponent
  ]
})
export class DynamicPrintReceiptGeneratorModule { }
