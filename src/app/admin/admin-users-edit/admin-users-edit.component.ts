import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../_shared/services/user.service";
import {map} from "rxjs/operators";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.scss']
})
export class AdminUsersEditComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  allUsers: any[] = [];
  dataSource = new MatTableDataSource(this.allUsers);
  displayedColumns: string[] = ['fullName', 'email','studentNumber', 'moneyInApp', 'hasDiscount','edit'];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(data => {
      this.allUsers = data;
      this.allUsers=[...data];
      this.dataSource.data = this.allUsers;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  updateUser(user) {
    this.userService.updateUser(user);
  }


  disableDiscountFromAllUsers() {
    this.userService.disableDiscountFromAllUsers();
  }

  doFilter(target: any) {
    console.log(target.value);
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }
}
