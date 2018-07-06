import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, UnAuthGuard } from '../auth/auth-guards/auth-guards';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: '../auth/auth.module#AuthModule',
    canActivate: [UnAuthGuard]
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
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
