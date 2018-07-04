import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AuthTransportModule} from '../auth-transport/auth-transport.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AuthTransportModule
  ],
  declarations: [AuthLoginComponent],
  exports: [AuthLoginComponent]
})
export class AuthLoginModule { }
