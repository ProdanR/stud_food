import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../../_shared/services/product.service";
import {UserService} from "../../_shared/services/user.service";

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
  totalPrice=0;
  priceToIncreaseDecrease;

  currentUser:any;

  constructor(private route: ActivatedRoute, private productService: ProductService,private userService: UserService) {
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
      this.totalPrice=this.currentUser.hasDiscount? this.product.discountPrice: this.product.normalPrice;
      this.priceToIncreaseDecrease=this.totalPrice;
    });
  }

  increaseProductCount() {
    this.productCount=this.productCount+1;
    this.totalPrice+=this.priceToIncreaseDecrease;
  }

  decreaseProductCount() {
    if (this.productCount > 1) {
      this.productCount = this.productCount - 1;
      this.totalPrice-=this.priceToIncreaseDecrease;
    }
  }
}
