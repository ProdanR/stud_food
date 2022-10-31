import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../_shared/services/product.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  newCategory:any;
  allCategories:any[]=[];
  configSnackBar = new MatSnackBarConfig();

  product:any={};

  fileToUpload:any;

  constructor(private productService:ProductService,private _snackBar: MatSnackBar) {
    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];
    this.product.description="";
    this.product.weight="";
  }

  ngOnInit(): void {
    this.getAllCategories();

  }

  addNewCategory() {
    this.productService.addNewCategory(this.newCategory);
    this.newCategory="";
    this._snackBar.open("Category added successfully", "",this.configSnackBar);
  }

  getAllCategories(){
    this.productService.getAllCategories().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.allCategories = data;
    });
  };

  addNewProduct() {
    this.productService.addNewProduct(this.product, this.fileToUpload)
  }

  onFileChosen($event: any) {
    this.fileToUpload = ($event.target).files[0];
    console.log(this.fileToUpload);
  }

  showError() {
    this._snackBar.open("Please add required information", "",this.configSnackBar);
  }
}
