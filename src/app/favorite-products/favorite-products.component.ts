import {Component, OnInit} from '@angular/core';
import {UserService} from "../_shared/services/user.service";
import {ProductService} from "../_shared/services/product.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-favorite-products',
  templateUrl: './favorite-products.component.html',
  styleUrls: ['./favorite-products.component.scss']
})
export class FavoriteProductsComponent implements OnInit {
  currentUser: any;
  favoriteProducts: any[] = [];
  isReady = false;

  constructor(private userService: UserService, private productService: ProductService) {
    this.getCurrentUser();
  }

  private getCurrentUser() {
    this.userService.getCurrentUser().snapshotChanges().subscribe( data => {
      this.currentUser = data.payload.data();
      this.getFavoriteProducts();
    });
  }

  ngOnInit(): void {
  }

  private getFavoriteProducts() {
    this.favoriteProducts=[];
    this.isReady = false;
    if (this.currentUser.favoriteProducts.length == 0) this.isReady = true;
    this.currentUser.favoriteProducts.forEach(productId => {
      console.log(productId);
      this.productService.getProductById(productId).get().pipe(map((changes: any) =>
        ({id: productId, ...changes.data()})
      )).subscribe(product => {
        console.log(product);
        this.favoriteProducts.push(product);
        this.isReady = true;
      });
    })
  }

  haveProductsAtFavorite() {
    if (this.favoriteProducts.length == 0)
      return false;
    return true;
  }
}
