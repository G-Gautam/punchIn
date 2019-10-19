import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn: boolean;
  username: string;
  user: any;

  constructor(private http: HttpClient) { }

  isLoggedIn(){
    if(localStorage.getItem('currentUser') !== null){
      this.isUserLoggedIn = true;
      return true;
    }
    return false;
  }

  login(username: string, password: string){
    let user = this.http.get('api/user/'+ password + '/'+username);
    return user;
  }

  setUser(user: any){
    this.isUserLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
