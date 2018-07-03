import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VkAuthGuard } from './guards';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule',
  },
  {
    path: 'dashboard',
    loadChildren: '../dashboard/dashboard.module#DashboardModule',
    canActivate: [VkAuthGuard],
  },
  {path: '**', redirectTo: 'dashboard'},
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
