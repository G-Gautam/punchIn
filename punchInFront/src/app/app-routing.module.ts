import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './home/homepage/homepage.component';
import { HomeComponentDash } from './dashboard/home/home.component';
import { HomeComponentEmp } from './employees/home/home.component';
import { HomeComponentRep } from './reports/home/home.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'dashboard', component: HomeComponentDash },
  { path: 'employees', component: HomeComponentEmp },
  { path: 'reports', component: HomeComponentRep },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
