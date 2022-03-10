import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  userDetails: any;

  constructor(public router: Router, public authService: AuthService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.isLoggedIn()) {
      this.userDetails = JSON.parse(<any>localStorage.getItem('loggedUser'));
      console.log(this.userDetails);
      const userRoles = this.userDetails.roles;
      if (route.data.role && !userRoles.includes(route.data.role)) {
        return false;
      }
      return true;
    }

    this.router.navigate(['/sign-in']);
    return false;
  }

}
