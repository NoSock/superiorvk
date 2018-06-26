import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardGeneralComponent} from './dashboard-general/dashboard-general.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardGeneralComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboard-feed/dashboard-feed.module#DashboardFeedModule',
        pathMatch: 'full'
      },
      {
        path: 'feed',
        loadChildren: './dashboard-feed/dashboard-feed.module#DashboardFeedModule',
      },
      {
        path: 'messages',
        loadChildren: './dashboard-messages/dashboard-messages.module#DashboardMessagesModule'
      },
    ]
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
