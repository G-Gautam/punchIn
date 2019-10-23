import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  url:string;

  constructor(private httpClient: HttpClient) { 
    this.url = 'api/employee';
  }

  
  getEmployees(code: string){
    return this.httpClient.get(this.url + '/'+ code);
  }

  addEmployee(name: string, salary: string, company: string){
    let body = {
      name: name,
      salary: salary, 
      company: company
    }
    return this.httpClient.post<any>(this.url + '/employee', body);
  }

  removeEmployee(id: string){
    return this.httpClient.delete(this.url + '/empDel/' + id);
  }

  updateEmployee(emp: any){
    let body = {
      name: emp.name,
      salary: emp.salary
    }
    return this.httpClient.put(this.url + '/' + emp._id, body);
  }
}
