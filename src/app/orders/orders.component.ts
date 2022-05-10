import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getStatusColor(orderStatus: string) {
    switch (orderStatus) {
      case 'SENT':
        return '#00B0FF'
        break;
      case 'MISSING PRODUCT':
        return '#F9A826'
        break;
    }
    return '#000000';
  }
}
