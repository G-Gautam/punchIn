import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../serivce/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoginComponent>, private snackBar: MatSnackBar, private formBuilder: FormBuilder, private userService: UserService) { }

  loginForm: FormGroup;
  titleAlert: string = "This field is required";

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, [Validators.required, Validators.pattern(emailregex)]),
      password: new FormControl(null, [Validators.required, this.checkPassword])
    })
  }

  checkPassword(control) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? {
      'requirements': true
    } : null;
  }

  getErrorEmail() {
    return this.loginForm.get('username').hasError('required') ? 'Field is required' :
      this.loginForm.get('username').hasError('pattern') ? 'Not a valid username' : ""
  }

  close() {
    this.dialogRef.close();
  }

  login() {
    var username = this.loginForm.controls['username'].value;
    var password = this.loginForm.controls['password'].value;
    this.userService.login(username, password).subscribe((data: any) => {
      if (data !== null && data.length !== 0) {
        this.userService.setUser(data[0].username);
        this.close();
      }
      else {
        const config = new MatSnackBarConfig();
        config.panelClass = ['snackbar'];
        config.duration = 50000;
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        this.snackBar.open('Invalid Credentials!', null, config);
      }
    });
  }
}
