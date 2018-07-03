import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthLoginComponent} from '../auth-login/auth-login.component';
import {AuthRegisterComponent} from '../auth-register/auth-register.component';

const routes: Routes = [
  {path: 'login', component: AuthLoginComponent},
  {path: 'register', component: AuthRegisterComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class AuthRoutingModule { }
