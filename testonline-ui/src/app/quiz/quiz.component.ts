import { Component, OnInit } from '@angular/core';
import { Quiz } from '../model/quiz';
import { QuizService } from '../service/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../model/question';
import { Answer } from '../model/answer';
import { MatDialog } from '@angular/material';
import { DialogSubmitQuizComponent } from '../dialog/dialog.component';
import { UserService } from '../service/user.service';
import { CandidateQuizResult } from '../model/candidate-quiz-result';
import { Candidate } from '../model/candidate';
import { CandidateService } from '../service/candidate.service';
import { NotificationsService } from 'angular2-notifications';
import { TimeUpPopupComponent } from '../time-up-popup/time-up-popup.component';

@Component({
  selector: 'itsol-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  quizSubject: any;
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;

  pager = {
    index: 0,
    size: 10,
    count: 1
  };

  isReviewed = false;
  preventSubmit: boolean;
  preventNext = true;

  currentQuizingCandidate: Candidate;

  subject: string;
  step = 0;
  constructor(
    private quizService: QuizService,
    private userService: UserService,
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _service: NotificationsService
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params.subject == null) {
      } else {
        this.subject = params.subject;
        await this.loadQuiz(this.subject);
      }
    });

    this.candidateService.getTimeUp().subscribe((val) => {
    if (val) {
      this.onTimeUp();
    }});
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  prevStep() {
    this.step--;
  }
  async loadQuiz(subject: string): Promise<any> {
    const data = await this.candidateService.getCandidateQuizAssigned;
    if (data !== undefined) {
      this.quiz = data.quizes.filter(t => t.name === this.subject)[0];
   
      if (this.quiz.questions === null) {
        await this.loadQuestionAtTheFirstTime();
      } else {
        // already has had data.
        if (
          this.candidateService.getCandidateQuizAssignedSubmited
            .map(t => t.name)
            .includes(this.subject)
        ) {
          this.preventSubmit = true;
        } else {
          this.preventSubmit = false;
        }
      }
    } else {
      await this.loadQuestionAtTheFirstTime();
    }

    this.mode = 'quiz';
  }

  async loadQuestionAtTheFirstTime() {
    debugger;
    await this.quizService.getFullQuizBySubjectName(this.subject).subscribe(
      async res => {
        this.quiz = new Quiz(res);
        this.candidateService.setCandidateQuizAssignedItem(res);
        this.pager.count = this.quiz.questions.length;
        if (this.quiz !== null) {
          await this.candidateService.setCurrentQuizNameViewing(this.subject);
          await this.candidateService.onStartViewExam();
          this._service.info('Quiz loaded', 'Please start your assignment !', {
            timeOut: 1000,
            showProgressBar: true,
            pauseOnHover: true,
            clickToClose: false,
            clickIconToClose: true
          });
          if (
            this.candidateService.getCandidateQuizAssignedSubmited
              .map(t => t.name)
              .includes(this.subject)
          ) {
            this.preventSubmit = true;
          } else {
            this.preventSubmit = false;
          }
          this.preventNext = true;
        }
      },
      error => {
        console.log(error);
        this._service.error('Oops, Error when load the quiz', error.Message, {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      }
    );
  }

  onSubmit(): any {
    this.openSubmitDialog();
    this.mode = 'submited';
  }

  async onTimeUp () {
    // submit all quiz
    this.preventNext = false;
    if (!this.preventSubmit) {
      // check current quiz already submited yet?
      this.currentQuizingCandidate = this.candidateService.getCurrentCandidate;
      const tempCandidateResultView = new CandidateQuizResult(null);
      tempCandidateResultView.candidate = this.currentQuizingCandidate;
      tempCandidateResultView.quiz = this.quiz;
      tempCandidateResultView.workingTimeMinues = 20;

      this.submit(tempCandidateResultView);
      this.candidateService.setCandidateQuizAssignedSubmited(this.quiz);
    }
    this.submitAllQuizHasNotSubmitedAfter();
    // also check if the candidate has not submited another quiz jet

    // open dialog
    await this.openTimeUpNotificationDialog();
  }

  submitAllQuizHasNotSubmitedAfter() {
    const tmp1 = this.candidateService.getCandidateQuizAssigned;
    const tmp2 = this.candidateService.getCandidateQuizAssignedSubmited.map( t => t.name);

    // tslint:disable-next-line:no-debugger
    debugger;
    const quizNotSubmited = tmp1.quizes.filter( t => !tmp2.includes(t.name));

    quizNotSubmited.forEach( _quiz => {

      this.currentQuizingCandidate = this.candidateService.getCurrentCandidate;
      const tempCandidateResultView = new CandidateQuizResult(null);
      tempCandidateResultView.candidate = this.currentQuizingCandidate;
      tempCandidateResultView.quiz = _quiz;
      tempCandidateResultView.workingTimeMinues = 20;

      this.submit(tempCandidateResultView);
      this.candidateService.setCandidateQuizAssignedSubmited(_quiz);
    });

  }

  onReview(): any {}
  onNextQuiz() {
    const quizesSubmited = this.candidateService.candidateQuizAssignedSubmited.map(
      t => t.name
    );

    const nextQuizName = this.candidateService.candidateQuizAssigned.quizes
      .filter(t => t.name !== this.subject)
      .filter(t => !quizesSubmited.includes(t.name))
      .map(t => t.name);

    if (nextQuizName.length !== 0) {
      this.router.navigate(['/quiz'], {
        queryParams: { subject: nextQuizName[0] }
      });
    } else {
      this.router.navigate(['/summary']);
    }
  }

  submit(quizResult: CandidateQuizResult): any {
    this.userService.submitQuiz(quizResult).subscribe(
      res => {
        if (res === 1) {
          this._service.info(
            'Message',
            'Your assignment are submited, please go to next subject',
            {
              timeOut: 3000,
              showProgressBar: true,
              pauseOnHover: true,
              clickToClose: false,
              clickIconToClose: true
            }
          );
        }
        console.log(res);
      },
      e => {
        console.log(e);
        this._service.error('Oops, Error when submit the quiz', e.Message, {
          timeOut: 3000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });
      }
    );
  }

  redirectCandidateToNextQuestion() {}

  get filteredQuestions() {
    if (this.quiz.questions !== undefined && this.quiz.questions !== null) {
      for (let i = 0; i < this.quiz.questions.length; i++) {
        this.quiz.questions[i].index = i;

        for (let j = 1; j <=  this.quiz.questions[i].answers.length; j++) {
          this.quiz.questions[i].answers[j - 1].index = j;
        }

        this.quiz.questions[i].color = 'rgba(45, 192, 192, 0.363)';
      }
      return this.quiz.questions;
    }
    return undefined;
  }

  async onSelectAnswer(question: Question, answ: Answer) {
    if (this.mode === 'submited') {
      return;
    }

    question.isAnswered = true;

    if (!question.isMultiSelection) {
      // only chọn 1 đáp án
      question.answers.forEach(a => {
        if (a.id !== answ.id) {
          a.hasSelected = false;
        }
      });
    }
    const tmp = this.quiz.questions.findIndex(t => t.id === question.id);

    this.quiz.questions[tmp] = question;
    this.candidateService.setCandidateQuizAssignedItem(this.quiz);
  }

  getAnswered(q: Question) {
    let answerSelected: Answer;
    q.answers.forEach(a => {
      if (a.hasSelected) {
        answerSelected = a;
      }
      return null;
    });
    return answerSelected;
  }

  isAnswered(question: Question) {
    return question.answers.find(a => a.hasSelected)
      ? 'Answered'
      : 'Not Answered';
  }

  isCorrect(question: Question) {
    return question.answers.every(a => a.hasSelected === a.isRightAnswer)
      ? 'correct'
      : 'wrong';
  }

  openSubmitDialog(): void {
    const dialogRef = this.dialog.open(DialogSubmitQuizComponent, {
      width: '600px',
      data: this.quiz
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result === 1) {
        this.preventSubmit = true;
        this.preventNext = false;

        this.currentQuizingCandidate = this.candidateService.getCurrentCandidate;
        const tempCandidateResultView = new CandidateQuizResult(null);
        tempCandidateResultView.candidate = this.currentQuizingCandidate;

        tempCandidateResultView.quiz = this.quiz;
        tempCandidateResultView.workingTimeMinues =
        this.candidateService.getMinutesTotalTimeValue() -
        this.candidateService.getminutesOfTotalTimeRemainingValue();

        this.submit(tempCandidateResultView);
        this.candidateService.setCandidateQuizAssignedSubmited(this.quiz);
      }
    });
  }

  openTimeUpNotificationDialog() {
    const dialogRef = this.dialog.open(TimeUpPopupComponent, {
      width: 'auto',
      data: this.quiz
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      this.router.navigate(['/summary']);
    });
  }
}
