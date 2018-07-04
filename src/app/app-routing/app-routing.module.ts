import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardsModule} from '../auth/auth-guards/auth-guards.module';
import {AuthGuard} from '../auth/auth-guards/auth-guards';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule',
  },
  {
    path: 'dashboard',
    loadChildren: '../dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard],
  },
  {path: '**', redirectTo: 'dashboard'},
];

@NgModule({
  imports: [
    CommonModule,
    AuthGuardsModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  providers: []
})
export class AppRoutingModule { }
