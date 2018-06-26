import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class VkAuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    this.router.navigateByUrl('auth');
    return false;
  }
}
