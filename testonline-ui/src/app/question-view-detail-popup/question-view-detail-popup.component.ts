import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { QuizService } from '../service/quiz.service';
import { Question } from '../model/question';
import { Answer } from '../model/answer';
import { AdminQuizManagePopupComponent } from '../admin-quiz-manage-popup/admin-quiz-manage-popup.component';
import { NotificationsService } from 'angular2-notifications';

export interface QuestionViewDetailPopupComponentViewModel {
  data: Question;
  action: string;
}

@Component({
  selector: 'itsol-question-view-detail-popup',
  templateUrl: './question-view-detail-popup.component.html',
  styleUrls: ['./question-view-detail-popup.component.scss']
})
export class QuestionViewDetailPopupComponent implements OnInit {
  question: Question;
  isShowDetail = false;
  isShowConfirmDelete = false;

  constructor(
    public dialogRef: MatDialogRef<QuestionViewDetailPopupComponent>,
    public dialog: MatDialog,
    private quizService: QuizService,
    private _service: NotificationsService,
    @Inject(MAT_DIALOG_DATA)
    public _data: QuestionViewDetailPopupComponentViewModel
  ) {
    this.question = _data.data;
    switch (_data.action) {
      case 'view': {
        this.isShowDetail = true;
        break;
      }
      case 'delete': {
        this.isShowConfirmDelete = true;
        break;
      }
      case 'edit': {
        break;
      }
      default:
        return;
    }
  }

  ngOnInit() {}

  delete() {
    this.isShowDetail = false;
    this.isShowConfirmDelete = true;
  }

  edit() {
    const dialogRef = this.dialog.open(AdminQuizManagePopupComponent, {
      width: 'auto',
      data: { quiz: null, question: this.question }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result === 1) {
      }
    });
  }

  onYesDeleteClick() {
    this.quizService.deleteQuestion(this.question).subscribe(
      res => {
        if (res === 1) {
          this.dialogRef.close(1);
          this._service.info('The question deleted sucessfuly!', {
            timeOut: 2000,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: false,
            clickIconToClose: true
          });
        }
      },
      e => {
        console.log(e);

        this._service.error('Oops, Error when delete this object !', e.message, {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      }
    );
  }

  onNoDeleteClick() {
    this.isShowDetail = true;
    this.isShowConfirmDelete = false;
  }
}
