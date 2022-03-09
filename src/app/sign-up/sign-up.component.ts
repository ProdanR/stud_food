import {Component, OnInit} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {AuthService} from "../_shared/services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  user:any={};

  constructor(private authService: AuthService,private afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
  }


  signUp() {
    console.log(this.authService.signUp(this.user));
  }
}
