import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pairwise, startWith } from 'rxjs/operators';

@Component({
  selector: 'date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent implements OnInit {
  @Input() field: any = {};
  @Input() form: UntypedFormGroup | any;
  isReadOnly=true;
  minDateValue: Date;
  maxDateValue: Date;
  defaultDate = new Date()
  get isValid() { 
    return this.form?.controls[this.field.name].valid; 
  }
  get isDirty() { 
    return this.form?.controls[this.field.name].dirty; 
  }
  constructor() { }

  ngOnInit(): void {
    if (this.field.value) {
      this.form.get(this.field.name).setValue(new Date(this.field.value));
    }
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
            this.form.patchValue(value);
          }
        });
    }
  }

}
