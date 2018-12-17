import { Component, OnInit, Inject } from '@angular/core';
import { QuizService } from '../service/quiz.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'itsol-time-up-popup',
  templateUrl: './time-up-popup.component.html',
  styleUrls: ['./time-up-popup.component.scss']
})
export class TimeUpPopupComponent implements OnInit {

  data: any;
  constructor(
    public dialogRef: MatDialogRef<TimeUpPopupComponent>,
    private quizService: QuizService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public _data: any) {

      this.data = _data;

     }

  ngOnInit() {
  }
  onClose() {
    this.router.navigate(['/summary']);
  }
}
