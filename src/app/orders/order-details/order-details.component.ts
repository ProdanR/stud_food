import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../../_shared/services/order.service";
import {UserService} from "../../_shared/services/user.service";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId: any;
  order: any = {};
  dateToDisplay: any;

  screenHeigh;

  constructor(private router: Router, private route: ActivatedRoute, private orderService: OrderService, private userService: UserService) {
    this.screenHeigh = document.documentElement.clientHeight;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: any) => {
      this.orderId = this.route.snapshot.params['id'];
      this.getOrderById(this.orderId);
    })
  }

  private getOrderById(orderId: any) {
    this.orderService.getOrderById(orderId).snapshotChanges().subscribe(data => {
      this.order = data.payload.data();
      this.order.id=orderId;
      if(this.order.status=='SENT'){}
      this.dateToDisplay = new Date(this.order.date.seconds * 1000);
    });
  }


  getStatusColor(orderStatus: string) {
    switch (orderStatus) {
      case 'SENT':
        return '#00B0FF'
        break;
      case 'MISSING PRODUCT':
        return '#F9A826'
        break;
      case 'IN PROGRESS':
        return '#BF0089'
        break;
      case 'CANCELED':
        return '#F50057'
        break;
      case 'FINISHED':
        return '#00BFA6'
        break;
      case 'DELIVERED':
        return '#00BF2E'
        break;
    }
    return '#000000';
  }

  getStatusImage(orderStatus: string) {
    switch (orderStatus) {
      case 'SENT':
        return 'order_sent_status.svg'
        break;
      case 'MISSING PRODUCT':
        return 'order_missingProduct_status.svg'
        break;
      case 'IN PROGRESS':
        return 'order_loading_status.svg'
        break;
      case 'CANCELED':
        return 'order_canceled_status.svg'
        break;
      case 'FINISHED':
        return 'order_finished_status.svg'
        break;
      case 'DELIVERED':
        return 'order_delivered_status.svg'
        break;
    }
    return 'order_sent_status.svg';
  }

  setOrderStatusToCancel(order: any, status: string) {
    order.date=new Date();
    this.orderService.setOrderStatus(order,status);
    this.userService.changeOrderStatus(order,status);
  }
}
