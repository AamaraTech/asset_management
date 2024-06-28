import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Form, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable, debounceTime, distinctUntilChanged, pairwise, startWith } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @ViewChild('op') op: OverlayPanel;
  @Input() field: any = {};
  @Input() form: UntypedFormGroup;
  apiService = inject(ApiService);
  display: boolean = false;
  selectedValue: any;
  loading: boolean;
  tempOptions: any = [];
  constructor() { }

  get isValid() {
    return this.form?.controls[this.field?.name].valid;
  }
  get inValid() {
    return this.form?.controls[this.field?.name].invalid;
  }
  get isDirty() {
    return this.form?.controls[this.field?.name].dirty;
  }
  get isTouched() {
    return this.form?.controls[this.field?.name].touched;
  }
  get isError() {
    return Object.keys(this.form?.controls[this.field?.name]?.errors)?.length;
  }
  get errorText() {
    let errorText = '';
    if (Object.keys(this.form?.controls[this.field?.name]?.errors)?.length > 0) {
      Object.keys(this.form?.controls[this.field.name].errors).forEach((validation) => {
        if (this.field?.errorText?.hasOwnProperty(validation)) {
          errorText += this.field?.errorText[validation] + ' ';
        }
      })
    }
    return errorText ? errorText : this.field?.errorText ? this.field?.errorText : 'This field is invalid';
  }

  ngOnInit(): void {
    this.selectedValue = this.field?.value;
    this.onValueChanges();

  }

  getOptionValue(item: any, optionLabelList: any) {
    let optionValue = '';
    if (optionLabelList?.length) {
      optionLabelList.forEach((e: any) => {
        optionValue += item[e] + ' | ';
      })
    } else {
      optionValue = item[this.field?.optionLabel];
    }
    return optionValue;
  }

  getDropDownText(itemId: string) {
    let value = itemId;

    if (this.field?.options?.length) {
      const filteredValue = this.field?.options.filter((e: any) => e[this.field.optionValue] === itemId);
      value = (filteredValue?.length) ? this.getOptionValue(filteredValue[0], this.field.optionLabelList) : itemId;
    }
    // console.log("on change return value sujan",value)
    return value;
  }

  async onChangeHandler($event: any) {
    // console.log("on change dropdowj event",$event)
    if ($event?.value) {
      this.field.value = $event?.value?.id;
    }
  }

  onValueChanges() {
    if (typeof (this.field?.onValueChange) === 'function') {
      this.form.get(this.field.name)
        .valueChanges
        .pipe(debounceTime(500), startWith(null), distinctUntilChanged(), pairwise())
        .subscribe(async ([prev, next]: [any, any]) => {
          const value = await this.field?.onValueChange(prev, next, this.form.value);
          // console.log("out patch value dropdown",value)
          if (value) {
            // console.log("patch value dropdown",value)
            this.form.patchValue(value);
          }
        });
    }
  }

  showDialog() {
    this.display = true;
    this.field?.getFieldsName(this.field?.name);
    // console.log('check', this.field?.name)
  }

  async saveDialogueData(event: any) {
    if (this.field?.lazyDropdown) {
      const response$:{form:Form,data:any,attribute:any} = await this.field?.saveDialogueData(event, this.form.value);
      const savedRes = await this.saveDropdownOptionByAPI(response$?.data);
      await this.getDropdownOptionByAPI();
      let form = this.form.value;
      if (!response$?.form) {  // form should not send via saved dialogue data if option value depends on saved response.
        form[response$?.attribute] = savedRes[this.field.optionValue];
      } else {
        form = response$?.form;
      }
      this.form.patchValue(form);
      this.op.hide();
    }
    else {
      let response$ = <Observable<any>>this.field?.saveDialogueData(event, this.form.value);
      response$.subscribe((res) => {
        this.field?.options?.update((option) => {
          option.push(res[this.field.name])
          return option
        })
        this.form.patchValue(res);
      })
    }

  }


  handleDialogue(event: any) {
    this.field.closeDialogueEvent(event, this.form.value);
    return event;
  }

  async onFilterChangeHandler(event) { // get the searched keyword from the event object
    // console.log("event filter value", event.filter)
    if (typeof (this.field.onFilterChange) === 'function') {
      this.loading = true;
      let list = await this.field?.onFilterChange(event.filter, this.form.value);
      this.field.options = list;
      this.loading = false;
    }
  }

  async onClickDropdown(event) {
    if (this.field?.lazyDropdown) {
      await this.getDropdownOptionByAPI();
    }
    // if (typeof (this.field.onClickDropdown) === 'function') {
    //   this.loading = true;
    //   const list = await this.field?.onClickDropdown(event, this.form.value);
    //   this.field.options = list;
    //   this.loading = false;
    // }
  }

  formSubFields = []

  onClickDp(op) {
    op.toggle(event)
  }


  async saveDropdownOptionByAPI(data) {
    return new Promise((resolve) => {
      this.apiService
        .post(this.field?.urlConfig?.post?.url, data, this.field?.urlConfig?.post?.params).subscribe((res) => {
          resolve(res)
        })

    })
  }

  async getDropdownOptionByAPI() {
    return new Promise((resolve)=>{
      this.loading = true;
      this.apiService
        .get(this.field?.urlConfig?.get?.url, this.field?.urlConfig?.get?.params).subscribe(async (response: any) => {
          this.loading = false;
          await this.bindOptions(response);
          resolve(response);
        })
    })
  }

  async bindOptions(responseData){
    if (typeof (this.field.bindOptionList) === 'function') {
      const options = await this.field.bindOptionList(responseData);
      this.field.options.set(options)
    }
  }


}
