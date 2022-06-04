import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../_shared/services/auth.service";
import {UserService} from "../../../_shared/services/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-display-name',
  templateUrl: './edit-display-name.component.html',
  styleUrls: ['./edit-display-name.component.scss']
})
export class EditDisplayNameComponent implements OnInit {

  userData: any;

  configSnackBar = new MatSnackBarConfig();


  constructor(public router: Router, private authService: AuthService, private userService: UserService,private _snackBar: MatSnackBar) {
    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];

  }

  ngOnInit(): void {
    this.userService.getCurrentUser().snapshotChanges().subscribe(data => {
      this.userData = data.payload.data();
    });
  }

  updateUserDetails() {
    console.log(this.userData);
    this.userService.updateUser(this.userData).then(r=>{
      this._snackBar.open("Information updated successfully", "",this.configSnackBar);
    })
  }

}
