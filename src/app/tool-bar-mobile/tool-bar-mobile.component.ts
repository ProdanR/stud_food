import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tool-bar-mobile',
  templateUrl: './tool-bar-mobile.component.html',
  styleUrls: ['./tool-bar-mobile.component.scss']
})
export class ToolBarMobileComponent implements OnInit {
  selected = 0;

  buttons = ["restaurant_menu", "favorite", "shopping_basket", "list_alt", "account_circle"];

  constructor() {
  }

  ngOnInit(): void {
  }

  redirectTo(btn: string) {
    switch (btn) {
      case "restaurant_menu": {
        console.log("restaurant_menu")
        break;
      }
      case "favorite": {
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
        console.log("account_circle")
        break;
      }
      default: {
        console.log("restaurant_menu")
        break;
      }
    }
  }
}
