import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardMessagesComponent} from './dashboard-messages.component';

const routes: Routes = [
  {path: '', component: DashboardMessagesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardMessagesRoutingModule { }
