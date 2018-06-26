import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardMessagesRoutingModule } from './dashboard-messages-routing.module';
import { DashboardMessagesComponent } from './dashboard-messages.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardMessagesRoutingModule
  ],
  declarations: [DashboardMessagesComponent]
})
export class DashboardMessagesModule { }
