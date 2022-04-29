import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {UserService} from "../../_shared/services/user.service";
import {map} from "rxjs/operators";
import {ProductService} from "../../_shared/services/product.service";
import * as _ from 'lodash'

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
  stateAvailable='All';

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
      this.dataSource.data = this.allProducts;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
    let filtredData;
    if (target.value.length >= 3) {
      filtredData = _.filter(this.dataSource.filteredData, (item: any) => {
        return item.title.toLowerCase().includes(target.value.toLowerCase());
      });
    } else filtredData = this.apiResponse;
    this.dataSource = new MatTableDataSource(filtredData);
    this.dataSource.filteredData = filtredData;
  }

  onCategoryChange(category: any) {
    let filtredData;
    if (category !== 'All') {
      filtredData = _.filter(this.dataSource.filteredData, (item: any) => {
        return item.category === category;
      });
    } else filtredData = this.apiResponse;
    this.dataSource = new MatTableDataSource(filtredData);
    this.dataSource.filteredData = filtredData;
  }

  onAvailableChange(state: any) {
    this.stateAvailable=state;
    let filtredData;
    if (state !== 'All') {
      filtredData = _.filter(this.dataSource.filteredData, (item: any) => {
        if (state === 'Available')
          return item.available === true;
        else
          return item.available === false;
      });
    } else filtredData = this.apiResponse;
    this.dataSource = new MatTableDataSource(filtredData);
    this.dataSource.filteredData = filtredData;
  }


}
