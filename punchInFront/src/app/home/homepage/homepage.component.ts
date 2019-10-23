import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoginComponent } from 'src/app/shared/dialog/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/serivce/user.service';
import { EmployeeService } from 'src/app/shared/serivce/employee.service';
import { MatTable } from '@angular/material/table';


@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private userService: UserService, private matDialog: MatDialog, private employeeService: EmployeeService) { }

  user: any;
  companyTitle: string;
  isUserLoggedIn: boolean;
  employeeList: any[];
  displayedColumns: any[];
  mobile: boolean;

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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.height = "50%";
    if (window.screen.width < 768) {
      dialogConfig.width = "100%";
    }
    else{
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) { // 768px portrait
      this.mobile = true;
    }
    else {
      this.mobile = false;
    }
  }

  getAllEmployees(event: boolean) {
    this.employeeService.getEmployees(this.user.companyCode).subscribe((data: any) => {
      this.employeeList = [];
      this.table.renderRows();
      data.forEach(element => {
        let salary = element.salary.toFixed(2);
        element.salary = salary;
        this.employeeList.push(element);
        this.table.renderRows();
      });
    })
  }

  dummy(event){
    console.log(event);
  }
}
