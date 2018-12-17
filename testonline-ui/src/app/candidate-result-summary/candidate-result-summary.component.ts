import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { CandidateService } from '../service/candidate.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Candidate } from '../model/candidate';
import { CandidateViewDetailPopupComponent } from '../candidate-view-detail-popup/candidate-view-detail-popup.component';
import { SummaryService } from '../service/summary.service';
import { CandidateQuizResult } from '../model/candidate-quiz-result';
import { ExcelService } from '../service/excel.service';
import { NotificationsService } from 'angular2-notifications';


export class ExportModel {
  Index: number;
  CandidateFullName: string;
  CandidateName: string;
  QuizName: string;
  AnsweredCount: number;
  RightCount: number;
  TotalQuestion: number;
  Mark: number;
  Times: string;
  DateSubmited: string;

  constructor(data: any) {
    this.Index = data.Index;
    this.CandidateName = data.CandidateName;
    this.CandidateFullName = data.CandidateFullName;
    this.QuizName = data.QuizName;
    this.AnsweredCount = data.AnsweredCount;
    this.RightCount = data.RightCount;
    this.TotalQuestion = data.TotalQuestion;
    this.Mark = data.Mark;
    this.Times = data.Times;
    this.DateSubmited = data.DateSubmited;
  }
}


@Component({
  selector: 'itsol-candidate-result-summary',
  templateUrl: './candidate-result-summary.component.html',
  styleUrls: ['./candidate-result-summary.component.scss']
})
export class CandidateResultSummaryComponent implements OnInit {
  constructor(
    private _service: NotificationsService,
    public dialog: MatDialog,
    public candidateService: CandidateService,
    public summaryService: SummaryService,
    private excelService: ExcelService
    ) { }
  dataSource = new MatTableDataSource(null);
  displayedColumns = [] ;
  selection: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  _data: CandidateQuizResult[];
  searchText = '';
  renderedData: any;

  exportData: ExportModel[] = [];


  ngOnInit() {
    this.init();
  }
  async doSeach () {
    console.log('search: ' + this.searchText);

    this.renderedData = this._data.filter( item =>
      item.candidateQuizAssign.candidate.userName.includes(this.searchText) ||
      item.candidateQuizAssign.quiz.name.includes(this.searchText)
    );

    this.dataSource  = await new MatTableDataSource(this.renderedData);
    this.displayedColumns = [
      'index',
      'userName',
      'quizname',
      'answeredQuestionCount',
      'rightQuestionCount',
      'totalQuestionCount',
      'mark',
      'workingTimeMinues',
      'dateSubmited'];
    this.selection =  new SelectionModel<Candidate>(true, []);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  init() {
    (this.summaryService.getAllQuizSubmitedResult()).subscribe(async (res) => {
      let t = 1;
      for ( let i = 0; i < res.length; i++ ) {
        res[i].index = t;
        t ++ ;
      }
       this._data = res;
       this.renderedData = res;
        this.dataSource  = await new MatTableDataSource(res);
        this.displayedColumns = [
          'index',
          'userName',
          'quizname',
          'answeredQuestionCount',
          'rightQuestionCount',
          'totalQuestionCount',
          'mark',
          'workingTimeMinues',
          'dateSubmited'];
        this.selection =  new SelectionModel<Candidate>(true, []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

    }, (e) => {
        console.log(e);
        this._service.error('Oops, Cannot load quizes submited ', e.Message, {
          timeOut: 5000,
          showProgressBar: false,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
    });
  }

  public toggle(data: any) {
    console.log(data);
    this.openDialogToViewDetail(data, 'view');
  }

  openDialogToViewDetail(data: any, action: string): void {
    const dialogRef = this.dialog.open(CandidateViewDetailPopupComponent, {
      width: 'auto',
      data: {data : data, action: action}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed : ' + result);
      if (result === 1) {
        this.init();
      }
    });
  }
  exportExcel() {
    this.renderedData.forEach(e => {
        this.exportData.push(new ExportModel(
          { Index : e.index,
            CandidateFullName : e.candidateQuizAssign.candidate.fullName,
            CandidateName : e.candidateQuizAssign.candidate.userName,
            QuizName: e.candidateQuizAssign.quiz.name,
            AnsweredCount: e.answeredQuestionCount,
            RightCount: e.rightQuestionCount,
            TotalQuestion: e.totalQuestionCount,
            Mark: e.mark,
            Times: e.workingTimeMinues,
            DateSubmited: e.dateSubmited
          }));
    });

    this.excelService.exportAsExcelFile( this.exportData, 'test result');
  }



}
