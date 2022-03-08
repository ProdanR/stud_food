import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../model/user";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

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

  signUp(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        user.uid = <string>result.user?.uid;
        user.roles = ["user"];
        this.isStudent(user.cnp, user.studentNumber).then(isStudent => {
          if (isStudent) {
            user.roles.push("student");
            user.hasDiscount = true;
          } else {
            user.cnp = '';
            user.studentNumber = '';
            user.hasDiscount = false;
          }
          this.saveUserDataToFirebase(user);
          this.signIn(user);
        });
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

  private async isStudent(cnp: any, studentNumber: any) {
    if (!cnp || !studentNumber) return false;
    const foundStudent = await this.afs.collection('allStudents').ref
      .where('cnp', '==', cnp)
      .where('studentNumber', '==', studentNumber)
      .get();
    if (foundStudent.empty) {
      this._snackBar.open("We crate an account for you, but your student's info are incorrect.\nPlease contact us to solve the problem!", "Close", {
        panelClass: ['my_snackBar'],
        verticalPosition: 'top'
      });
      return false;
    }
    foundStudent.docs.forEach((stud: any) => {
      const studRef: AngularFirestoreDocument<any> = this.afs.doc(`allStudents/${stud.id}`);
      console.log(stud.id);
      if (stud.data().used){
        this._snackBar.open("We crate an account for you, but your student's are already used.\nPlease contact us to solve the problem!", "Close", {
          panelClass: ['my_snackBar'],
          verticalPosition: 'top'
        });
        return false;
      }
      else {
        const data: any = {used: true};
        studRef.set(data, {
          merge: true
        })
        return true;
      }
    })

    return true;
  }

  saveLoggedUserToDataStorage(uid: any) {
    console.log(uid);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    userRef.get().subscribe(doc => {
      localStorage.setItem('loggedUsed', JSON.stringify(doc.data()));
      JSON.parse(<string>localStorage.getItem('loggedUsed'));
      console.log(JSON.parse(<any>localStorage.getItem('loggedUsed')));
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


  saveUserDataToFirebase(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      id: user.uid,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      email: user.email,
      cnp: user.cnp,
      studentNumber: user.studentNumber,
      roles: user.roles,
      hasDiscount: user.hasDiscount,
      moneyInApp: 0
    }
    return userRef.set(userData, {
      merge: true
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

  getCurrentUser() {
    return this.afAuth.authState.subscribe(data => {
      this.afs.collection('users').ref
        .where('uid', '==', data?.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.docs.forEach((doc) => {
            return doc.data();
          });
        });
    })
  }


}
