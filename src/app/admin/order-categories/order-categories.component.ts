import {Component, OnInit} from '@angular/core';
import {map} from "rxjs/operators";
import {ProductService} from "../../_shared/services/product.service";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {
  allCategories: any[] = [];
  configSnackBar = new MatSnackBarConfig();

  constructor(private productService: ProductService, private _snackBar: MatSnackBar) {
    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.productService.getAllCategories().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      data.sort((a: any, b: any) => (a.order < b.order ? -1 : 1));
      this.allCategories = data;
    });
  };

  drop(event: any) {
    // const firstItemOrder=this.allCategories[event.previousIndex].order;
    // const secondItemOrder=this.allCategories[event.currentIndex].order;
    //
    // this.allCategories[event.previousIndex].order=secondItemOrder;
    // this.allCategories[event.currentIndex].order=firstItemOrder;

    moveItemInArray(this.allCategories, event.previousIndex, event.currentIndex);
    this.allCategories.map(category => {
      category.order = this.allCategories.indexOf(category) + 1;
    })
  }

  setNewCategoriesOrder() {
    this.productService.setNewCategoriesOrder(this.allCategories);
    console.log(this.allCategories);
  }

  deleteCategory(categoryId) {
    this.productService.getAllProductsWithCategory(categoryId).snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(products => {
      if (products.length == 0) {
        this.productService.deleteCategory(categoryId);
      } else this._snackBar.open("Cannot delete a category that contains products", "", this.configSnackBar);
    });
  }
}
