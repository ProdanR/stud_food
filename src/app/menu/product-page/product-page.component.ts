import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../../_shared/services/product.service";
import {UserService} from "../../_shared/services/user.service";
import {MessagingService} from "../../_shared/notification-messaging/messaging.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  screenHeigh;
  productId;
  product: any;
  productLoaded = false;

  productCount = 1;
  totalPrice = 0;
  priceToIncreaseDecrease;

  currentUser: any;

  constructor(private router: Router, private route: ActivatedRoute, private productService: ProductService, private userService: UserService,) {
    this.screenHeigh = document.documentElement.clientHeight;
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      this.currentUser = data.payload.data();

    });
  }

  ngOnInit(): void {
    // this.getProductId();
    this.route.paramMap.subscribe((params: any) => {
      this.productId = this.route.snapshot.params['id'];
      this.getProductById(this.productId);
    })

  }

  private getProductById(productId: any) {
    console.log(productId);
    this.productService.getProductById(productId).snapshotChanges().subscribe(data => {

      this.product = data.payload.data();
      console.log(data.payload);
      this.productLoaded = true;
      this.totalPrice = this.currentUser.hasDiscount ? this.product.discountPrice : this.product.normalPrice;
      this.priceToIncreaseDecrease = this.totalPrice;
    });
  }

  increaseProductCount() {
    this.productCount = this.productCount + 1;
    this.totalPrice += this.priceToIncreaseDecrease;

  }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount = this.productCount - 1;
      this.totalPrice -= this.priceToIncreaseDecrease;
    }
  }

  addProductToCart() {

    this.createNewUserCart();

    this.userService.updateCart(this.currentUser.cart, this.currentUser).then(() => {
      this.router.navigate(['menu']);
    });
  }

  private createNewUserCart() {
    let productToAdd: any = {};

    if (this.currentUser.cart.products.filter(product => product.id === this.productId).length !== 0) {
      const productIndex = this.currentUser.cart.products.map(product => {return product.id;}).indexOf(this.productId);
      this.currentUser.cart.products[productIndex].count = this.currentUser.cart.products[productIndex].count + this.productCount;
      this.currentUser.cart.products[productIndex].totalPrice = this.currentUser.cart.products[productIndex].totalPrice + this.totalPrice;
      this.currentUser.cart.totalPrice =this.currentUser.cart.totalPrice + this.totalPrice;
      this.currentUser.cart.totalCount = this.currentUser.cart.totalCount + this.productCount;
    } else {
      productToAdd.id = this.productId;
      productToAdd.title = this.product.title;
      productToAdd.image = this.product.photoUrl;
      productToAdd.count = this.productCount;
      productToAdd.price = this.priceToIncreaseDecrease;
      productToAdd.totalPrice = this.totalPrice;
      productToAdd.category = this.product.category;
      productToAdd.category_id = this.product.category_id;

      this.currentUser.cart.products.push(productToAdd);
      this.currentUser.cart.totalPrice += this.totalPrice
      this.currentUser.cart.totalCount = this.currentUser.cart.totalCount + this.productCount;
    }
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }
}
