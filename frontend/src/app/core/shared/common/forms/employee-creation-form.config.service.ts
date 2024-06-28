import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ItemCategoryModel } from '../model/item-category.model';
import { EmployeeCreationModel } from '../model/employee-creation.model';
import { TabBuilder } from './core/builders/tab.builder';
import { InputField } from './core/builders/input.builder';
import { EmployeeCreationEnum } from '../enum/employee-creation.enum';
import { DropdownField } from './core/builders/dropdown.builder';
import { forkJoin, of } from 'rxjs';
import { EmployeeService } from 'src/app/components/employee-creation/services/employee.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeCreationFormConfig {
  private translate = inject(TranslateService);
  private _employeeService = inject(EmployeeService);
  designations = signal([]);
  departments = signal([]);

  public readonly EmployeeCreationForm =
    () => (dataFromComponent?:any, initialData?: EmployeeCreationModel, isEditMode?: boolean, data?: any) => {
      initialData = new EmployeeCreationModel();

      forkJoin([this._employeeService.getEmployeeDesignationList(), this._employeeService.getEmployeeDepartmentList()])
        .subscribe(([designations, departments]) => {
          this.designations.set((<any>designations)?.results);
          this.departments.set((<any>departments)?.results);
        })

      return [
        new TabBuilder(this.translate)
          .addTabFields([
            {
              tabHeader: this.translate.instant('Employee_Creation_TC'),
              fields: [
                new InputField(this.translate, EmployeeCreationEnum.employee_name, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                new InputField(this.translate, EmployeeCreationEnum.employee_code, isEditMode, data, initialData).addFieldWidth('45%').toObject(),
                new DropdownField(this.translate,EmployeeCreationEnum.designation, isEditMode, data, initialData)
                  .addFieldWidth('45%')
                  .addSubfields(new InputField(this.translate, "designation_name", isEditMode, data, initialData.designation).toObject())
                  .addKeyValueLabel('designation_name', 'id')
                  .getOptions(this.designations)
                  .saveData(this.saveSubFormData.bind(this, 'designation_name'))
                  .toObject(),
                new DropdownField(this.translate, EmployeeCreationEnum.department, isEditMode, data, initialData)
                  .addFieldWidth('45%')
                  .addSubfields(new InputField(this.translate, "department_name", isEditMode, data, initialData.department).toObject())
                  .addKeyValueLabel('department_name', 'id')
                  .getOptions(this.departments)
                  .saveData(this.saveSubFormData.bind(this, 'department_name'))
                  .toObject(),
                new InputField(this.translate, EmployeeCreationEnum.work_location, isEditMode, data, initialData).addFieldWidth('45%').toObject()
              ],
            }
          ])
      ]
    }


  saveSubFormData(attribute: any, event: any, form: any) {
    form[attribute] = {};
    form[attribute]['id'] = null;
    form[attribute] = {
      ...form[attribute],
      ...event,
    };
    return of(form);
  }
}
