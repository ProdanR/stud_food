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

  getCurrentUser(){
    const userDetails = JSON.parse(<any>localStorage.getItem('loggedUser'));
    console.log(userDetails);
    const userRef= this.db.collection('/users').doc(userDetails.uid);
    return userRef;
  }

  updateUser(user){
    const userRef = this.usersRef.doc(user.uid);
    return userRef.set(user, {
      merge: true
    })
  }

  deleteUser(user){
  }

}

