import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {UserService} from "../_shared/services/user.service";

@Component({
  selector: 'app-tool-bar-mobile',
  templateUrl: './tool-bar-mobile.component.html',
  styleUrls: ['./tool-bar-mobile.component.scss']
})
export class ToolBarMobileComponent implements OnInit, OnDestroy{
  selected: string;
  event$:any;
  currentUser:any;
  productsCount=0;

  constructor( private router: Router, private userService: UserService) {

    this.getCurrentUser();
  }

  private getCurrentUser() {
    setTimeout(() => {
      this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
        this.currentUser = data.payload.data();
        this.productsCount= this.currentUser.cart.totalCount;
        console.log(this.currentUser);
        console.log(this.productsCount);
      });
    }, 1000);
  }

  ngOnInit(): void {
    this.redirectTo(this.router.url)
    console.log();
    this.event$ =this.router.events
      .subscribe(
        (event: any) => {
          console.log(event.url);
          if(event instanceof NavigationEnd) {
            this.redirectTo(event.url)
          }
        });
  }

  redirectTo(url: any) {
    console.log(url);
    if(url==='/menu'){
      this.router.navigate(['/menu']);
      this.selected='/menu'
    }
    if(url==='/favorite-products'){
      this.router.navigate(['/favorite-products']);
      this.selected='/favorite-products'
    }
    if(url==='/cart'){
      this.router.navigate(['/cart']);
      this.selected='/cart'
    }
    if(url==='/orders'){
      this.router.navigate(['/orders']);
      this.selected='/orders'
    }
    if(url==='/account-page-mobile'){
      this.router.navigate(['/account-page-mobile']);
      this.selected='/account-page-mobile'
    }
    if(url==='/account-details'){
      this.selected='/account-page-mobile'
    }
  }

  ngOnDestroy() {
    this.event$.unsubscribe();
  }

}
