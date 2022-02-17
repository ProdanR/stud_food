import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_shared/services/auth.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  emailResetPassword: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {

  }

  sendResetPasswordEmail() {
    this.authService.resetPassword(this.emailResetPassword);
  }
}
