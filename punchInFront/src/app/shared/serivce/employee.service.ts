import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
