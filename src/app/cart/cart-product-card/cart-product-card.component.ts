import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../_shared/services/product.service";
import {CdkDragDrop, CdkDragEnd, CdkDragStart} from "@angular/cdk/drag-drop";
import {UserService} from "../../_shared/services/user.service";

@Component({
  selector: 'app-cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.scss']
})
export class CartProductCardComponent implements OnInit {
  @Input() productsToBuy;
  @Input() productToBuy;
  @Input() currentUser;
  dragPosition= {x: 0, y: 0};

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  decreaseProductCount(productToBuy: any) {
    const index=this.productsToBuy.indexOf(productToBuy)
    productToBuy.count= productToBuy.count-1;
    productToBuy.totalPrice= productToBuy.totalPrice-productToBuy.price;
    if(productToBuy.count===0){
      this.productsToBuy.splice(index,1);
    }
    else
      this.productsToBuy[index]=productToBuy;

    this.currentUser.cart.totalCount=this.currentUser.cart.totalCount-1;
    this.currentUser.cart.totalPrice=this.currentUser.cart.totalPrice-productToBuy.price;
    this.userService.updateCart(this.currentUser.cart, this.currentUser);
  }

  increaseProductCount(productToBuy: any) {
    const index=this.productsToBuy.indexOf(productToBuy)
    productToBuy.count= productToBuy.count+1;
    productToBuy.totalPrice= productToBuy.totalPrice+productToBuy.price;
    this.productsToBuy[index]=productToBuy;

    this.currentUser.cart.totalCount=this.currentUser.cart.totalCount+1;
    this.currentUser.cart.totalPrice=this.currentUser.cart.totalPrice+productToBuy.price;
    console.log(this.currentUser.cart);
    this.userService.updateCart(this.currentUser.cart, this.currentUser);
  }

  checkAndDelete($event: CdkDragEnd) {
    const xMove=$event.distance.x;
    console.log(this.dragPosition);
    if(xMove<-75) {
      this.dragPosition = {x: -400, y: 0};
      setTimeout(()=>{
        this.removeProductFromCart();
      }, 300);
    }
    else
      this.dragPosition = {x: 0, y: 0};
  }


  private removeProductFromCart() {
    const index=this.productsToBuy.indexOf(this.productToBuy)
    this.currentUser.cart.totalCount=this.currentUser.cart.totalCount-this.productToBuy.count;
    this.currentUser.cart.totalPrice=this.currentUser.cart.totalPrice-this.productToBuy.totalPrice;
    this.productsToBuy.splice(index,1);
    console.log(this.productToBuy);

    console.log(this.currentUser.cart);
    this.userService.updateCart(this.currentUser.cart, this.currentUser);
  }
}
