import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA, MatSnackBarConfig } from '@angular/material';
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

  editEmployee(emp){
    let employee = this.employee.employee;
    employee.salary = emp.controls['salary'].value;
    employee.name = emp.controls['name'].value;
    this.employeeService.updateEmployee(employee).subscribe(
      result => {
        const config = new MatSnackBarConfig();
        config.panelClass = ['snackbar'];
        config.duration = 4000;
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        this.snackBar.open('Employee ' + this.name + ' edited successfully', null, config);
        this.cancel();
      },
      err =>{
        const config = new MatSnackBarConfig();
        config.panelClass = ['snackbar'];
        config.duration = 4000;
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        this.snackBar.open('Unsuccessful Operation', null, config);
      }
    );
  }
  cancel(){
    this.dialogRef.close();
  }
}
