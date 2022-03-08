import {Component, OnInit} from '@angular/core';
import {UserService} from "../_shared/services/user.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }


}
