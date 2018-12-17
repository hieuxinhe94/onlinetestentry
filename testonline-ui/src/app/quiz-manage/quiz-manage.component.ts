import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatDialog
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AdminQuizManagePopupComponent } from '../admin-quiz-manage-popup/admin-quiz-manage-popup.component';
import { NewQuizSubjectDialogComponent } from '../new-quiz-subject-dialog/new-quiz-subject-dialog.component';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../service/quiz.service';
import { Quiz } from '../model/quiz';
import { Question } from '../model/question';
import { QuestionViewDetailPopupComponent } from '../question-view-detail-popup/question-view-detail-popup.component';
import { GuidelinePopupComponent } from '../guideline-popup/guideline-popup.component';


@Component({
  selector: 'itsol-quiz-manage',
  templateUrl: './quiz-manage.component.html',
  styleUrls: ['./quiz-manage.component.scss']
})
export class QuizManageComponent implements OnInit {

  isShowAddNewButton = true;
  isShowDeleteButton = false;
  isShowAll = false;
  quiz: Quiz;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  dataSource = null;
  displayedColumns: string[];
  selection: any;
  subject: string;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    public quizService: QuizService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params.subject == null) {
        this.isShowAll = true;
      } else {
        switch (params.subject) {
          case 'new': {
            this.openAddNewSubjectDialog(null);
            break;
          }
          default: {
            this.subject = params.subject;
          }
        }
      }
    });


    this.route.queryParams.subscribe( params => {
      console.log('params changed', params);
      this.subject = params.subject;
      this.ngOnInit();
    });
  }

  gotoGuide() {
    const dialogRef = this.dialog.open(GuidelinePopupComponent, {
      width: '80%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
    });
  }

  async ngOnInit() {
    this.initialize();
  }

 async initialize() {
    if (this.isShowAll) {

      if (this.dataSource.length !== 0) {
        this.displayedColumns = ['id', 'name', 'title', 'description', 'timeUpMinutes'
        ];
        this.selection = new SelectionModel<Quiz>(true, []);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    } else {
      // show each subject
     await this.quizService.getFullQuizBySubjectName(this.subject).subscribe(
        response => {

          if (response !== null) {
            this.quiz = response;
            let t = 1;
            for ( let i = 0; i < response.questions.length; i++ ) {
              response.questions[i].index = t;
              t ++ ;
            }
            this.dataSource = new MatTableDataSource(response.questions);
            this.displayedColumns = [ 'index', 'title', 'content', 'isMultiSelection'];
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        },
        error => {
          return [];
        }
      );
    }
  }

  add() {
    this.openAddNewDialog({ quiz : this.quiz, question : null });
  }
  onDelete(id) {}

  openAddNewDialog(data: any): void {
    const dialogRef = this.dialog.open(AdminQuizManagePopupComponent, {
      width: 'auto',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result === 1) {
        this.initialize();
      }
    });
  }

  openViewDetailDialog(data: any, action: string): void {
    const dialogRef = this.dialog.open(QuestionViewDetailPopupComponent, {
      width: 'auto',
      height: 'auto',
      data: {data : data, action: action}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result === 1) {
        this.initialize();
      }
    });
  }

  public toggle(data: any) {
    console.log(data);
    this.openViewDetailDialog(data, 'view');
}



  openAddNewSubjectDialog(data: any) {
    const dialogRef = this.dialog.open(NewQuizSubjectDialogComponent, {
      width: 'auto',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result === true) {
        this.initialize();
      }
    });
  }
}
