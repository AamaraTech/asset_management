import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldBuilderComponent } from './components/field-builder/field-builder.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { CheckboxComponent } from './fields/checkbox/checkbox.component';
import { DropdownComponent } from './fields/dropdown/dropdown.component';
import { FileComponent } from './fields/file/file.component';
import { RadioComponent } from './fields/radio/radio.component';
import { TextboxComponent } from './fields/textbox/textbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateComponent } from './fields/date/date.component';
import { AutocompleteComponent } from './fields/autocomplete/autocomplete.component';
import { SlideToggleComponent } from './fields/slide-toggle/slide-toggle.component';
import { TableFieldComponent } from './fields/table-field/table-field.component';
import { CardComponent } from './fields/cards/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { FieldSetComponent } from './fields/fieldset/fieldset.component';
import { TabComponent } from './fields/tab/tab.component';
import { PFileComponent } from './fields/p-file/p-file.component';
import { NgxPrintModule } from 'ngx-print';
import { MultiBlocksComponent } from './fields/multi-blocks/multi-blocks.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NumberComponent } from './fields/number/number.component';
import { MultiselectComponent } from './fields/multiselect/multiselect.component';
import { ChipsComponent } from './fields/chips/chips.component';
import { DynamicPrintReceiptGeneratorModule } from '../dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';
import { MapComponent } from './fields/map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MaterialLibModuleModule } from 'src/app/material-lib-module/material-lib-module.module';
import { InputComponent } from './fields/input/input.component';
import { AccordionComponent } from './fields/accordion/accordion.component';
import { FlexLayoutModule } from '../flex-layout/module';
import { ScrollComponent } from '../sanadi-components/scroll/scroll.component';
import { TableDialogComponent } from './fields/table-field/table-dialog/table-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@NgModule({
  declarations: [
    FieldBuilderComponent,
    FormBuilderComponent,
    CheckboxComponent,
    DropdownComponent,
    FileComponent,
    RadioComponent,
    TextboxComponent,
    InputComponent,
    DateComponent,
    AutocompleteComponent,
    SlideToggleComponent,
    TableFieldComponent,
    TableDialogComponent,
    CardComponent,
    FieldSetComponent,
    TabComponent,
    PFileComponent,
    MultiBlocksComponent,
    NumberComponent,
    MultiselectComponent,
    ChipsComponent,
    MapComponent,
    AccordionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialLibModuleModule,
    ScrollComponent,
    InputGroupModule,
    InputGroupAddonModule,

    // FlexLayoutModule,
    TranslateModule,
    NgxPrintModule,
    DynamicPrintReceiptGeneratorModule,
    LeafletModule,
    NgxPermissionsModule.forChild(),
  ],
  exports: [FormBuilderComponent, NgxPermissionsModule, FieldBuilderComponent,
    CheckboxComponent,
    DropdownComponent,
    FileComponent,
    RadioComponent,
    TextboxComponent,
    InputComponent,
    DateComponent,
    AutocompleteComponent,
    SlideToggleComponent,
    TableFieldComponent,
    TableDialogComponent,
    CardComponent,
    FieldSetComponent,
    TabComponent,
    PFileComponent,
    MultiBlocksComponent,
    NumberComponent,
    MultiselectComponent,
    ChipsComponent,
    MapComponent,
    AccordionComponent,],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class DynamicFormGeneratorModule {}
