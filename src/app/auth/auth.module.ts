import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { AuthLoginModule } from './auth-login/auth-login.module';
import { AuthRegisterModule } from './auth-register/auth-register.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthLoginModule,
    AuthRegisterModule
  ],
  declarations: []
})
export class AuthModule { }
