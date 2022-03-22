import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../_shared/services/auth.service";
import {UserService} from "../../_shared/services/user.service";

@Component({
  selector: 'app-add-money-in-app',
  templateUrl: './add-money-in-app.component.html',
  styleUrls: ['./add-money-in-app.component.scss']
})
export class AddMoneyInAppComponent implements OnInit {

  moneyAmount = [10, 20, 30, 40, 50, 75, 100];
  selected = 0;

  userData: any;
  moneyInAppToAdd: any = 10;

  constructor(public router: Router, private authService: AuthService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      this.userData = data.payload.data();
    });
  }


  goToPayment() {

  }

  changeMoneyInAppToAdd(amount: any, sel: any) {
    this.selected = sel;
    this.moneyInAppToAdd = amount;
  }

  chipColor(amount: number) {
    return 'red';
  }


  onAmountChange(target: any) {
    const amount = parseInt(target.value);
    if (this.moneyAmount.includes(amount)) {
      switch (amount) {
        case 10:
          this.selected = 0;
          break;
        case 20:
          this.selected = 1;
          break;
        case 30:
          this.selected = 2;
          break;
        case 40:
          this.selected = 3;
          break;
        case 50:
          this.selected = 4;
          break;
        case 75:
          this.selected = 5;
          break;
        case 100:
          this.selected = 6;
          break;
      }
    } else
      this.selected = -1;
    console.log(this.selected);
  }

  isFieldValid() {
    return this.moneyInAppToAdd>=10;
  }
}
