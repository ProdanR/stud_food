import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  configSnackBar = new MatSnackBarConfig();


  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              private _snackBar: MatSnackBar) {

    this.configSnackBar.duration = 2000;
    this.configSnackBar.verticalPosition = 'top';
    this.configSnackBar.panelClass = ['my_snackBar'];

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(<string>localStorage.getItem('user'));
      } else {
        // @ts-ignore
        localStorage.setItem('user', null);
        // @ts-ignore
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  signIn(user: User) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.saveLoggedUserToDataStorage(result.user?.uid);
      }).catch((error) => {
        this._snackBar.open("Invalid credentials", "", this.configSnackBar);
      })
  }

  async signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.saveUserDataToFirebaseGoogleCredentials(credential.user);
    this.saveLoggedUserToDataStorage(credential.user?.uid);
  }

  async signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    this.saveUserDataToFirebase(credential.user);
    this.saveLoggedUserToDataStorage(credential.user?.uid);
  }

  signUp(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        user.uid = <string>result.user?.uid;
        this.saveUserDataToFirebase(user);
        this.signIn(user);
      }).catch((error) => {
        if (error.code == 'auth/weak-password') {
          this._snackBar.open("Password is too short", "", this.configSnackBar);
        } else {
          this._snackBar.open("Email is not valid or already exist", "", this.configSnackBar);
        }
      })
  }

  signOut() {
    console.log(this.afAuth.authState);
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('loggedUser');
      this.router.navigate(['sign-in']);
    })
  }


  resetPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this._snackBar.open("Password reset email sent, check your inbox", "", this.configSnackBar);
        this.router.navigate(['sign-in']);
      }).catch((error) => {
        this._snackBar.open("Email does not found, please make an account", "", this.configSnackBar);
      })
  }


  saveLoggedUserToDataStorage(uid: any) {
    console.log(uid);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    userRef.get().subscribe(doc => {
      localStorage.setItem('loggedUser', JSON.stringify(doc.data()));
      JSON.parse(<string>localStorage.getItem('loggedUser'));
      console.log(JSON.parse(<any>localStorage.getItem('loggedUser')));
      if (doc.data().roles.indexOf('admin') !== -1) {
        this.router.navigate(['admin-page']);
      } else {
        this.router.navigate(['menu']);
      }
    });
  }

  isLoggedIn() {
    const user = JSON.parse(<string>localStorage.getItem('user'));
    if (user) {
      return true;
    }
    return false;
  }

  saveUserDataToFirebaseGoogleCredentials(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      roles: ['user'],
      hasDiscount: false,
      moneyInApp: 0,
      studentNumber: ''
    }

    // @ts-ignore
    return userRef.set(data, {merge: true})
  }

  saveUserDataToFirebase(user: any) {

    const userRef: AngularFirestoreDocument<any> = this.afs.collection("users").doc(user.uid);

    userRef.get().subscribe((doc) => {
      if (!doc.exists) {
        const userData: any = {
          uid: user.uid,
          displayName: user.displayName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          roles: ["user"],
          hasDiscount: false,
          moneyInApp: 0,
          studentNumber: ''
        }
        userRef.set(userData, {
          merge: true
        })
      }
    })


  }


  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles.includes(role)) {
        return true
      }
    }
    return false
  }


}
