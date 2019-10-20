import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
    return this.http.get('api/user/'+ password + '/'+username).pipe(
      catchError(e => throwError(e))
      );
  }

  setUser(user: any){
    this.isUserLoggedIn = true;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
