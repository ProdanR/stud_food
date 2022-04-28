import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../_shared/services/user.service";

@Component({
  selector: 'app-dialog-pay-pal-buttons',
  templateUrl: './dialog-pay-pal-buttons.component.html',
  styleUrls: ['./dialog-pay-pal-buttons.component.scss']
})
export class DialogPayPalButtonsComponent implements OnInit {
  public payPalConfig ?: IPayPalConfig;
  public endpoint = "https://api.exchangerate-api.com/v4/latest/RON";
  public moneyInLei;
  public moneyInEur;


  constructor(public dialogRef: MatDialogRef<DialogPayPalButtonsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              public router: Router) {
    this.moneyInLei=this.data.value;
  }


  ngOnInit(): void {
    this.getResults();
    this.initConfig();
  }
  private getResults() {
    fetch(`${this.endpoint}`)
      .then(currency => {
        console.log(this.data.value);
        return currency.json();
      }).then(currency=>{
      let fromRate = currency.rates["RON"];
      let toRate = currency.rates["EUR"];
      this.moneyInEur = parseFloat(((toRate / fromRate) * this.moneyInLei).toFixed(2));
    });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AelBgjALXK0XAMHAlBQVfSptbVuK98TUUDEciBQx4LW6KYxxNaAcjLH_xKwAm8sR2r-eepCHoGgT5f4s',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value:  this.moneyInEur,
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value:  this.moneyInEur
                }
              }
            },
            items: [
              {
                name: 'Money for food in the app',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'EUR',
                  value:  this.moneyInEur,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: "paypal",
        layout: "vertical",
        color: "gold"
      },

      onApprove: (data, actions) => {
        this.userService.addMoneyInApp(this.moneyInLei);
        this.router.navigate(['account-page-mobile']);
        return actions.order.capture().then( (orderData)=> {
          // Successful capture! For dev/demo purposes:
          console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
          const transaction = orderData.purchase_units[0].payments.captures[0];
          alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
          this.userService.addTransactionToUser(transaction,this.moneyInLei);
          this.dialogRef.close();
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onShippingChange: (data, actions) => {
        console.log('OnShipingChange', data, actions);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  // ngAfterViewInit(): void {
  //   this.getResults();
  // }
}
