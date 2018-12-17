import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import { ConfigurationService } from '../service/configuration.service';
import { CandidateService } from '../service/candidate.service';
import { Candidate } from '../model/candidate';
import { Router } from '@angular/router';
import { QuizService } from '../service/quiz.service';
import { NotificationsService } from 'angular2-notifications';
import { ApplicationConfig } from '../model/application-config';

@Component({
  selector: 'itsol-nav-material',
  templateUrl: './nav-material.component.html',
  styleUrls: ['./nav-material.component.css']
})
export class NavMaterialComponent implements OnInit {
  title = 'ITSOL ONLINE TEST TOOLS SYSTEM';
  isHiddenToolbar = false;


  private readonly SHRINK_TOP_SCROLL_POSITION = 15;
  shrinkToolbar = false;
  currentLoginCandidate: Candidate;
  candidateMenus: ApplicationConfig[];
  subjectMenus: ApplicationConfig[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private userService: UserService,
    private quizService: QuizService,
    private candidateService: CandidateService,
    private configService: ConfigurationService,
    changeDetectorRef: ChangeDetectorRef,
    private _service: NotificationsService,
    media: MediaMatcher,
    private router: Router
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;
  isLoggedIn$: Observable<boolean>;
  isCandidate$ = new Observable<boolean>();
  isEmployee$ = new Observable<boolean>();

  isNotStartedExam$: Observable<boolean>;
  isNotStopedExam$: Observable<boolean>;

  // lab
  secondOfTotalTimeRemainingAsync: string;
  minutesOfTotalTimeRemainingAsync: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  private _mobileQueryListener: () => void;

  ngOnInit() {

    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isNotStartedExam$ = this.userService.isNotStartExam;
    this.isNotStopedExam$ = this.userService.isNotStopExam;
    this.isCandidate$ = this.authService.isCandidate;
    this.isEmployee$ = this.authService.isEmployee;

    this.isCandidate$.subscribe(async val => {
      if (val === true) {
        await this.initMenuForCandidate();
      } else {
        this.initMenuForEmployee();
      }
    });
    this.candidateService.setTimeUp(false);

    this.candidateService.getsecondOfTotalTimeRemainingAsync().subscribe((val) => {
      if (val) {
        this.secondOfTotalTimeRemainingAsync = val.toString().padStart(2, '0');
      }

    });
    this.candidateService.getminutesOfTotalTimeRemainingAsync().subscribe((val) => {
      if (val) {
        this.minutesOfTotalTimeRemainingAsync = val.toString().padStart(2, '0');
        if (val === -1) {
          this.candidateService.timeUp();
          this.onTimeUp();
        }
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.candidateService.logout();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  navigateToQuiz(isCandidate: number, item: string) {
    if (isCandidate === 1) {
      this.router.navigate(['/quiz'], {
        queryParams: { 'subject': item },
      });
    } else {
      this.router.navigate(['/quiz-manage'], { queryParams: { 'subject': item } });
    }
  }

  hiddenToolbar() {
    this.isHiddenToolbar = true;
  }

  async initMenuForCandidate() {
    await this.candidateService.getCurrentCandidateInfo().subscribe(
      res => {
        this.currentLoginCandidate = res;
        this.candidateService.setCurrentCandidate(this.currentLoginCandidate);
        localStorage.setItem('currentCandidateId', this.currentLoginCandidate.id.toString());
        this.candidateService
          .getQuizAssigned(this.currentLoginCandidate)
          .subscribe(
            async response => {
              await this.candidateService.setCandidateQuizAssigned(response);
              // this.duration = this.candidateService.getCurrentTimeRemainingOfTheQuizViewing;
              this.candidateMenus = [];
              response.quizes.forEach(i => {
                this.candidateMenus.push(new ApplicationConfig ({ key : i.name, val : i.title}) );
              });
            },
            e => {
              this._service.error('Oops, Error load the quiz assigned to you !', e.message, {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: true,
                clickToClose: false,
                clickIconToClose: true
              });
            }
          );
      },
      e => {

        this._service.error('Oops, Error when get the candidate infomations !', e.message, {
          timeOut: 5000,
          showProgressBar: true,
          pauseOnHover: true,
          clickToClose: false,
          clickIconToClose: true
        });

      }
    );
  }

  async initMenuForEmployee() {
    await this.quizService.getFullQuiz().subscribe(async (res) => {
      if (res !== undefined) {
        await this.quizService.setQuizesDb(res);
        this.subjectMenus = [];
        res.forEach(i => {
          this.subjectMenus.push(new ApplicationConfig ({ key : i.name, val : i.title}) );
        });
      }
    }, (e) => {
      console.log(e);
      this._service.error('Oops, Error when initial menu bar !', e.message, {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: true,
        clickToClose: false,
        clickIconToClose: true
      });
    });
  }

  onTimeUp() {
    this.candidateService.setTimeUp(true);
  }
}
