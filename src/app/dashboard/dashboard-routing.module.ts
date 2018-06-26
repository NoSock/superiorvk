import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardGeneralComponent} from './dashboard-general/dashboard-general.component';

const routes: Routes = [
  {path: '', component: DashboardGeneralComponent, pathMatch: 'full'},
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
