import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../_shared/services/product.service";
import {UserService} from "../../_shared/services/user.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
  paymentHistory: any = [];
  isReady=false;

  constructor(private router: Router, private userService: UserService) {
    this.getCurrentUser();
  }

  ngOnInit(): void {
  }

  private getCurrentUser() {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      let currentUser: any = data.payload.data();
      this.getPaymentHistory(currentUser.uid);
    });
  }

  private getPaymentHistory(uid: any) {
    this.userService.getPaymentHistory(uid).snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.paymentHistory = data;
      console.log(this.paymentHistory);
      this.isReady=true;
    });
  }

}
