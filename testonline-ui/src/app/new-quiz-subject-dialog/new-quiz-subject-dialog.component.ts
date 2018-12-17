import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AdminQuizManagePopupComponent } from '../admin-quiz-manage-popup/admin-quiz-manage-popup.component';
import { Subject } from 'src/app/model/subject';
import { QuizService } from '../service/quiz.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'itsol-new-quiz-subject-dialog',
  templateUrl: './new-quiz-subject-dialog.component.html',
  styleUrls: ['./new-quiz-subject-dialog.component.scss']
})
export class NewQuizSubjectDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdminQuizManagePopupComponent>,
      private quizService: QuizService,
      private router: Router,
      private _service: NotificationsService
    ) { }
  newQuizSubject = new Subject(null);

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/admin-dashboard']);
  }
  onYesClick(): void {
    (this.quizService.createNewQuiz(this.newQuizSubject)).subscribe( (res) => {
        if (res === 1) {

          this._service.info('Added new quiz successfuly', 'Trying to reload the pages', {
            timeOut: 2000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: false,
            clickIconToClose: true
          });

          this.dialogRef.close(1);
          location.reload();
        }
    }, (e) => {
      this._service.error('Oops, Error!', e, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: false,
        clickIconToClose: true
      });
    });
  }
}
