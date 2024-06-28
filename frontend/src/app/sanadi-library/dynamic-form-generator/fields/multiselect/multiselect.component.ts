import { Component,Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pairwise, startWith } from 'rxjs';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss']
})
export class MultiselectComponent implements OnInit {

  selecteddata:any=[
  ]
  @Input() field: any = {};
  @Input() form: UntypedFormGroup | any;

  get isValid() { 
    return this.form?.controls[this.field.name].valid; 
  }
  get isDirty() { 
    return this.form?.controls[this.field.name].dirty; 
  }

  constructor( ) { }

  ngOnInit(): void {
    this.selecteddata = this.field.value;
    console.log("on multiselect ng on init",this.field)
    this.onValueChanges();
   
  }

  onSelect(){
    this.field.value=this.selecteddata;
    this.form.get(this.field.name).setValue(this.selecteddata);
    // console.log("selected data",event)
    // console.log("selected data1",this.selecteddata)
  }

  onValueChanges() {
    if (typeof (this.field.onValueChange) === 'function') {
      this.form.get(this.field.name)
        .valueChanges
        .pipe(debounceTime(500), startWith(null), distinctUntilChanged(), pairwise())
        .subscribe(([prev, next]: [any, any]) => {
          const value = this.field?.onValueChange(prev, next, this.form.value);
          // console.log('active');
          if (value) {
            this.form.patchValue(value);
          }
        });
    }
  }

  onClick(event: any) {
    if (typeof (this.field.onClick) === 'function') {
      this.field.onClick(event, this.form?.controls[this.field.name].value, this.form.value);
    }
  }

  onRemove(event: any) {
    console.log('event mlutiselect remove', event);
  }
  getSelectedItemsLabel(selectedItems: any[]) {
    console.log("on selected label",selectedItems)
    return ''
    // if (selectedItems.length === 0) {
    //   return "Select a column";
    // } else if (selectedItems.length === 1) {
    //   return selectedItems[0][this.field?.optionLabel];
    // } else {
    //   return selectedItems.map(item => item[this.field?.optionLabel]).join(", ");
    // }
  }
 
}
