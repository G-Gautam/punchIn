import { Component, ViewChild, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';
import { SideNavService } from './side-nav.service';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  @ViewChild('drawer', { static: true }) sideNav: MatSidenav
  mobile: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private sideNavService: SideNavService) { }

  ngOnInit() {
    this.sideNavService.setSidenav(this.sideNav);
    this.mobile = false;
    if (window.screen.width < 768) { // 768px portrait
      this.mobile = true;
    }
  }

  logout() {
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
