import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersRef: any;

  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection('/users');
  }

   getAllUsers() {
    return this.usersRef;
  }

}

