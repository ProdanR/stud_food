import { Component, OnInit } from '@angular/core';
import {AuthService} from "../_shared/services/auth.service";
import {UserService} from "../_shared/services/user.service";
import {map} from "rxjs/operators";
import {MetadataService} from "../_shared/services/metadata.service";

@Component({
  selector: 'app-top-tool-bar',
  templateUrl: './top-tool-bar.component.html',
  styleUrls: ['./top-tool-bar.component.scss']
})
export class TopToolBarComponent implements OnInit {
  list:any[]=[];
  metadata:any={};

  constructor( public userService: UserService, public authService: AuthService, private metadataService:MetadataService) {
    this.getMetadata();
  }

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

  private getMetadata() {
    this.metadataService.getMetadata().snapshotChanges().subscribe(data => {
      this.metadata=data[0].payload.doc.data();
      this.metadata.id=data[0].payload.doc.id;
    });
  }

  signOut() {

    this.authService.signOut();

  }


  setIsOpen() {
    this.metadata.isOpen=!this.metadata.isOpen;
    this.metadataService.closeOpenTheRestaurant(this.metadata);
  }
}
