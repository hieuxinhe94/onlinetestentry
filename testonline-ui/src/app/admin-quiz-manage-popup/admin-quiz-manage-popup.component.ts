import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Answer } from '../model/answer';
import { Question } from '../model/question';
import { Quiz } from '../model/quiz';
import { QuizService } from '../service/quiz.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotificationsService } from 'angular2-notifications';
import { GuidelinePopupComponent } from '../guideline-popup/guideline-popup.component';

@Component({
  selector: 'itsol-admin-quiz-manage-popup',
  templateUrl: './admin-quiz-manage-popup.component.html',
  styleUrls: ['./admin-quiz-manage-popup.component.scss']
})
export class AdminQuizManagePopupComponent implements OnInit {
  public Editor = ClassicEditor;
  currentQuestion = new Question(null);
  data: Quiz;
  isCreateNew = true;
  constructor(
    public dialogRef: MatDialogRef<AdminQuizManagePopupComponent>,
    private quizService: QuizService,
    private _service: NotificationsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public _data: any) {
    this.data = _data.quiz;
    if (_data.question !== null) {
      this.currentQuestion = _data.question;
      this.isCreateNew = false;

    } else {
      this.currentQuestion.quizId = _data.quiz.id;

      this.currentQuestion.title = '';
      this.currentQuestion.content = '';
      this.currentQuestion.answers = [
        new Answer({  title : 'enter answer 1'}),
        new Answer({  title : 'enter answer 2'}),
        new Answer({  title : 'enter answer 3'}),
        new Answer({  title : 'enter answer 4'}),
      ];
      this.isCreateNew = true;
    }
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  async onYesClick() {
    (await this.quizService.insertOrUpdateQuestion(this.currentQuestion)).subscribe( (res) => {
        // push notifications
        if (res === 1) {
          this._service.info('Updated sucessfuly', '' , {
            timeOut: 2000,
            showProgressBar: false,
            pauseOnHover: true,
            clickToClose: false,
            clickIconToClose: true
          });
        }
        console.log(res);
        this.dialogRef.close( res);
    },
    (e) => {
      this._service.error('Oops, Error when insert or update to the server: ', e.Message , {
        timeOut: 5000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: false,
        clickIconToClose: true
      });

    });
  }

  onChangeMultiSelectBox () {

      if (this.currentQuestion.isMultiSelection === false) {
        let countSelectedRightAnswers = 0;
        this.currentQuestion.answers.forEach(element => {
            if (element.isRightAnswer && countSelectedRightAnswers === 0) {
              countSelectedRightAnswers ++;
            } else {
              element.isRightAnswer = false;
            }
        });
      } else {

      }
    }

    onSelectRightAnswer (a: Answer) {

      if (this.currentQuestion.isMultiSelection === false) {
        this.currentQuestion.answers.forEach( (item) => {
          if (item !== a) {
            item.isRightAnswer = false;
          }
        });
      }
    }


  addNewAnswerRow() {
    this.currentQuestion.answers.push(new Answer({ title : 'title ' +  (this.currentQuestion.answers.length + 1 )}));
    this._service.info('New row added ', {
      timeOut: 2000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: false,
      clickIconToClose: true
    });
  }



}
