import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoginComponent } from 'src/app/shared/dialog/login/login.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit() {
    this.openDialog();
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
