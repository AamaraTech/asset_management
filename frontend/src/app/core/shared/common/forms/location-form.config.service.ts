import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocationModel } from '../model/location.model';
import { TabBuilder } from './core/builders/tab.builder';
import { InputField } from './core/builders/input.builder';
import { LocationEnum } from '../enum/location.enum';
import { DropdownField } from './core/builders/dropdown.builder';
import { EmployeeService } from 'src/app/components/employee-creation/services/employee.service';

const lat = 28.7041; // Set the initial latitude here
const lng = 77.1025;

@Injectable({
  providedIn: 'root',
})
export class LocationFormConfig {
  private translate = inject(TranslateService);
  private _employeeService = inject(EmployeeService);
  private employees = signal([]);
  public readonly LocationForm =
    () =>
     (dataFromComponent?:any, initialData?: LocationModel, isEditMode?: boolean, data?: any) => {
      initialData = new LocationModel();
      this.getEmployeesList();
      return [
        new TabBuilder(this.translate)
        .addTabFields([
        {
            tabHeader: this.translate.instant('Location_TC'),
            fields: [ 
                    new InputField(this.translate,LocationEnum.location_name,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                    new InputField(this.translate,LocationEnum.site,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                    // new InputField(this.translate,LocationEnum.co_ordinates,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                    new InputField(this.translate,LocationEnum.floor,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                    new InputField(this.translate,LocationEnum.room_name,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                    new InputField(this.translate,LocationEnum.room_number,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
                    new DropdownField(this.translate,LocationEnum.location_incharge, isEditMode, data, initialData)
                    .addFieldWidth('45%')
                    .addKeyValueLabel('employee_name', 'id')
                    .getOptions(this.employees)
                    .toObject(),
                    new InputField(this.translate,LocationEnum.description,isEditMode,data,initialData).addFieldWidth('45%').toObject(),
            ],
        }
        ])
      ];
    };

    getEmployeesList(){
      this._employeeService.getEmployeeList().subscribe((employees)=>{
        this.employees.set((<any>employees)?.results);
      })
    }
}
