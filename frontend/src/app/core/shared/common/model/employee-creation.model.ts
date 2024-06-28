export class EmployeeCreationModel {
  employee_name: string = '';
  designation: string = ''; // Dropdown
  department: string = ''; // Dropdown
  work_location: string = '';
  assets_managed: string = ''; // Array readonly
}

export class EmployeeDesignationModel {
  designation_name: string = '';
}


export class EmployeeDepartmentModel {
  department_name: string = '';
}
