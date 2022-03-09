import { Component } from '@angular/core';
import {UserService} from "./_shared/services/user.service";
import {AuthService} from "./_shared/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stud-food';
  constructor( public userService: UserService, public authService: AuthService) { }
  isMobileDevice(){
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      // true for mobile device
      return true;
    }else{
      // false for not mobile device
      return false;
    }
  }
}
