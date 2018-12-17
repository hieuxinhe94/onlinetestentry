import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Summary } from '../model/summary';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Quiz } from '../model/quiz';
import { QuizService } from '../service/quiz.service';
import { CandidateService } from '../service/candidate.service';
import { SummaryService } from '../service/summary.service';
import { Candidate } from '../model/candidate';
import { CandidateQuizResult } from '../model/candidate-quiz-result';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'dashboard-material',
  templateUrl: './dashboard-material.component.html',
  styleUrls: ['./dashboard-material.component.css']
})
export class DashboardMaterialComponent implements OnInit {

  // Radar
  public radarChartLabels = [];
  public radarChartData: any = [
    {data: [], label: 'Test result'}
  ];
  private _data = [];
  public radarChartType = 'radar';
  cards: any;
  candidate: Candidate;
  summary = new Summary(null);
  public userQuizes: Quiz[];
  public submitedQuizes: CandidateQuizResult[];


  constructor(

    private candidateService: CandidateService,
    private summaryService: SummaryService) {
  }

  get formatCardView() {
    this.summary.quizes.forEach (
      (q) => {

      }
    );
    return this.summary;
  }

  ngOnInit(): void {
    this.userQuizes = [];
     this.initialize();
  }

  initialize () {
    debugger;
     this.candidateService.getCurrentCandidateInfo().subscribe( (res) => {

      this.candidate = res;
      this.summaryService
      .getQuizSubmitedResultByCandidate(this.candidate.userName).subscribe( (response) => {
      this.submitedQuizes = response;

      this.initSubjectRadars(response);
      this.initDataRadars(response);
      }, (error) => {
      });
    }, (e) => {
        console.log(e);

    });
  }

  initSubjectRadars(quizResults: CandidateQuizResult[]) {

    quizResults.forEach( item => {
        if (this.radarChartLabels.indexOf(item.candidateQuizAssign.quiz.name) === -1) {
          this.radarChartLabels.push(item.candidateQuizAssign.quiz.name.toUpperCase());
        }
    });
  }
  initDataRadars(quizResults: CandidateQuizResult[]) {
    quizResults.forEach(item => {
      this._data.push(item.mark);
    });
    this.radarChartData = [
      {data: this._data, label: 'Test result'}
    ];
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

}
