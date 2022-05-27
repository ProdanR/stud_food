import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sing-in.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {AuthGuard} from "./_shared/guard/auth.guard";
import {MenuComponent} from "./menu/menu.component";
import {AdminPageComponent} from "./admin/admin-page/admin-page.component";
import {AccountPageMobileComponent} from "./user-account/account-page-mobile/account-page-mobile.component";
import {AccountDetailsComponent} from "./user-account/account-details/account-details.component";
import {EditPhoneNumberComponent} from "./user-account/account-details/edit-phone-number/edit-phone-number.component";
import {EditDisplayNameComponent} from "./user-account/account-details/edit-display-name/edit-display-name.component";
import {OpeningHoursComponent} from "./user-account/opening-hours/opening-hours.component";
import {FeedbackComponent} from "./user-account/feedback/feedback.component";
import {AddMoneyInAppComponent} from "./user-account/add-money-in-app/add-money-in-app.component";
import {ProductPageComponent} from "./menu/product-page/product-page.component";
import {AdminUsersEditComponent} from "./admin/admin-users-edit/admin-users-edit.component";
import {AddProductComponent} from "./admin/add-product/add-product.component";
import {ProductsListComponent} from "./admin/products-list/products-list.component";
import {OrderCategoriesComponent} from "./admin/order-categories/order-categories.component";
import {FavoriteProductsComponent} from "./favorite-products/favorite-products.component";
import {CartComponent} from "./cart/cart.component";
import {OrdersComponent} from "./orders/orders.component";
import {TakeOrdersComponent} from "./admin/take-orders/take-orders.component";
import {SearchProductComponent} from "./menu/search-product/search-product.component";


const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },

  {
    path: 'search-product',
    component: SearchProductComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },
  {
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },
  {
    path: 'menu-item/:id',
    component: ProductPageComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },
  {
    path: 'favorite-products',
    component: FavoriteProductsComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },

  {
    path: 'account-page-mobile',
    component: AccountPageMobileComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },
  {
    path: 'opening-hours',
    component: OpeningHoursComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },
  {
    path: 'add-money-in-app',
    component: AddMoneyInAppComponent,
    canActivate: [AuthGuard], data: {role: 'user'}
  },
  {
    path: 'account-details',
    children: [
      {
        path: '',
        component: AccountDetailsComponent,
      },
      {
        path: 'edit-phone-number',
        component: EditPhoneNumberComponent,
      },
      {
        path: 'edit-display-name',
        component: EditDisplayNameComponent,
      }
    ],
    canActivate: [AuthGuard], data: {role: 'user'}
  },


  {
    path: 'admin-page',
    component: AdminPageComponent,
    canActivate: [AuthGuard], data: {role: 'admin'}
  },
  {
    path: 'admin-users-list',
    component: AdminUsersEditComponent,
    canActivate: [AuthGuard], data: {role: 'admin'}
  },
  {
    path: 'products-list',
    component: ProductsListComponent,
    canActivate: [AuthGuard], data: {role: 'admin'}
  },
  {
    path: 'add-new-product',
    component: AddProductComponent,
    canActivate: [AuthGuard], data: {role: 'admin'}
  },
  {
    path: 'categories-order',
    component: OrderCategoriesComponent,
    canActivate: [AuthGuard], data: {role: 'admin'}
  },
  {
    path: 'take-orders',
    component: TakeOrdersComponent,
    canActivate: [AuthGuard], data: {role: 'admin'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
