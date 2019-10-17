import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { SideNavService } from 'src/app/side-nav/side-nav.service';
import { MatSidenav, MatDialogConfig, MatDialog } from '@angular/material';
import { UserService } from '../serivce/user.service';
import { LoginComponent } from '../../shared/dialog/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sidenavService: SideNavService, private userService: UserService, private matDialog: MatDialog) { }

  drawer: MatSidenav;
  ngOnInit() {
    this.drawer = this.sidenavService.getSideNav();
    this.userService.isLoggedIn(false).subscribe((data: any) => {
      console.log(data);
    })
  }

  toggle(){
    this.sidenavService.toggle();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.height = "50%";
    dialogConfig.width = "50%";
    dialogConfig.backdropClass = 'backdrop';
    this.matDialog.open(LoginComponent, dialogConfig);
  }


}
