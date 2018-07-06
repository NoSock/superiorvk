import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthTransportService} from '../auth-transport/auth-transport.service';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private auth: AuthTransportService) {}
  canActivate() {
    return this.auth.checkJwt().pipe(
      tap(
      console.log),
      tap(authenticated => {
        if (!authenticated) {
          this.router.navigateByUrl('auth');
        }
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanActivate {
  constructor(private router: Router,
              private auth: AuthTransportService) {}
  canActivate() {
    return this.auth.checkJwt().pipe(
      tap(authenticated => {
        if (authenticated) {
          this.router.navigateByUrl('');
        }
      }),
      map(auth => !auth)
    );
  }
}
