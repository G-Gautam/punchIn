import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule } from  '@angular/material';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomepageComponent } from './home/homepage/homepage.component';
import { HomeComponentDash } from './dashboard/home/home.component';
import { HomeComponentEmp } from './employees/home/home.component';
import { HomeComponentRep } from './reports/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideNavService } from './side-nav/side-nav.service';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomepageComponent,
    HomeComponentDash,
    HomeComponentRep,
    HomeComponentEmp,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    LayoutModule
  ],
  providers: [SideNavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
