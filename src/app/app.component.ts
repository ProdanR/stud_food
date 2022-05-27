import {Component, OnInit} from '@angular/core';
import {UserService} from "./_shared/services/user.service";
import {AuthService} from "./_shared/services/auth.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MessagingService} from "./_shared/notification-messaging/messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  router: any;
  title = 'stud-food';
  routeDontShowMobileBar = ['/feedback', '/add-money-in-app', '/account-details/edit-phone-number', '/account-details/edit-display-name', '/menu-item','/search-product']
  isLoggedIn=true;

  constructor(public userService: UserService, public authService: AuthService, public _router: Router, public afAuth: AngularFireAuth,private messagingService: MessagingService) {

  }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user=>  {
      if (user!=null) {
        this.isLoggedIn=true;
      } else {
        this.isLoggedIn=false;
      }
      console.log("CEVAAAAAAA " + this.isLoggedIn);
    });
    //this.messagingService.requestPermisionIfDoesntExist();
    // this.messagingService.listen();
  }



  isRouteToDontShow() {
    if (this._router.url.startsWith('/menu-item/')){
      return false;
    }

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
