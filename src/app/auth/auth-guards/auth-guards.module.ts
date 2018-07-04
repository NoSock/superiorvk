import { NgModule } from '@angular/core';
import {AuthTransportModule} from '../auth-transport/auth-transport.module';

@NgModule({
  imports: [
    AuthTransportModule
  ],
})
export class AuthGuardsModule { }
