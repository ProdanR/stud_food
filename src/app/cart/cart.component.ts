import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../_shared/services/product.service";
import {UserService} from "../_shared/services/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

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
  specialMentions: any;

  configSnackBar = new MatSnackBarConfig();


  constructor(private router: Router, private _snackBar: MatSnackBar, private productService: ProductService, private userService: UserService) {
    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];

    this.getCurrentUser();
  }

  ngOnInit(): void {
  }

  private getCurrentUser() {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      this.currentUser = data.payload.data();
      this.productsToBuy = this.currentUser.cart.products;
    });
  }

  haveProductsInCart() {
    if (this.currentUser?.cart.products.length == 0)
      return false;
    return true;
  }


  decreaseProductCount(productToBuy: any) {
    const index = this.productsToBuy.indexOf(productToBuy)
    productToBuy.count = productToBuy.count - 1;
    productToBuy.totalPrice = productToBuy.totalPrice - productToBuy.price;
    if (productToBuy.count === 0) {
      this.productsToBuy.splice(index, 1);
    } else
      this.productsToBuy[index] = productToBuy;

    this.currentUser.cart.totalCount = this.currentUser.cart.totalCount - 1;
    this.currentUser.cart.totalPrice = this.currentUser.cart.totalPrice - productToBuy.price;
    this.productService.updateCart(this.currentUser.cart, this.currentUser);
  }

  increaseProductCount(productToBuy: any) {
    const index = this.productsToBuy.indexOf(productToBuy)
    productToBuy.count = productToBuy.count + 1;
    productToBuy.totalPrice = productToBuy.totalPrice + productToBuy.price;
    this.productsToBuy[index] = productToBuy;

    this.currentUser.cart.totalCount = this.currentUser.cart.totalCount + 1;
    this.currentUser.cart.totalPrice = this.currentUser.cart.totalPrice + productToBuy.price;
    console.log(this.currentUser.cart);
    this.productService.updateCart(this.currentUser.cart, this.currentUser);
  }

  placeOrder() {
    if(this.currentUser.moneyInApp<this.currentUser.cart.totalPrice && this.payMethod=='FromApp'){
      this._snackBar.open("Not enough money in the app", "", this.configSnackBar);
    }
    else{
      console.log('ok');
    }
  }

  showError() {
    this._snackBar.open("Please select Pay Method and Where to Eat", "", this.configSnackBar);
  }
}
