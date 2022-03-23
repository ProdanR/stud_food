import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatChipList} from "@angular/material/chips";
import {interval} from "rxjs";
import {takeWhile, tap} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, AfterViewInit {
  categories = ["Supa", "Preparate pui", "Preparate porc", "Legume", "Desert", "Paste", "Bauturi"];
  products = ["carne", "snitel", "pizza", "aluat", "banane", "apa"];

  //START for scroll declarations
  categoriesScroolBreakPoints = [];
  selectedCategory;
  desirePosition = -1;
  @ViewChild('chipListCategory') chipListCategory: MatChipList;
  offsetWidthChipList = [];
  chipListElement: any;
  firstScroll = true;

  //STOP for scroll declarations

  constructor() {
  }

  ngOnInit(): void {
    this.selectedCategory = this.categories[0];
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

}
