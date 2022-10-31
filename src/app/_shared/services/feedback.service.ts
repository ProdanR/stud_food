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

  getAllFeedbacks(){
    return this.feedbacksRef;
  }

  setImportant(checked, id: any) {
    const feedbackRef = this.feedbacksRef.doc(id);
    feedbackRef.update({
      important: checked
    })

  }

  setSolved(checked, id: any){
    const feedbackRef = this.feedbacksRef.doc(id);
    feedbackRef.update({
      solved: checked
    })

  }
}
