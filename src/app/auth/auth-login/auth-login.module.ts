import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthLoginComponent],
  exports: [AuthLoginComponent]
})
export class AuthLoginModule { }
