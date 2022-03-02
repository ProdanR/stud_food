import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_shared/services/auth.service";
import {UserService} from "../_shared/services/user.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-top-tool-bar',
  templateUrl: './top-tool-bar.component.html',
  styleUrls: ['./top-tool-bar.component.scss']
})
export class TopToolBarComponent implements OnInit {
  list:any[]=[];

  constructor( public userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().snapshotChanges().pipe(
      map((changes:any) =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.list=data;
    });
  }

  signOut() {

    this.authService.signOut();

  }


}
