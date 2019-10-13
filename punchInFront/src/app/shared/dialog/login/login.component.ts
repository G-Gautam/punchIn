import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoginComponent>, private formBuilder: FormBuilder) { }

  loginForm: FormGroup;
  titleAlert: string = "This field is required";

  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, this.checkPassword])
    })
  }

  checkPassword(control){
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;  
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? {
      'requirements': true} : null;
  }
  close() {
    this.dialogRef.close();
  }
}
