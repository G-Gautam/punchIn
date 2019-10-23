import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/serivce/employee.service';
import { UserService } from 'src/app/shared/serivce/user.service';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-employee-form',
  templateUrl: './add-employee-form.component.html',
  styleUrls: ['./add-employee-form.component.css']
})
export class AddEmployeeFormComponent implements OnInit {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  @Output() added = new EventEmitter<any>();
  @Input() editName: string;
  @Input() editSalary: string;

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': new FormControl(this.editName, [Validators.required]),
      'salary': new FormControl(this.editSalary, [Validators.required]),
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "You need to specify at least 3 characters";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  onSubmit() {
    let userobj = localStorage.getItem('currentUser');
    let company = JSON.parse(userobj).companyCode;
    this.employeeService.addEmployee(this.formGroup.controls['name'].value, this.formGroup.controls['salary'].value, company)
      .subscribe(
        response => {
          this.added.emit(this.formGroup);
        },
        err => {
          const config = new MatSnackBarConfig();
          config.panelClass = ['snackbar'];
          config.duration = 4000;
          config.verticalPosition = 'top';
          config.horizontalPosition = 'right';
          this.snackBar.open('Operation Unsuccessful', null, config);
        }
      );
  }

}
