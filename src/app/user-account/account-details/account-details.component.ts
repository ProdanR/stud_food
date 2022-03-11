import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../_shared/services/auth.service";
import {UserService} from "../../_shared/services/user.service";

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {

  userData: any;

  constructor(public router: Router, private authService: AuthService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      this.userData =data.payload.data();
    });
  }

  editPhoneNumber() {
    this.router.navigate(['./edit-phone-number']);
  }

  editDisplayName() {

  }
}
