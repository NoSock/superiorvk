import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing/auth-routing.module';
import { AuthLoginModule } from './auth-login/auth-login.module';
import { AuthRegisterModule } from './auth-register/auth-register.module';
import { AuthValidatorsModule } from './auth-validators/auth-validators.module';
import { AuthTransportModule } from './auth-transport/auth-transport.module';
import { AuthGuardsModule } from './auth-guards/auth-guards.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AuthLoginModule,
    AuthRegisterModule,
    AuthValidatorsModule,
    AuthTransportModule,
    AuthGuardsModule
  ],
  declarations: [],
  exports: [AuthTransportModule]
})
export class AuthModule { }
