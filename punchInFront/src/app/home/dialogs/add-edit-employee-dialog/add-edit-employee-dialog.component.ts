import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { EmployeeService } from 'src/app/shared/serivce/employee.service';

@Component({
  selector: 'app-add-edit-employee-dialog',
  templateUrl: './add-edit-employee-dialog.component.html',
  styleUrls: ['./add-edit-employee-dialog.component.css']
})
export class AddEditEmployeeDialogComponent implements OnInit {

  employee: any;
  name: string;
  salary: string;

  constructor(public dialogRef: MatDialogRef<AddEditEmployeeDialogComponent>, private snackBar: MatSnackBar, private employeeService: EmployeeService, @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.employee = data;
    this.name = this.employee.employee.name;
    this.salary = this.employee.employee.salary;
  }

  ngOnInit() {
    
  }

  editEmployee(dum){
    console.log("AH")
  }
  cancel(){
    this.dialogRef.close();
  }
}
