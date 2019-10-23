import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatTable, MatTableModule, MatToolbarModule, MatSnackBarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatDialog, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBar } from  '@angular/material';
import { SideNavComponent } from './side-nav/side-nav.component';
import { HomepageComponent } from './home/homepage/homepage.component';
import { HomeComponentDash } from './dashboard/home/home.component';
import { HomeComponentEmp } from './employees/home/home.component';
import { HomeComponentRep } from './reports/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideNavService } from './side-nav/side-nav.service';
import { LoginComponent } from './shared/dialog/login/login.component';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { AddEmployeeFormComponent } from './home/forms/add-employee-form/add-employee-form.component';
import { AddEditEmployeeDialogComponent } from './home/dialogs/add-edit-employee-dialog/add-edit-employee-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    HomepageComponent,
    HomeComponentDash,
    HomeComponentRep,
    HomeComponentEmp,
    HeaderComponent,
    LoginComponent,
    AddEmployeeFormComponent,
    AddEditEmployeeDialogComponent
  ],

  exports: [
    FormsModule,
    ReactiveFormsModule,
    AddEditEmployeeDialogComponent
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
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule
  ],
  providers: [SideNavService],
  bootstrap: [AppComponent],
  entryComponents: [LoginComponent, AddEditEmployeeDialogComponent]
})
export class AppModule { }
