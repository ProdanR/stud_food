import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../_shared/services/user.service";
import {map} from "rxjs/operators";
import {ProductService} from "../../_shared/services/product.service";
import * as _ from 'lodash'
import {DatasourceBuilder} from "./data-builder";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  apiResponse: any[] = [];
  allProducts: any[] = [];
  dataSource = new MatTableDataSource(this.allProducts);
  displayedColumns: string[] = ['title', 'category', 'description', 'normalPrice', 'discountPrice', 'weight', 'available', 'edit', 'delete'];

  allCategories;

  searchTitle="";
  category="All";
  available="All";

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    this.productService.getAllProducts().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      console.log(data);
      this.apiResponse = data;
      this.allProducts = data;
      this.allProducts = [...data];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data=new DatasourceBuilder().withTableData(this.apiResponse)
        .withSearchTitle(this.searchTitle)
        .withCategory(this.category)
        .withAvailable(this.available)
        .init();
    });
  }

  getAllCategories() {
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

  editProduct(product) {
    let category = this.allCategories.filter(category => {
      return category.name === product.category;
    });
    product.category_id = category[0].id;
    this.productService.editProduct(product);
  }

  setCategoryIdToProduct(product, id) {
    console.log(id);
    product.category_id = id;
  }

  deleteProduct(productId) {
    this.productService.deleteProduct(productId);
  }

  makeAllProductsUnavailable() {
    this.productService.makeAllProductsUnavailable();
  }

  doTitleFilter(target: any) {
    this.searchTitle=target.value;
    this.dataSource.data=new DatasourceBuilder().withTableData(this.apiResponse)
      .withSearchTitle(this.searchTitle)
      .withCategory(this.category)
      .withAvailable(this.available)
      .init();
  }

  onCategoryChange(category: any) {
    this.category=category;
    this.dataSource.data=new DatasourceBuilder().withTableData(this.apiResponse)
      .withSearchTitle(this.searchTitle)
      .withCategory(this.category)
      .withAvailable(this.available)
      .init();
  }

  onAvailableChange(state: any) {
    this.available=state;
    this.dataSource.data=new DatasourceBuilder().withTableData(this.apiResponse)
      .withSearchTitle(this.searchTitle)
      .withCategory(this.category)
      .withAvailable(this.available)
      .init();
  }


}
