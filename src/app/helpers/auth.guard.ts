import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const url = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    const user = this.authService.currentUserValue;
    if (user) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
    return false;
  }
}
