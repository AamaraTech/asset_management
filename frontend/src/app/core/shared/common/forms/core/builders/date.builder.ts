import { FormField } from '../form-builder';

export class DateField extends FormField {
  override type?: string = 'date';
  onValueChange: Function;
  format: string = "yy-mm-dd"
  constructor(
    translate: any,
    name: string,
    isEditMode: boolean,
    data: any,
    defaultData: any,
    validation?: { required?: boolean; minlength?: number },
    errorText?: { required?: string; minlength?: string }
  ) {
    super(translate);

    this.name = name;
    this.label = `${name}_TC`;
    this.isEditMode = isEditMode;
    this.data = data;
    this.defaultData = defaultData;
    this.value = this.getValue();

    // this.validation = validation
    // this.errorText = errorText
  }

  private getValue(): any {
    return this.isEditMode ? this.data[this.name] : this.defaultData[this.name];
  }

  onChange(onValueChange: Function) {
    this.onValueChange = onValueChange.bind(this);
    return this;
  }

  addFormat(format:string){
    this.format = format;
    return this;
  }

  toObject() {
    return {
      type: this.type,
      name: this.name,
      label: this.translate.instant(this.label),
      yy: this.format,
      placeholder: this.translate.instant('formPlaceholder_SC', {
        label: this.translate.instant(this.label),
      }),
      value: this.value,
      fieldWidth: this.fieldWidth,
      validation: this.validation,
      errorText: this.errorText,
      onValueChange: this.onValueChange,
      variant: this.variant
    };
  }
}
