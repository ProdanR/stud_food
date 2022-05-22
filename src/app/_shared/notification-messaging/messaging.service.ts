import {Injectable} from '@angular/core';
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {not} from "rxjs/internal-compatibility";
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private _userToken=null;
  constructor(private angularFirebaseMessaging: AngularFireMessaging, private http: HttpClient, private userService: UserService) {
  }

  requestPermisionIfDoesntExist(){
    this.userService.getCurrentUser().get().subscribe(data => {
      let currentUser:any = data.data();
      console.log(currentUser);
      if(currentUser.notificationToken==null){
        this.angularFirebaseMessaging.requestToken.subscribe((token:any)=> {
            console.log(token);
            this.userService.updateNotificationToken(currentUser.uid,token);
          },
          error => {
            console.log(error);
          });
      }
    });
  }

  sendNotification(order) {
    let notification:any={};
    let to= order.client.notificationToken

    notification.title="Nr: "+order.orderNumber+"  New status: "+order.status;
    notification.body="Your order's status has changed!"
    notification.sound="Tri-tone"

    console.log("merge");
    const headers = new HttpHeaders()
      .set('Authorization', 'key = AAAAIn0cr70:APA91bGuE0eAWPDVoH7fhJc1g5qpM9rg17bJv5wE4Fd7ps-NOhig7CCREz7yaE2pRkvtdbSrojVnhLuVvWjW3A-xxavttniP1IVIltJ83MTpkr6gAWIfu9Lvvnx4iKGvA-71GSF89_WN')
      .set('content-type', 'application/json');

    const body = {
      notification: notification,
      to: to,
    }
    return this.http
      .post("https://fcm.googleapis.com/fcm/send", body, { headers: headers })
      .subscribe(res => console.log(res));
  }

  listen(){
    this.angularFirebaseMessaging.messages.subscribe(message=>{
      console.log(message);
    });
  }

  get userToken(): any {
    return this._userToken;
  }
}
