import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from "../../_shared/services/product.service";
import {UserService} from "../../_shared/services/user.service";
import {MetadataService} from "../../_shared/services/metadata.service";

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product;
  @Input() currentUser;
  metadata:any={};
  constructor(private userService: UserService, private metadataService: MetadataService) {
    this.getMetadata();
  }



  ngOnInit(): void {
  }

  private getMetadata() {
    this.metadataService.getMetadata().snapshotChanges().subscribe(data => {
      this.metadata = data[0].payload.doc.data();
      this.metadata.id = data[0].payload.doc.id;
    });
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
