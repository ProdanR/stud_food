import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {OrderService} from "../../_shared/services/order.service";
import {map} from "rxjs/operators";
import {UserService} from "../../_shared/services/user.service";

@Component({
  selector: 'app-take-orders',
  templateUrl: './take-orders.component.html',
  styleUrls: ['./take-orders.component.scss']
})
export class TakeOrdersComponent implements OnInit {
  sent = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  inProgres = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  allOrdersThatCanHaveMissingProduct: any[]=[];

  sentOrders:any[]=[];
  inProgressOrders:any[]=[];
  finishedOrders:any[]=[];
  deliveredOrders:any[]=[];

  constructor(private orderService: OrderService, private  userService: UserService) {
    this.getAllOrders()
  }

  private getAllOrders() {
    this.orderService.getTodaysOrders().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(orders => {

      this.sortOrderByStatus(orders);
    });
  }

  private sortOrderByStatus(orders) {
    this.sentOrders=orders.filter(order=> order.status=='SENT');
    this.inProgressOrders=orders.filter(order=> order.status=='IN PROGRESS');
    this.finishedOrders=orders.filter(order=> order.status=='FINISHED');
    this.deliveredOrders=orders.filter(order=> (order.status=='DELIVERED'));
    this.allOrdersThatCanHaveMissingProduct=[...this.sentOrders, ...this.inProgressOrders];
  }


  ngOnInit(): void {
  }

  drop(event: any) {
    console.log(event.previousContainer.data[event.previousIndex]);
    console.log(event);
    let order= event.previousContainer.data[event.previousIndex];
    const newStatus=event.container.id;
    order.date=new Date();
    this.orderService.setOrderStatus(order,newStatus);
    this.userService.changeOrderStatus(order,newStatus);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }


  getOrderTime(sentOrder: any) {
    let date= new Date(sentOrder.date.seconds*1000);
    return date.toLocaleTimeString(["ro-RO"], {hour: '2-digit', minute:'2-digit'})
  }
}
