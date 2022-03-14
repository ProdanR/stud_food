import { Component, OnInit } from '@angular/core';
import {FeedbackService} from "../../_shared/services/feedback.service";

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedback: any={};

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
  }

  addFeedbackToFirebase() {
    this.feedback.important=false;
    this.feedback.date=new Date().toString();
    console.log(this.feedback);
    this.feedbackService.addFeedback(this.feedback);
  }
}
