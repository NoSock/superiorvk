import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VkAuthGuard } from './guards';
import {AuthComponent} from '../auth/auth.component';
import {TestComponent} from '../test/test.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'dashboard',
    loadChildren: '../dashboard/dashboard.module#DashboardModule',
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  providers: [
    VkAuthGuard
  ]
})
export class AppRoutingModule { }
