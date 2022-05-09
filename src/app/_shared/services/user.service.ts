import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from 'firebase/compat';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersRef: any;

  constructor(private db: AngularFirestore, private angularFireAuth: AngularFireAuth) {
    this.usersRef = db.collection('/users');
  }

  getAllUsers() {
    return this.usersRef;
  }

  getCurrentUserRef() {
    const userDetails = JSON.parse(<any>localStorage.getItem('loggedUser'));
    console.log(userDetails);
    const userRef = this.db.collection('/users').doc(userDetails.uid);
    return userRef
  }

  getCurrentUser() {
    const currentUser = this.getCurrentUserRef();
    return currentUser;
  }

  updateUser(user) {
    const userRef = this.usersRef.doc(user.uid);
    return userRef.set(user, {
      merge: true
    })
  }

  deleteUser(user) {
  }


  async addMoneyInApp(moneyToAdd) {
    const currentUser = this.getCurrentUserRef();
    let moneyInApp;
    await currentUser.get().subscribe((data: any) => {
      moneyInApp = data.data().moneyInApp
      console.log(moneyInApp);
      moneyInApp += moneyToAdd;
      currentUser.update({
        moneyInApp: moneyInApp
      });
    });
  }

  addTransactionToUser(transaction, moneyInLei) {
    const currentUser = this.getCurrentUserRef();
    currentUser.collection('transactions').add({
      'create_time': transaction.create_time,
      'status': transaction.status,
      'amount': moneyInLei
    }).then(r => console.log(r));
  }

  disableDiscountFromAllUsers() {
    this.db.collection('users').ref.get().then(function(querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.update({
          hasDiscount: false
        });
      });
    });
  }

  //products-cart
  addOrRemoveFromFavourite(user, productId) {
    const userRef = this.db.collection('/users').doc(user.uid);

    userRef.update({
      favoriteProducts: user.favoriteProducts
    });
  }

  updateCart(cart: any, user: any) {
    const userRef = this.db.collection('/users').doc(user.uid);
    console.log(cart);
    return userRef.update({
      cart: cart
    })
  }


  saveCurrentOrder(order: any) {
    const userRef = this.db.collection('/users').doc(order.client.uid);
    userRef.update({
      currentOrder: order
    })
  }
}

