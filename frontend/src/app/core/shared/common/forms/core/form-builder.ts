export abstract class FormField {
  type?: string = '';
  name?: string;
  label?: string;
  placeholder?: string;
  value?: any;
  validation?: {
    required?: boolean;
    minlength?: number;
    // Add more validation rules as needed
  };
  errorText?: {
    required?: string;
    minlength?: string;
    maxLength?: string;
    // Add more error messages as needed
  };
  isEditMode?: boolean;
  data?: any;
  defaultData?: any;
  readonly?:boolean;

  translate?: any;

  // used for Tab title
  tabHeader?: string;
  fieldWidth?: string;
  fields?: FormField[];
  hidden?: boolean;
  variant?: any;

  constructor(translate: any) {
    this.translate = translate;
  }

  validate?(required?: boolean, minLength?: number, maxLength?: number) {
    let valiationObj = {
      required: false,
      minLength: null,
      maxLength: null,
    };

    if (required) {
      valiationObj.required = required;
    }

    if (minLength) {
      valiationObj.minLength = minLength;
    }
    if (maxLength) {
      valiationObj.maxLength = maxLength;
    }
    this.validation = valiationObj;
    return this;
  }

  error?(minLength: string = 'one_number', maxLength: string = '') {
    let errorObj = {
      required: '',
      minLength: '',
      maxLength: '',
    };

    errorObj.required = this.translate.instant('formRequiredError_SC', {
      label: this.translate.instant(this.label),
    });
    if (minLength) {
      errorObj.minLength = this.translate.instant('formMaxLengthError_SC', {
        label: this.translate.instant(this.label),
        char: this.translate.instant(minLength),
      });
    }

    if (maxLength) {
      errorObj.minLength = this.translate.instant('formMaxLengthError_SC', {
        label: this.translate.instant(this.label),
        char: this.translate.instant(maxLength),
      });
    }

    this.errorText = errorObj;
    return this;
  }

  addFormFields?(fields: FormField[]) {
    
  }

  addFieldWidth?(fieldWidth:string){
    this.fieldWidth = fieldWidth;
    return this;
  }

  isFieldHidden?(hidden){
    this.hidden = hidden;
    return this;
  }

  variantType?(variant){
    this.variant = variant;
    return this;
  }

}
