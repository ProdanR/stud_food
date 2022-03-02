import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_shared/services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: any = {};

  constructor(private router: Router, public authService: AuthService, private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
  }

  signIn() {
    this.authService.signIn(this.user);
  }
}
