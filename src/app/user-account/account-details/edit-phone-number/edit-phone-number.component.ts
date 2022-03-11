import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../_shared/services/auth.service";
import {UserService} from "../../../_shared/services/user.service";

@Component({
  selector: 'app-edit-phone-number',
  templateUrl: './edit-phone-number.component.html',
  styleUrls: ['./edit-phone-number.component.scss']
})
export class EditPhoneNumberComponent implements OnInit {


  userData: any;

  constructor(public router: Router, private authService: AuthService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      this.userData = data.payload.data();
    });
  }

  updateUserDetails() {
    this.userService.updateUser(this.userData);
  }
}
