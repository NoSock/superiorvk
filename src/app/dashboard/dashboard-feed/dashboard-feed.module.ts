import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardFeedRoutingModule } from './dashboard-feed-routing.module';
import { DashboardFeedComponent } from './dashboard-feed.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardFeedRoutingModule
  ],
  declarations: [DashboardFeedComponent]
})
export class DashboardFeedModule { }
