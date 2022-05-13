import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../_shared/services/product.service";
import {UserService} from "../_shared/services/user.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  currentUser:any;
  currentOrders:any=[];
  userOrders:any=[];


  constructor(private router: Router, private productService: ProductService, private userService: UserService) {
    this.getCurrentUser();

  }

  ngOnInit(): void {

  }

  private getCurrentUser() {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      this.currentUser = data.payload.data();
      // this.currentOrders = this.currentUser.currentOrders;
      // this.currentOrders.sort((a: any, b: any) => (a.date < b.date) ? 1 : -1)
      this.getOrderHistory();
    });
  }

  private getOrderHistory() {
    this.userService.getOrderHistory(this.currentUser.uid).snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.userOrders=data;
      this.userOrders.sort((a: any, b: any) => (a.order.date < b.order.date) ? 1 : -1);
      console.log(this.userOrders)
    });
  }
}
