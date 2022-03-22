import {Component} from '@angular/core';
import {UserService} from "./_shared/services/user.service";
import {AuthService} from "./_shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  router: any;
  title = 'stud-food';
  routeDontShowMobileBar = ['/feedback', '/add-money-in-app', '/account-details/edit-phone-number', '/account-details/edit-display-name']

  constructor(public userService: UserService, public authService: AuthService, public _router: Router) {
  }

  isRouteToDontShow() {
    if (this.routeDontShowMobileBar.includes(this._router.url)) {
      return false;
    }
    return true;
  }


  isMobileDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // true for mobile device
      return true;
    } else {
      // false for not mobile device
      return false;
    }
  }
}
