import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRegisterComponent } from './auth-register.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthTransportModule} from '../auth-transport/auth-transport.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AuthTransportModule
  ],
  declarations: [AuthRegisterComponent],
  exports: [AuthRegisterComponent]
})
export class AuthRegisterModule { }
