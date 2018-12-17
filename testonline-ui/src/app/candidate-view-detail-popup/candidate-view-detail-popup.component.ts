import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { CandidateService } from '../service/candidate.service';
import { AdminNewCandidatePopupComponent } from '../admin-new-candidate-popup/admin-new-candidate-popup.component';
import { Candidate } from '../model/candidate';
import { CandidateQuizResult } from '../model/candidate-quiz-result';
import { SummaryService } from '../service/summary.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'itsol-candidate-view-detail-popup',
  templateUrl: './candidate-view-detail-popup.component.html',
  styleUrls: ['./candidate-view-detail-popup.component.scss']
})
export class CandidateViewDetailPopupComponent implements OnInit {
  isShowDetail = false;
  isShowConfirmDelete = false;
  currentCandidate: Candidate;

  displayedColumns: string[];
  dataSource: any;

  // Radar
  public radarChartLabels = [] ;
  public radarChartData: any = [
    {data: [], label: 'Candidate test result graph.'}
  ];
  _dataRadar = [];
  public radarChartType = 'radar';
  public submitedQuizes: CandidateQuizResult[];

  constructor(
    private _service: NotificationsService,
    public dialogRef: MatDialogRef<CandidateViewDetailPopupComponent>,
    public dialog: MatDialog,
    private candidateService: CandidateService,
    private summaryService: SummaryService,
    @Inject(MAT_DIALOG_DATA) public _data: any) {
      this.currentCandidate = _data.data;
      switch (_data.action) {
        case 'view': {
          this.isShowDetail = true;
          this.initDetailData();
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
      }}

  ngOnInit() {
  }

  initDetailData() {
    // get candidate and quiz assign
      (this.candidateService.getQuizAssigned(this.currentCandidate)).subscribe ( (res) => {
        if (res !== null) {}
        this.dataSource = res.quizes;
        this.displayedColumns = ['name', 'description', 'timeUpMinutes', 'status'];
      }, (e) => {
        console.log(e);

        this._service.error('Oops, Cannot load detail of your quiz ', e.Message, {
          timeOut: 2000,
          showProgressBar: false,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });

      });



     // get result of candidate


      // visualize to view
      this.visualize ();
  }

  visualize () {
  this.summaryService
      .getQuizSubmitedResultByCandidate(this.currentCandidate.userName).subscribe( (response) => {
      this.submitedQuizes = response;
      this.initSubjectRadars(response);
      this.initDataRadars(response);
      }, (e) => {
        this._service.error('Oops, Error when visualize your result. ', e.Message, {
          timeOut: 2000,
          showProgressBar: false,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      });
  }

  initSubjectRadars(quizResults: CandidateQuizResult[]) {

    quizResults.forEach( item => {
        if (this.radarChartLabels.indexOf(item.candidateQuizAssign.quiz.name) === -1) {
          this.radarChartLabels.push(item.candidateQuizAssign.quiz.name);
        }
    });
  }
  initDataRadars(quizResults: CandidateQuizResult[]) {
    quizResults.forEach(item => {
      this._dataRadar.push(item.mark);
    });
    this.radarChartData = [
      {data: this._dataRadar, label: 'Test result'}
    ];
  }


  delete() {
    this.isShowDetail = false;
    this.isShowConfirmDelete = true;
  }

  edit() {
    const dialogRef = this.dialog.open(AdminNewCandidatePopupComponent, {
      width: 'auto',
      data: this.currentCandidate
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result === 1) {

      } else {
      }
    });
  }
  onYesDeleteClick() {
    this.candidateService.delete(this.currentCandidate).subscribe(
      res => {
        if (res === 1) {
          this.dialogRef.close(1);
          this._service.info('Delete sucessfuly', '' ,  {
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
      }
    );
  }

  onNoDeleteClick() {
    this.isShowDetail = true;
    this.isShowConfirmDelete = false;
  }

      // events
      public chartClicked(e: any): void {
        console.log(e);
      }

      public chartHovered(e: any): void {
        console.log(e);
      }
}
