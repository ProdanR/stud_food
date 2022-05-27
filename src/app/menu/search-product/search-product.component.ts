import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ProductService} from "../../_shared/services/product.service";
import {UserService} from "../../_shared/services/user.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.scss']
})
export class SearchProductComponent implements OnInit {

  currentUser: any;
  allProducts: any[] = [];

  filtredProducts: any[] = [];

  constructor(private router: Router, private productService: ProductService, private userService: UserService) {
    this.getCurrentUser();
    this.getAllProducts();
  }

  ngOnInit(): void {
  }

  private getCurrentUser() {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      this.currentUser = data.payload.data();
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.allProducts = data;
    });
  }

  searchProduct($event: any) {
    let word = $event.value;
    if (word.length >= 3) {
      this.filtredProducts = this.allProducts.filter(product => (product.title.includes(word) || product.description.includes(word)));
      console.log(this.filtredProducts);
    } else {
      this.filtredProducts = [];
    }
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }
}
