import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRegisterComponent } from './auth-register.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [AuthRegisterComponent],
  exports: [AuthRegisterComponent]
})
export class AuthRegisterModule { }
