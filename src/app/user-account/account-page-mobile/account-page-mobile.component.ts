import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../_shared/services/auth.service";
import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {UserService} from "../../_shared/services/user.service";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-account-page-mobile',
  templateUrl: './account-page-mobile.component.html',
  styleUrls: ['./account-page-mobile.component.scss']
})
export class AccountPageMobileComponent implements OnInit {

  userData: any;

  constructor(public router: Router, private authService: AuthService, private userService: UserService) {


  }

  ngOnInit(): void {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
       this.userData =data.payload.data();
    });
  }

  goToAccountDetails() {
    this.router.navigate(['account-details']);
  }

  signOut() {
    this.authService.signOut();
  }


}
