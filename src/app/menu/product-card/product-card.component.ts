import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../_shared/services/product.service";
import {UserService} from "../../_shared/services/user.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  @Input() currentUser;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  addOrRemoveFromFavourite() {
    if (this.currentUser.favoriteProducts.includes(this.product.id)) {
      const index = this.currentUser.favoriteProducts.indexOf(this.product.id);
      this.currentUser.favoriteProducts.splice(index, 1);
    } else {
      this.currentUser.favoriteProducts.push(this.product.id);
    }

    this.userService.addOrRemoveFromFavourite(this.currentUser, this.product.id);
  }

  isFavoriteProduct() {
    // console.log(this.product.id);
    if(this.currentUser.favoriteProducts.includes(this.product.id))
      return true;
    return false;
  }
}
