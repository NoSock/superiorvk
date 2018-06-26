import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardGeneralModule } from './dashboard-general/dashboard-general.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardGeneralModule
  ],
  declarations: []
})
export class DashboardModule { }
