import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_shared/services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-sing-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  user: any={};

  constructor(public authService: AuthService,private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  signIn() {
    console.log(this.afAuth.authState);
    console.log(this.authService.signIn(this.user));
    console.log(this.afAuth.authState);
    console.log(this.authService.isLoggedIn());
  }
}
