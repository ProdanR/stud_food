import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  feedbacksRef: any;

  constructor(private db: AngularFirestore) {
    this.feedbacksRef = db.collection('/feedbacks');
  }

  addFeedback(feedback: any) {
    return this.db.collection('/feedbacks').doc().set(feedback);
  }

}
