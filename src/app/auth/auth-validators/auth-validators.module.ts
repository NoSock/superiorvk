import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NG_VALIDATORS} from '@angular/forms';
import {repeatValidator} from './auth-validators';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [{provide: NG_VALIDATORS, useExisting: repeatValidator, multi: true}]
})
export class AuthValidatorsModule { }
