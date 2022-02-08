import {Component, OnInit} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  color6 = "#353C7D";
  isChecked=false;
  user:any={};

  constructor() {
  }

  ngOnInit(): void {
  }

  showField(event: any) {
    this.isChecked=event.checked;
  }

  SignUp() {
    console.log(this.user);
  }
}
