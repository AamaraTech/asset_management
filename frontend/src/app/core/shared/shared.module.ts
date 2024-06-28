import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MessageService } from 'primeng/api';
import { FloatingMenuComponent } from './components/floating-menu/floating-menu.component';
// import { FormPlaygroundComponent } from './components/form-playground/form-playground.component';
import { DynamicFormGeneratorModule } from 'src/app/sanadi-library/dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from 'src/app/material-lib-module/material-lib-module.module';


@NgModule({
  declarations: [
    // FormPlaygroundComponent,
    FloatingMenuComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule,
    NgxPermissionsModule.forChild()
  ],
  exports: [
    FloatingMenuComponent,
    NgxPermissionsModule
  ],
  providers: [MessageService]
})
export class SharedModule { }
