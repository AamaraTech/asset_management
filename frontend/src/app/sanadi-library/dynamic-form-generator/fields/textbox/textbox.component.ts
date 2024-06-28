import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pairwise, startWith } from 'rxjs/operators';

@Component({
  selector: 'textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: UntypedFormGroup | any;
  @Input() rows: any;
  @Input() dataSource: any = [];
  display: boolean = false;


  get isValid() {
    return this.form?.controls[this.field.name].valid;
  }
  get inValid() {
    return this.form?.controls[this.field.name].invalid;
  }
  get isDirty() {
    return this.form?.controls[this.field.name].dirty;
  }
  get isTouched() {
    return this.form?.controls[this.field.name].touched;
  }
  get isError() {
    return Object.keys(this.form?.controls[this.field?.name]?.errors)?.length;
  }
  get errorText() {
    let errorText = '';
    if (Object.keys(this.form?.controls[this.field?.name]?.errors)?.length > 0) {
      Object.keys(this.form?.controls[this.field.name].errors).forEach((validation) => {
        if (this.field?.errorText?.hasOwnProperty(validation)) {
          errorText += this.field?.errorText[validation] + ', ';
        }
      })
    }
    return errorText ? errorText : this.field?.errorText ? this.field?.errorText : 'This field is invalid';
  }

  constructor() { }

  ngOnInit(): void {
    this.onValueChanges();
  }

  onValueChanges() {
    if (typeof (this.field.onValueChange) === 'function') {
      this.form.get(this.field.name)
        .valueChanges
        .pipe(debounceTime(500), startWith(null), distinctUntilChanged(), pairwise())
        .subscribe(([prev, next]: [any, any]) => {
          const value = this.field?.onValueChange(prev, next, this.form.value);
          if (value) {
            this.form.patchValue(value)
          }
        });
    }
  }

  showDialog() {
    this.display = true;
    this.field?.getFieldsName(this.field?.name)
    // console.log('check', this.field?.name)
  }

  saveDialogueData(event: any) {
    this.field?.saveDialogueData(event);
    this.display = true;
  }

  
}
