import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-tool-bar-mobile',
  templateUrl: './tool-bar-mobile.component.html',
  styleUrls: ['./tool-bar-mobile.component.scss']
})
export class ToolBarMobileComponent implements OnInit {
  selected = 0;

  buttons = ["restaurant_menu", "favorite", "shopping_basket", "list_alt", "account_circle"];

  constructor( private router: Router) {
  }

  ngOnInit(): void {
  }

  redirectTo(btn: string) {
    switch (btn) {
      case "restaurant_menu": {
        this.router.navigate(['menu']);
        console.log("restaurant_menu")
        break;
      }
      case "favorite": {
        this.router.navigate(['favorite-products']);
        console.log("favorite")
        break;
      }
      case "shopping_basket": {
        console.log("shopping_basket")
        break;
      }
      case "list_alt": {
        console.log("list_alt")
        break;
      }
      case "account_circle": {
        this.router.navigate(['account-page-mobile']);
        break;
      }
      default: {
        console.log("restaurant_menu")
        break;
      }
    }
  }
}
