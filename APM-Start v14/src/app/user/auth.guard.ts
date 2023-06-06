import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canLoad(route: Route): boolean {
    return this.checkedLoggedIn(route.path)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkedLoggedIn(state.url);
  }

  checkedLoggedIn(url: string | undefined): boolean {
    if(this.authService.isLoggedIn) {
      return true;
    }
    this.authService.redirectUrl = url
    this.router.navigate(['/login']);
    return false;
  }
  
}
