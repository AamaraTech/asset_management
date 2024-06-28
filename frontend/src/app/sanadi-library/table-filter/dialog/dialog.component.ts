import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormConfigService } from 'src/app/core/services/form-config.service';
import { FormConfig } from 'src/app/core/shared/common/form-config.service';
import { DynamicFormGeneratorModule } from '../../dynamic-form-generator/dynamic-form-generator.module';
import { FormObserver } from 'src/app/core/shared/common/forms/core/form-observer';

@Component({
  selector: 'sanadi-dialog',
  standalone: true,
  imports: [DynamicFormGeneratorModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  showAppSettingsModifier: boolean = false;

  formFields: any = [];

  private translate = inject(TranslateService);
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  private formConfig = inject(FormConfigService);
  private formConfig2 = inject(FormConfig);
  private readonly formObserver = inject(FormObserver);

  ngOnInit(): void {
    this.setAppSettingsFields();
  }

  setAppSettingsFields() {
    const formFields = this.config.data.form;
      // this.formConfig2.getForm()[this.config.data.config.formName];
      if (typeof formFields === "function") {
        if (this.config.data.isEditMode) {
          this.formFields = formFields(this.config.data.config.dropdownOptions, null, true, this.config.data.item);
        } else {
          this.formFields = formFields(this.config.data.config.dropdownOptions);
        }
      }
  }

  getFields() {
    return this.formFields;
  }

  onValueChange(formResponse: any) {
    const item = this.config.data.item;
    this.config.data['form'] = formResponse.data;
    if (formResponse?.data) {
      this.config.data.item = { ...item, ...formResponse.data.data };
    }
  }

  onTabChange(res: any) {
    this.config.data['tabConfig'] = res;
  }
}
