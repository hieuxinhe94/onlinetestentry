import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Candidate } from '../model/candidate';
import { CandidateService } from '../service/candidate.service';
import { QuizService } from '../service/quiz.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'itsol-admin-new-candidate-popup',
  templateUrl: './admin-new-candidate-popup.component.html',
  styleUrls: ['./admin-new-candidate-popup.component.scss']
})
export class AdminNewCandidatePopupComponent implements OnInit {
  currentCandidate = new Candidate(null);

  subjects = [];
  selectedSubjects = [];
  action: string;
  isEdit = false;
  uniqueStr = new Date().getMilliseconds() + new Date().getDay();

  isCreateNew = false;
  constructor(
    private _service: NotificationsService,
    public dialogRef: MatDialogRef<AdminNewCandidatePopupComponent>,
    private candidateService: CandidateService,
    private quizService: QuizService,
    @Inject(MAT_DIALOG_DATA) public _data: any
  ) {

    if (_data !== null) {

      this.currentCandidate = _data;
      this.isCreateNew = false;

    } else {
      this.isCreateNew = true;
    }
  }
  onChangeName() {
    if (this.isCreateNew) {
      this.currentCandidate.userName =  this.currentCandidate.fullName.replace(' ', '')
      .replace(' ', '').replace(' ', '').replace(' ', '').replace(' ', '')
       + this.uniqueStr;
    }
  }
  ngOnInit() {
    this.quizService.getFullQuiz().subscribe( (res) => {
      this.subjects = res.map( item => item.name);
    }, (e) => {
      this._service.error('Cannot load the quiz available by now.', e.Message , {
        timeOut: 5000,
        showProgressBar: false,
        pauseOnHover: true,
        clickToClose: false,
        clickIconToClose: true
      });
    });

  }
  onCheckedSubject(subject: string) {

    if ( ! this.selectedSubjects.includes(subject)) {
      this.selectedSubjects.push(subject);
    } else {
      this.selectedSubjects.splice(this.selectedSubjects.indexOf(subject));
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.currentCandidate.subjectNames = this.selectedSubjects;
    this.candidateService.insertOrUpdate(this.currentCandidate).subscribe(
      res => {
        this.dialogRef.close(res);
        this._service.info('The candidate updated sucessfuly.', '', {
          timeOut: 3000,
          showProgressBar: false,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      },
      e => {
        console.log(e);
        this._service.error('Cannot load the quiz available by now.', e.Message , {
          timeOut: 5000,
          showProgressBar: false,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      }
    );
  }
}
