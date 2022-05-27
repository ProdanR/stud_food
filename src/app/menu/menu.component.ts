import {AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild} from '@angular/core';
import {MatChipList} from "@angular/material/chips";
import {interval} from "rxjs";
import {map, takeWhile, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ProductService} from "../_shared/services/product.service";
import {UserService} from "../_shared/services/user.service";
import {AuthService} from "../_shared/services/auth.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories = [];
  allProducts: any[] = [];
  productsByCategory: any[] = new Array();

  productsReady = false;
  showLoading = [1, 2, 3, 4];

  currentUser: any;

  //START for scroll declarations
  categoriesScroolBreakPoints = [];
  selectedCategory;
  desirePosition = -1;
  @ViewChild('chipListCategory') chipListCategory: MatChipList;
  offsetWidthChipList = [];
  chipListElement: any;
  firstScroll = true;

  //STOP for scroll declarations


  constructor(private router: Router, private productService: ProductService, private userService: UserService) {
    this.getCurrentUser();
  }

  ngOnInit(): void {
    // if (!localStorage.getItem('foo')) {
    //   localStorage.setItem('foo', 'no reload')
    //   location.reload()
    // } else {
    //   localStorage.removeItem('foo')
    // }
    this.getAllCategories();
    this.getAllProducts();
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
      this.splitProductsByCategory();
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
      data.sort((a: any, b: any) => (a.order < b.order ? -1 : 1));
      this.categories = data.map(category => {
        return category.name
      });
      this.selectedCategory = this.categories[0];
    });
  };


  private splitProductsByCategory() {
    let itemsProcessed = 0;
    let productsProcessed = 0;
    let nonEmptyCategories: any[] = [];


    this.categories.forEach(category => {
      itemsProcessed++;
      this.productsByCategory[category] = [];

      if (itemsProcessed === this.categories.length) {
        this.allProducts.forEach(product => {
          productsProcessed++;
          this.productsByCategory[product.category].push(product);
          if (!nonEmptyCategories.includes(product.category)) {
            nonEmptyCategories.push(product.category);
          }
          if (productsProcessed == this.allProducts.length) {
            this.categories = this.categories.filter(x => nonEmptyCategories.includes(x));
            this.selectedCategory = this.categories[0];
            console.log(this.categories);
            this.productsReady = true;
            setTimeout(() => {
              this.getcategoriesScroolBreakPoints();
              this.getOffsetWidthChipList();
            }, 1000);
          }
        });


      }

    });

  }

  //START for scroll functionality
  scrollTo(category: string) {
    let myCategory = document.getElementById(category);
    this.selectedCategory = category;
    // @ts-ignore
    let y = myCategory.getBoundingClientRect().top + window.pageYOffset - 110;
    if (y < 0) y = 0;
    y = Math.round(y);
    this.desirePosition = y;
    window.scrollTo({top: y, behavior: 'smooth'});

  }

  getcategoriesScroolBreakPoints() {
    // @ts-ignore
    this.categoriesScroolBreakPoints = this.categories.map(item => {
      let myCategory = document.getElementById(item);
      // @ts-ignore
      let y = myCategory.getBoundingClientRect().top + window.pageYOffset - 110;
      if (y < 0) y = 0;
      y = Math.round(y);
      return y;
    });
  }

  getOffsetWidthChipList() {
    console.log(this.categoriesScroolBreakPoints);
    this.chipListElement = document.getElementById(this.chipListCategory._uid);
    // @ts-ignore
    let chips = this.chipListCategory.chips._results;
    this.offsetWidthChipList = chips.map(chip => {
      console.log(this.chipListCategory);
      return chip._elementRef.nativeElement.offsetLeft;
    })
    console.log(this.offsetWidthChipList);
  }

  @HostListener('window:scroll', ['$event']) onScrollEvent($event) {
    let y = parseInt($event.path[1].pageYOffset);

    if (this.desirePosition !== -1 && this.desirePosition === y) {
      this.desirePosition = -1;
    }
    if (this.desirePosition === -1) {
      // @ts-ignore
      let oldIndex = this.categories.indexOf(this.selectedCategory);
      let index = this.getActiveCategoryIndex(y, oldIndex);

      this.selectedCategory = this.categories[index];

    }


  }

  getActiveCategoryIndex(y, oldIndex) {
    if (this.firstScroll) {
      this.getcategoriesScroolBreakPoints();
      this.firstScroll = false;
    }

    let categoryIndex;
    let categoryIndexSol = oldIndex;
    this.categoriesScroolBreakPoints.forEach(item => {
      if (((item + 100) >= y) && ((item - 100) <= y)) {

        categoryIndex = this.categoriesScroolBreakPoints.indexOf(item);
        console.log(categoryIndex);
        if (categoryIndex !== undefined && Math.abs(categoryIndex - oldIndex) === 1) {
          categoryIndexSol = categoryIndex;
          console.log(categoryIndexSol);
          let positionLeft = this.offsetWidthChipList[categoryIndexSol] - 100;
          this.chipListElement.scrollTo({left: positionLeft, behavior: 'smooth'});

        }
      }
    });

    // @ts-ignore
    return categoryIndexSol;
  }

  //STOP for scroll functionality


  goToSeachProduct() {
    this.router.navigate(['search-product']);
  }
}
