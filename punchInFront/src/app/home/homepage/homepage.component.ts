import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoginComponent } from 'src/app/shared/dialog/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/shared/serivce/user.service';


@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private userService: UserService, private matDialog: MatDialog) { }

  user: any;
  companyTitle: string;
  isUserLoggedIn: boolean;

  ngOnInit(){
    if(!this.userService.isLoggedIn()){
      this.openDialog();
    }
    else{
      let userobj = localStorage.getItem('currentUser');
      this.user = JSON.parse(userobj);
      if(this.user == null){
        this.companyTitle = '';
        this.isUserLoggedIn = this.userService.isUserLoggedIn;
      }
      else{
        this.isUserLoggedIn = true;
        this.companyTitle = this.user.company;
      }
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.height = "50%";
    dialogConfig.width = "50%";
    dialogConfig.backdropClass = 'backdrop';
    let dialogRef = this.matDialog.open(LoginComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      this.user = value.data;
      this.companyTitle = value.data.company;
      if(value.data !== null){
        this.isUserLoggedIn = true;
      }
    });
  }
}
