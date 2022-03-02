import { Component, OnInit } from '@angular/core';
import {MatChipList} from "@angular/material/chips";
import {interval} from "rxjs";
import {takeWhile, tap} from "rxjs/operators";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  categories=["Supa", "Preparate pui","Preparate porc","Legume"];
  products=["carne","snitel","pizza","aluat","banane","apa"];
  constructor() { }

  ngOnInit(): void {
  }

  // scrollLeft(el: HTMLDivElement) {
  //   const animTimeMs = 400;
  //   const pixelsToMove = 315;
  //   const stepArray = [0.001, 0.021, 0.136, 0.341, 0.341, 0.136, 0.021, 0.001];
  //   interval(animTimeMs / 8)
  //     .pipe(
  //       takeWhile(value => value < 8),
  //       tap(value => el.scrollLeft -= (pixelsToMove * stepArray[value])),
  //     )
  //     .subscribe();
  // }
  //
  // scrollRight(el: HTMLDivElement) {
  //   const animTimeMs = 400;
  //   const pixelsToMove = 315;
  //   const stepArray = [0.001, 0.021, 0.136, 0.341, 0.341, 0.136, 0.021, 0.001];
  //   interval(animTimeMs / 8)
  //     .pipe(
  //       takeWhile(value => value < 8),
  //       tap(value => el.scrollLeft += (pixelsToMove * stepArray[value])),
  //     )
  //     .subscribe();
  // }
}
