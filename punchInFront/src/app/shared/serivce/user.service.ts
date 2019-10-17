import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn: boolean;
  username: string;

  constructor(private http: HttpClient) { }

  isLoggedIn(){
    return this.isUserLoggedIn;
    // var response = this.http.get('api/allusers');
    // return response;
  }

  login(username: string, password: string){
    return this.http.get('api/user/'+ password + '/'+username);
  }

  setUser(username: string){
    this.isUserLoggedIn = true;
    this.username = username;
  }
}
