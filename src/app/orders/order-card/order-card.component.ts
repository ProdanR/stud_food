import {Component, Input, OnInit} from '@angular/core';
import {MetadataService} from "../../_shared/services/metadata.service";

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order;
  dateToDisplay:any;

  constructor() {

  }




  ngOnInit(): void {
    this.dateToDisplay= new Date(this.order.date.seconds*1000);
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

  slicedData(products: any) {
    return products.slice(0,3)
  }
}
