import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {ICreateOrderRequest, IPayPalConfig} from "ngx-paypal";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {UserService} from "../../../_shared/services/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

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

  configSnackBar = new MatSnackBarConfig();

  constructor(public dialogRef: MatDialogRef<DialogPayPalButtonsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private userService: UserService,
              public router: Router,
              private _snackBar: MatSnackBar) {
    this.moneyInLei=this.data.value;
    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];
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
      clientId: 'AYPBqnmv0jqWOGpSu_D0Qq6R3c8jrHGsTZf3w3fHmQBOSRs7jUjQj9oTV8viPA0wiPfZJkDmjX2TAGN9',
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
          const transaction = orderData.purchase_units[0].payments.captures[0];
          this._snackBar.open("Transaction successfully", "",this.configSnackBar);
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
        this._snackBar.open("Transaction was canceled", "",this.configSnackBar);
      },
      onError: err => {
        this._snackBar.open("Transaction encountered an error", "",this.configSnackBar);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

}
