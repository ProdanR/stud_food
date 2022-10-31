import { Component, OnInit } from '@angular/core';
import {FeedbackService} from "../../_shared/services/feedback.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss']
})
export class AdminFeedbackComponent implements OnInit {
  feedbacks:any[]=[];


  constructor(private feedbackService: FeedbackService) {
    this.getFeedbacks();
  }

  ngOnInit(): void {
  }



  private getFeedbacks() {
    this.feedbackService.getAllFeedbacks().snapshotChanges().pipe(
      map((changes: any) =>
        changes.map(c =>
          ({id: c.payload.doc.id, ...c.payload.doc.data()})
        )
      )
    ).subscribe(feedbacks => {
      feedbacks.sort((a: any, b: any) => (a.date < b.date) ? 1 : -1);
      this.feedbacks=feedbacks;
    });
  }

  setImportantFeedback($event: any, id:any) {
    this.feedbackService.setImportant($event.checked, id);
  }

  setSolvedFeedback($event: any, id:any) {
    this.feedbackService.setSolved($event.checked, id);
  }


}
