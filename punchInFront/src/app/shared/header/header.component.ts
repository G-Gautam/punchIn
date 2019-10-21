import { Component, OnInit, HostListener } from '@angular/core';
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

  mobile: boolean;

  constructor(private sidenavService: SideNavService, private userService: UserService, private matDialog: MatDialog) { }

  drawer: MatSidenav;
  ngOnInit() {
    this.drawer = this.sidenavService.getSideNav();
    this.mobile = false;
    if (window.screen.width < 768) { // 768px portrait
      this.mobile = true;
    }
  }

  toggle(){
    this.sidenavService.toggle();
  }

  clearLocalStorage(){
    localStorage.clear();
    window.location.reload();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 768) { // 768px portrait
      this.mobile = true;
    } 
    else{
      this.mobile = false;
    }
  }
}
