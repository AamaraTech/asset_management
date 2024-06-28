import { UrlConfig } from '../../../model/app.model';
import { FormField } from '../form-builder';

export class DropdownField extends FormField {
  subForm: FormField[] = new Array<FormField>();
  options: any[] = new Array<any>();
  optionLabel: string = 'name';
  optionValue: string = 'id';
  onValueChange: Function;
  bindOptionList:Function;
  saveDialogueData: Function;
  lazyDropdown:boolean=false;
  urlConfig:UrlConfig;
  override type?: string = 'dropdown';
  constructor(
    translate: any,
    name: string,
    isEditMode: boolean,
    data: any,
    defaultData: any,
    lazyDropdown?:boolean,
    validation?: { required?: boolean; minlength?: number },
    errorText?: { required?: string; minlength?: string }
  ) {
    super(translate);

    this.translate = translate;
    this.name = name;
    this.label = `${name}_TC`;
    this.isEditMode = isEditMode;
    this.data = data;
    this.defaultData = defaultData;
    this.value = this.getValue();
    this.lazyDropdown=lazyDropdown;
  }

  addSubfields?(field: FormField) {
    this.subForm.push(field);
    return this;
  }

  
  // addFieldWidth(fieldWidth:string){
  //   this.fieldWidth = fieldWidth;
  //   return this;
  // }

  getOptions(options){
    this.options = options;
    return this;
  }

  private getValue?(): any {
    return this.isEditMode ? this.data[this.name] : this.defaultData[this.name];
  }

  onChange(onValueChange:Function){
    this.onValueChange = onValueChange.bind(this);
    return this;
  }

  saveData(saveDialogueData:Function){
    this.saveDialogueData = saveDialogueData.bind(this);
    return this;
  }

  addKeyValueLabel(key , value){
    this.optionLabel = key;
    this.optionValue = value;
    return this;
  }

  getUrlConfig(urlConfig:UrlConfig){
    this.urlConfig=urlConfig;
    return this;
  }

  bindOption(bindOptionList:Function){
    this.bindOptionList = bindOptionList.bind(this);
    return this;
  }

  isReadOnlyField(isReadOnly){
    this.readonly = isReadOnly
    return this;
  }

  toObject(): any {
    return {
      type: this.type,
      name: this.name,
      label: this.translate.instant(this.label),
      placeholder: this.translate.instant('formPlaceholder_SC', {
        label: this.translate.instant(this.label),
      }),
      value: this.value,
      subForm: this.subForm,
      options: this.options,
      optionLabel: this.optionLabel,
      optionValue: this.optionValue,
      validation: this.validation,
      errorText: this.errorText,
      onValueChange: this.onValueChange,
      saveDialogueData: this.saveDialogueData,
      fieldWidth:this.fieldWidth,
      lazyDropdown:this.lazyDropdown,   // to create new dropdown option by api.
      urlConfig:this.urlConfig,        // url config to add new option or get options.
      bindOptionList:this.bindOptionList, // to return list from API
      autoDisplayFirst: true,
      hidden: this.hidden,
      readonly : this.readonly,
      variant: this.variant
    };
  }
}
