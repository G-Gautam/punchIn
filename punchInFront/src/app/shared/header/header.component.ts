import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../../side-nav/side-nav.component';
import { SideNavService } from 'src/app/side-nav/side-nav.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private sidenavService: SideNavService) { }

  drawer: MatSidenav;
  ngOnInit() {
    this.drawer = this.sidenavService.getSideNav();
  }

  toggle(){
    this.sidenavService.toggle();
  }


}
