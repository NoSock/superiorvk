import { Component } from '@angular/core';
import {AuthTransportService} from '../auth/auth-transport/auth-transport.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';

  constructor(private auth: AuthTransportService,
              private router: Router){}

  logOut() {
    this.auth.logOut();
    this.router.navigateByUrl('/auth');
  }
}
