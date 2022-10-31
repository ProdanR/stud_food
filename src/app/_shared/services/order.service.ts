import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ordersRef: any;

  configSnackBar = new MatSnackBarConfig();

  constructor(private db: AngularFirestore, private storage: AngularFireStorage, private _snackBar: MatSnackBar, private router: Router, private userService: UserService) {
    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];

    this.ordersRef = db.collection('/orders');
  }

  getAllOrders(){
    return this.ordersRef;
  }

  getOrderById(orderId: any){
    const orderRef = this.ordersRef.doc(orderId);
    return orderRef;
  }

  getTodaysOrders(){
    let today = new Date();
    today.setHours(0,0,0,0);
    let timestampToday=today.getTime()/1000

    return this.db.collection('/orders',ref => ref.where('date', '>=', today));
  }

  placeOrder(order: any) {
    return this.ordersRef.add({
      products: order.products,
      client: order.client,
      totalPrice: order.totalPrice,
      totalCount: order.totalCount,
      specialMentions: order.specialMentions,
      eatWhere: order.eatWhere,
      payMethod: order.payMethod,
      orderNumber: order.orderNumber,
      status: order.status,
      date: order.date
    });

  }

   emptyUserCart(order: any) {
    const user=order.client
    const cart = {
      eatWhere: '',
      payMethod: '',
      specialMentions: '',
      totalCount: 0,
      totalPrice: 0,
      products: []
    }
    this.userService.updateCart(cart,user);
  }

  setOrderStatus(order: any, newStatus: any) {
    const orderRef = this.ordersRef.doc(order.id);
    orderRef.update({
      status: newStatus,
      date: order.date
    });
    this._snackBar.open("Order status changed successfully", "", this.configSnackBar);
  }
}
