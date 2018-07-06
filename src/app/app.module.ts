import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import {AuthTransportModule} from './auth/auth-transport/auth-transport.module';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './auth/auth-transport/auth-state/auth-state';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './auth/auth-transport/auth-state/auth-effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthTransportModule,
    StoreModule.forRoot({auth: authReducer}),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
