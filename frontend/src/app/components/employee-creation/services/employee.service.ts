import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { EmployeeDepartmentModel, EmployeeDesignationModel } from 'src/app/core/shared/common/model/employee-creation.model';
import { ServiceUrlConstants } from 'src/app/core/shared/utils/service-url-constants';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiService = inject(ApiService);
  constructor() { }

  /**
   * 
   * Crud API for designation
   */

  getEmployeeDesignationList(): Observable<any> {
    return this.apiService.get(ServiceUrlConstants.DESIGNATION_CRUD);
  }


  createEmployeeDesignation(data:EmployeeDesignationModel): Observable<any> {
    return this.apiService.post(ServiceUrlConstants.DESIGNATION_CRUD,data);
  }


  /**
   * Crud API  for Department
   */
  
  getEmployeeDepartmentList(): Observable<any> {
    return this.apiService.get(ServiceUrlConstants.DEPARTMENT_CRUD);
  }

  createDepartment(data:EmployeeDepartmentModel): Observable<any> {
    return this.apiService.post(ServiceUrlConstants.DEPARTMENT_CRUD,data);
  }

  /**
   * Crud API's for Employee Master
   */
  
  getEmployeeList(): Observable<any> {
    return this.apiService.get(ServiceUrlConstants.EMPLOYEE_MASTER_CRUD);
  }


}
