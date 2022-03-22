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
import {FormsModule} from "@angular/forms";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { MenuComponent } from './menu/menu.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatChipsModule} from "@angular/material/chips";
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminUsersEditComponent } from './admin-users-edit/admin-users-edit.component';
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

  ],
    imports: [
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
        MatTabsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
