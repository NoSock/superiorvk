import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AuthTransportService} from './auth-transport.service';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [AuthTransportService]
})
export class AuthTransportModule { }
