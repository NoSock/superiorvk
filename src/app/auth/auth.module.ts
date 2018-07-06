import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { AuthLoginModule } from './auth-login/auth-login.module';
import { AuthRegisterModule } from './auth-register/auth-register.module';
import { AuthRedirectModule } from './auth-redirect/auth-redirect.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthLoginModule,
    AuthRegisterModule,
    AuthRedirectModule
  ],
  declarations: [],
  exports: []
})
export class AuthModule { }
