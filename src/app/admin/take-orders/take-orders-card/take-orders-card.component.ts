import {Component, Input, OnInit} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {OrderService} from "../../../_shared/services/order.service";
import {UserService} from "../../../_shared/services/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MessagingService} from "../../../_shared/notification-messaging/messaging.service";
import {ProductService} from "../../../_shared/services/product.service";

@Component({
  selector: 'app-take-orders-card',
  templateUrl: './take-orders-card.component.html',
  styleUrls: ['./take-orders-card.component.scss']
})
export class TakeOrdersCardComponent implements OnInit {
  @Input() orders;
  @Input() allOrders;

  missingProducts: any[] = [];
  configSnackBar = new MatSnackBarConfig();

  constructor(private orderService: OrderService, private userService: UserService, private _snackBar: MatSnackBar,private messagingService: MessagingService,private productService: ProductService) {
    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];
  }

  ngOnInit(): void {
  }

  getOrderTime(sentOrder: any) {
    let date = new Date(sentOrder.date.seconds * 1000);
    return date.toLocaleTimeString(["ro-RO"], {hour: '2-digit', minute: '2-digit'})
  }

  addToMissingProduct($event: MatSlideToggleChange, product: any) {
    if ($event.checked == false) {
      this.missingProducts.push(product);
    } else {
      const index = this.missingProducts.indexOf(product);
      this.missingProducts.splice(index, 1);
    }
  }

  setUnavailableProductsAndOrdersStatus(order: any) {
    if (order.status == "FINISHED" || order.status == "DELIVERED") {
      this._snackBar.open("Order is done so cannot have missing products", "", this.configSnackBar);
    } else {
      this.allOrders.forEach(order => {
        let haveMissingProducts = false;
        let newUserCart = this.createUserCartWithMissingProducts(order);
        let missingProductsFromOrder: any[] = [];
        order.products.forEach(product => {
          this.missingProducts.forEach(missingProduct => {
            if (missingProduct.id == product.id) {
              haveMissingProducts = true;
              //delete from cart and decrement totalCount
              let index = newUserCart.products.indexOf(product);
              newUserCart.products.splice(index, 1);
              newUserCart.totalCount = newUserCart.totalCount = product.count;
            }
          })
        });

        if (haveMissingProducts) {
          order.date = new Date();
          const newStatus = "MISSING PRODUCT";
          console.log(newUserCart);
          this.missingProducts.forEach(missingProduct =>{
            this.productService.setProductToUnavailable(missingProduct.id);
          })
          this.orderService.setOrderStatus(order, newStatus);
          this.userService.changeOrderStatus(order, newStatus);
          if (newUserCart.products.length != 0) {
            this.userService.updateCart(newUserCart, order.client);
            if(order.payMethod=="FromApp"){
              let moneyToIncrement= order.totalPrice;
              this.userService.updateMoneyInApp(moneyToIncrement,order.client.uid);
            }
          } else {
            if(order.payMethod=="FromApp"){
              let moneyToIncrement= order.totalPrice;
              this.userService.updateMoneyInApp(moneyToIncrement,order.client.uid);
            }
          }
        } else {
          this._snackBar.open("Order doesn't have missing products", "", this.configSnackBar);
        }
      });
    }


  }

  private createUserCartWithMissingProducts(order) {
    let cart: any = {
      eatWhere: order.eatWhere,
      payMethod: order.payMethod,
      products: [...order.products],
      specialMentions: order.specialMentions,
      totalCount: order.totalCount,
      totalPrice: order.totalPrice
    };
    return cart;
  }

  cancelOrder(order: any) {
    const newStatus = "CANCELED";
    if (order.status == "SENT" || order.status == "IN PROGRESS") {
      order.date = new Date();
      this.orderService.setOrderStatus(order, newStatus);
      this.userService.changeOrderStatus(order, newStatus);
      order.status=newStatus;
      this.messagingService.sendNotification(order).add(sth=> console.log(sth));

      if(order.payMethod=="FromApp"){
        let moneyToIncrement= order.totalPrice;
        this.userService.updateMoneyInApp(moneyToIncrement,order.client.uid);
      }

      this._snackBar.open("Order canceled successfully", "", this.configSnackBar);
    } else {
      this._snackBar.open("Order is done so cannot be canceled", "", this.configSnackBar);
    }

  }
}
