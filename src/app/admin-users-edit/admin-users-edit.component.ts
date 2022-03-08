import {AfterContentInit, AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../_shared/services/user.service";
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
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'roles', 'moneyInApp', 'hasDiscount','edit','delete'];

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
      this.allUsers=[...data,...data];
      this.dataSource.data = this.allUsers;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

  }

  updateUser(user) {
    this.userService.updateUser(user);
  }

  deleteUser(user) {

  }

  computeRoles(user, role: string, haveRole: boolean) {
    console.log(user);
    if(!haveRole){
      user.roles.push(role);
    }
    else{
      const index= user.roles.indexOf(role);
      user.roles.splice(index,1);
    }
    // console.log(user);
  }
}
