import {Component, Input, OnInit} from '@angular/core';
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {OrderService} from "../../../_shared/services/order.service";
import {UserService} from "../../../_shared/services/user.service";

@Component({
  selector: 'app-take-orders-card',
  templateUrl: './take-orders-card.component.html',
  styleUrls: ['./take-orders-card.component.scss']
})
export class TakeOrdersCardComponent implements OnInit {
  @Input() orders;
  @Input() allOrders;

  missingProducts: any[] = [];

  constructor(private orderService: OrderService, private userService: UserService) {
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
    console.log(this.missingProducts);
  }

  setUnavailableProductsAndOrdersStatus() {
    console.log(this.allOrders);
    // this.missingProducts.forEach(product=>{
    //   this.allOrders.forEach(order=>{
    //     if(order.products.some(orderProduct=> orderProduct.id == product.id)){
    //       console.log(order);
    //       let index= this.allOrders.indexOf(order);
    //       this.allOrders.splice(index,1);
    //       order.date=new Date();
    //       const newStatus="MISSING PRODUCT";
    //       this.orderService.setOrderStatus(order,newStatus);
    //       this.userService.changeOrderStatus(order,newStatus);
    //     }
    //   })
    // })

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
      console.log(order.orderNumber);
      if (haveMissingProducts) {
        order.date = new Date();
        const newStatus = "MISSING PRODUCT";
        console.log(newUserCart);
        // + set product to unavailable
        this.orderService.setOrderStatus(order, newStatus);
        this.userService.changeOrderStatus(order, newStatus);

        if (newUserCart.products.length != 0) {
          this.userService.updateCart(newUserCart, order.client);
        } else {
          console.log("trimite notificare");
        }
      }

    })


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
    this.orderService.setOrderStatus(order, newStatus);
    this.userService.changeOrderStatus(order, newStatus);
  }
}
