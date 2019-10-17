import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  isLoggedIn(temp: boolean){
    var response = this.http.get('api/allusers');
    return response;
  }
}
