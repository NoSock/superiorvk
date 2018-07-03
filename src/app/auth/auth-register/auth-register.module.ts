import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRegisterComponent } from './auth-register.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AuthRegisterComponent],
  exports: [AuthRegisterComponent]
})
export class AuthRegisterModule { }
