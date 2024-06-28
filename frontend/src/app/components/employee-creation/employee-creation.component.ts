import { Component, signal } from '@angular/core';
import { ServiceUrlConstants } from 'src/app/core/shared/utils/service-url-constants';
import { TableFilterComponent } from 'src/app/sanadi-library/table-filter/table-filter.component';

@Component({
  selector: 'sanadi-employee-creation',
  standalone: true,
  imports: [TableFilterComponent],
  templateUrl: './employee-creation.component.html',
  styleUrl: './employee-creation.component.scss'
})
export class EmployeeCreationComponent {
  employeeCreationConfig = signal({
    formName: 'employee-creation',
    pageTitle: 'Employee Creation',
    tableHeaders: [
      {
        label: 'employee_name_TC',
        field: 'employee_name',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'employee_code_TC',
        field: 'employee_code',
        matchModeOptions: [
          { label: 'Starts With', value: 'startsWith' },
          { label: 'Ends With', value: 'endswith' },
          { label: 'Contains', value: 'icontains' },
          { label: 'Equal', value: 'iexact' },
        ],
        isFilterRequired: true,
      },
      {
        label: 'designation_TC',
        isFilterRequired: false,
      },
      {
        label: 'department_TC',
        isFilterRequired: false,
      }
    ],
    tableBody: ['employee_name', 'employee_code', 'designation', 'department'],
    editable: true,
    url: {
      post: ServiceUrlConstants.EMPLOYEE_MASTER_CRUD,
      get: ServiceUrlConstants.EMPLOYEE_MASTER_CRUD,
      delete: ServiceUrlConstants.EMPLOYEE_MASTER_CRUD,
      UPDATE: '',
    },
    actions: [
      {
        label: '',
        icon: 'pencil',
        actionType: 'EDIT',
      },
      {
        label: '',
        icon: 'trash',
        actionType: 'DELETE',
      },
    ],
    dialogData: {},
    dialogConfig: {
      height: '60%',
      width: '50%'
    },
    isShowDialog: true,
  });
}
