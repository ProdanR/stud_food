import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatChipList} from "@angular/material/chips";
import {interval} from "rxjs";
import {map, takeWhile, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ProductService} from "../_shared/services/product.service";
import {UserService} from "../_shared/services/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  categories = [];
  allProducts: any[] = [];
  productsByCategory: any[] = new Array();

  currentUser:any;

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
    this.categories.forEach(category => {
      this.productsByCategory[category] = [];
    });
    this.allProducts.forEach(product => {
      this.productsByCategory[product.category].push(product);
    });
    this.getcategoriesScroolBreakPoints();
    this.getOffsetWidthChipList();
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
    // @ts-ignore
    let chips = this.chipListCategory.chips._results;
    this.offsetWidthChipList = chips.map(chip => {
      console.log(this.chipListCategory);
      return chip._elementRef.nativeElement.offsetLeft;
    })
    console.log(this.offsetWidthChipList);
  }

  ngAfterViewInit(): void {
    this.getcategoriesScroolBreakPoints();
    this.getOffsetWidthChipList();
    console.log(this.categoriesScroolBreakPoints);
    this.chipListElement = document.getElementById(this.chipListCategory._uid);
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


  getDecimalPart(price: any) {
    return Math.trunc(price);
  }

  getFractionalPart(price: any) {
    let int_part = Math.trunc(price);
    let float_part = (price - int_part).toFixed(2).substring(2);
    return float_part;
  }


}
