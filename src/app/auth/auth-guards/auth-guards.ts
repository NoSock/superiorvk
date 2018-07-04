import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthTransportService} from '../auth-transport/auth-transport.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private auth: AuthTransportService) {}
  canActivate() {
    if (this.auth.isAuthenticated.value) {
      return true;
    } else {
      this.router.navigateByUrl('auth');
      return false;
    }
  }
}
