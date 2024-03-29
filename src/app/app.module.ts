import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopToolBarComponent } from './top-tool-bar/top-tool-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatButtonModule} from "@angular/material/button";
import { SignInComponent } from './sign-in/sing-in.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { MenuComponent } from './menu/menu.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatChipsModule} from "@angular/material/chips";
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { AdminUsersEditComponent } from './admin/admin-users-edit/admin-users-edit.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { ToolBarMobileComponent } from './tool-bar-mobile/tool-bar-mobile.component';
import {MatTabsModule} from "@angular/material/tabs";
import { AccountPageMobileComponent } from './user-account/account-page-mobile/account-page-mobile.component';
import { AccountDetailsComponent } from './user-account/account-details/account-details.component';
import { EditPhoneNumberComponent } from './user-account/account-details/edit-phone-number/edit-phone-number.component';
import { EditDisplayNameComponent } from './user-account/account-details/edit-display-name/edit-display-name.component';
import { OpeningHoursComponent } from './user-account/opening-hours/opening-hours.component';
import { FeedbackComponent } from './user-account/feedback/feedback.component';
import { AddMoneyInAppComponent } from './user-account/add-money-in-app/add-money-in-app.component';
import {MatListModule} from "@angular/material/list";
import { ProductPageComponent } from './menu/product-page/product-page.component';
import {NgxPayPalModule} from "ngx-paypal";
import { DialogPayPalButtonsComponent } from './user-account/add-money-in-app/dialog-pay-pal-buttons/dialog-pay-pal-buttons.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AddProductComponent } from './admin/add-product/add-product.component';
import {MatSelectModule} from "@angular/material/select";
import { ProductsListComponent } from './admin/products-list/products-list.component';
import { OrderCategoriesComponent } from './admin/order-categories/order-categories.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { GetDecimalPartPipe } from './_shared/pipes/get-decimal-part.pipe';
import { GetFractionalPartPipe } from './_shared/pipes/get-fractional-part.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ProductCardComponent } from './menu/product-card/product-card.component';
import { FavoriteProductsComponent } from './favorite-products/favorite-products.component';
import { CartComponent } from './cart/cart.component';
import { CartProductCardComponent } from './cart/cart-product-card/cart-product-card.component';
import {MatRadioModule} from "@angular/material/radio";
import { OrdersComponent } from './orders/orders.component';
import { OrderCardComponent } from './orders/order-card/order-card.component';
import { TakeOrdersComponent } from './admin/take-orders/take-orders.component';
import { TakeOrdersCardComponent } from './admin/take-orders/take-orders-card/take-orders-card.component';
import {AngularFireMessaging, AngularFireMessagingModule} from "@angular/fire/compat/messaging";
import {MessagingService} from "./_shared/notification-messaging/messaging.service";
import {HttpClientModule} from "@angular/common/http";
import { SearchProductComponent } from './menu/search-product/search-product.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { PaymentHistoryComponent } from './user-account/payment-history/payment-history.component';
import { AdminFeedbackComponent } from './admin/admin-feedback/admin-feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    TopToolBarComponent,
    SignInComponent,
    SignUpComponent,
    ResetPasswordComponent,
    MenuComponent,
    AdminPageComponent,
    AdminUsersEditComponent,
    ToolBarMobileComponent,
    AccountPageMobileComponent,
    AccountDetailsComponent,
    EditPhoneNumberComponent,
    EditDisplayNameComponent,
    OpeningHoursComponent,
    FeedbackComponent,
    AddMoneyInAppComponent,
    ProductPageComponent,
    DialogPayPalButtonsComponent,
    AddProductComponent,
    ProductsListComponent,
    OrderCategoriesComponent,
    GetDecimalPartPipe,
    GetFractionalPartPipe,
    ProductCardComponent,
    FavoriteProductsComponent,
    CartComponent,
    CartProductCardComponent,
    OrdersComponent,
    OrderCardComponent,
    TakeOrdersComponent,
    TakeOrdersCardComponent,
    SearchProductComponent,
    OrderDetailsComponent,
    PaymentHistoryComponent,
    AdminFeedbackComponent,

  ],
    imports: [
        NgxPayPalModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        FormsModule,
        MatSnackBarModule,
        MatChipsModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatListModule,
        MatDialogModule,
        MatSelectModule,
        ReactiveFormsModule,
        DragDropModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),
        MatRadioModule,
        AngularFireMessagingModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
