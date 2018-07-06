import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from '../auth-login/auth-login.component';
import { AuthRegisterComponent } from '../auth-register/auth-register.component';
import {AuthRedirectComponent} from '../auth-redirect/auth-redirect.component';

const routes: Routes = [
  {path: 'login', component: AuthLoginComponent},
  {path: 'register', component: AuthRegisterComponent},
  {path: 'redirect', component: AuthRedirectComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
