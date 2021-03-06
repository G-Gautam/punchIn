import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoginComponent } from 'src/app/shared/dialog/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/serivce/user.service';
import { EmployeeService } from 'src/app/shared/serivce/employee.service';
import { MatTable } from '@angular/material/table';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AddEmployeeFormComponent } from '../forms/add-employee-form/add-employee-form.component';
import { AddEditEmployeeDialogComponent } from '../dialogs/add-edit-employee-dialog/add-edit-employee-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { expand } from 'rxjs/operators';


@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HomepageComponent implements OnInit {

  constructor(private userService: UserService, private matDialog: MatDialog, private employeeService: EmployeeService, private snackBar: MatSnackBar) { }

  user: any;
  companyTitle: string;
  isUserLoggedIn: boolean;
  employeeList: any[];
  displayedColumns: any[];
  mobile: boolean;
  expandedDetail: any[];

  @ViewChild(MatTable, { static: false }) table: MatTable<any>;


  ngOnInit() {
    this.employeeList = [];
    if (!this.userService.isLoggedIn()) {
      this.openDialog();
    }
    else {
      let userobj = localStorage.getItem('currentUser');
      this.user = JSON.parse(userobj);
      if (this.user == null) {
        this.companyTitle = '';
        this.isUserLoggedIn = this.userService.isUserLoggedIn;
      }
      else {
        this.isUserLoggedIn = true;
        this.companyTitle = this.user.company;
      }
    }
    this.mobile = false;
    if (window.screen.width < 768) { // 768px portrait
      this.mobile = true;
    }

    this.displayedColumns = ['Company', 'Name', 'Salary Rate', 'Actions'];
  }

  ngAfterViewInit() {
    if (this.isUserLoggedIn) {
      this.getAllEmployees(true);
    }
  }

  openDialog() {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.height = "50%";
    if (window.screen.width < 768) {
      dialogConfig.width = "100%";
    }
    else {
      dialogConfig.width = "50%";
    }
    dialogConfig.backdropClass = 'backdrop';
    let dialogRef = this.matDialog.open(LoginComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value.data !== null) {
        this.user = value.data;
        this.companyTitle = value.data.company;
        this.isUserLoggedIn = true;
        this.getAllEmployees(true);
      }
    });
  }

  editEmployee(employee) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.height = "50%";
    if (window.screen.width < 768) {
      dialogConfig.width = "100%";
    }
    else {
      dialogConfig.width = "50%";
    }
    dialogConfig.backdropClass = 'backdrop';
    dialogConfig.data = {
      'employee': employee
    }
    let dialogRef = this.matDialog.open(AddEditEmployeeDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value.data !== null) {
        this.user = value.data;
        this.companyTitle = value.data.company;
        this.isUserLoggedIn = true;
        this.getAllEmployees(true);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) { // 768px portrait
      this.mobile = true;
    }
    else {
      this.mobile = false;
    }
  }

  getAllEmployees(event) {
    this.employeeService.getEmployees(this.user.companyCode).subscribe((data: any) => {
      this.employeeList = [];
      this.table.renderRows();
      data.forEach(element => {
        let salary = element.salary.toFixed(2);
        let date = element.startDate.split("T")[0];
        element.startDate = date;
        element.salary = salary;
        this.employeeList.push(element);
        this.table.renderRows();
      });
    })
  }

  dummy(event) {
    console.log(event);
  }

  remove(employee) {
    if (confirm("Are you sure you want to delete " + employee.name)) {
      this.employeeService.removeEmployee(employee._id).subscribe((data: any) => {
        this.employeeList = [];
        this.table.renderRows();
        this.getAllEmployees(true);
        const config = new MatSnackBarConfig();
        config.panelClass = ['snackbar'];
        config.duration = 4000;
        config.verticalPosition = 'top';
        config.horizontalPosition = 'right';
        this.snackBar.open('Employee ' + employee.name + ' deleted successfully', null, config);
      })
    }
    else {
      return;
    }
  }
}
