import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {SignUpComponent} from "./sign-up/sign-up.component";
import {SignInComponent} from "./sign-in/sing-in.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {AuthGuard} from "./_shared/guard/auth.guard";
import {MenuComponent} from "./menu/menu.component";
import {AdminPageComponent} from "./admin-page/admin-page.component";


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
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard], data: { role: 'user' }
  },
  {
    path: 'admin-page',
    component: AdminPageComponent,
    canActivate: [AuthGuard], data: { role: 'admin' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
