import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardGeneralComponent } from './dashboard-general.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardGeneralComponent],
  exports: [DashboardGeneralComponent]
})
export class DashboardGeneralModule { }
