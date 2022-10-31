import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../_shared/services/product.service";
import {UserService} from "../_shared/services/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MetadataService} from "../_shared/services/metadata.service";
import {OrderService} from "../_shared/services/order.service";
import {MessagingService} from "../_shared/notification-messaging/messaging.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  currentUser: any;
  productsToBuy: any[] = [];
  eatWhere: any = null;
  payMethod: any = null;
  specialMentions='';

  private metadata: any;

  configSnackBar = new MatSnackBarConfig();
  private screenHeigh: number;

  isReady=false;


  constructor(private router: Router, private _snackBar: MatSnackBar, private productService: ProductService, private userService: UserService, private metadataService: MetadataService, private orderService: OrderService, private messagingSerive: MessagingService) {
    this.screenHeigh = document.documentElement.clientHeight;
    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];

    this.getCurrentUser();
    this.getMetadata();
  }

  ngOnInit(): void {
    this.messagingSerive.requestPermisionIfDoesntExist();
  }

  private getCurrentUser() {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      this.currentUser = data.payload.data();
      this.productsToBuy = this.currentUser.cart.products;
      this.isReady=true;
    });
  }

  haveProductsInCart() {
    if (this.currentUser?.cart.products.length == 0)
      return false;
    return true;
  }

  placeOrder() {
    if (this.currentUser.moneyInApp < this.currentUser.cart.totalPrice && this.payMethod == 'FromApp') {
      this._snackBar.open("Not enough money in the app", "", this.configSnackBar);
    } else
    if(this.currentUser.phoneNumber==undefined || this.currentUser.phoneNumber==null){
      this._snackBar.open("Please add your phone number!", "", this.configSnackBar);
    }
    else{
      this.createAndPlaceOrder();
    }
  }

  private createAndPlaceOrder() {
    let order:any = {};
    let client:any = {};

    console.log(this.currentUser);
    client.uid=this.currentUser.uid;
    client.fullName=this.currentUser.displayName;
    client.phoneNumber= this.currentUser.phoneNumber;
    client.notificationToken=this.currentUser.notificationToken;

    order.products=this.currentUser.cart.products;
    order.client=client;
    order.totalPrice=this.currentUser.cart.totalPrice;
    order.totalCount=this.currentUser.cart.totalCount;
    order.specialMentions=this.specialMentions;
    order.eatWhere=this.eatWhere;
    order.payMethod=this.payMethod;
    order.status='SENT';
    order.date=new Date();
    order.orderNumber=this.metadata.orderCountNumber;

    this.orderService.placeOrder(order).then( docRef=>{
      this.orderService.emptyUserCart(order);
      order.id=docRef.id;
      this._snackBar.open("Order placed successfully", "", this.configSnackBar);
      // this.currentUser.currentOrders.push(order);
      // this.userService.addCurrentOrders(this.currentUser.currentOrders, this.currentUser.uid);

      this.userService.addOrderToUser(order, this.currentUser.uid);

      if(order.payMethod=="FromApp"){
        let moneyToDecrement= 0-order.totalPrice;
        this.userService.updateMoneyInApp(moneyToDecrement,order.client.uid);
      }

      //asta va fi pus doar in vom avea un status final CANCELED, DELIVERE, (FINISED)
      // this.userService.addOrderToUserOrderHistory(order, this.currentUser.uid);
    });
    this.metadataService.incrementOrderCountNumber(this.metadata);
  }
  showError() {
    this._snackBar.open("Please select Pay Method and Where to Eat", "", this.configSnackBar);
  }

  private getMetadata() {
    this.metadataService.getMetadata().snapshotChanges().subscribe(data => {
      this.metadata=data[0].payload.doc.data();
      this.metadata.id=data[0].payload.doc.id;
    });
  }
}
