import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VkAuthGuard } from './guards';
import { AppComponent } from '../app/app.component';
import {AuthComponent} from '../auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [VkAuthGuard]
  },
  {
    path: 'auth',
    component: AuthComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [],
  providers: [
    VkAuthGuard
  ]
})
export class AppRoutingModule { }
