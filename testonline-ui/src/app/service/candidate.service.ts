import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidate } from '../model/candidate';
import { AppConstants } from '../common/app.constants';
import { CandidateQuizAssigned } from '../model/CandidateQuizAssigned';
import { Quiz } from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  public databases = new BehaviorSubject<Candidate[]>(null);
  _databases = this.databases.asObservable();
  interval: any;

  currentCandidate = new Candidate(null);
  candidateQuizAssigned: CandidateQuizAssigned;
  candidateQuizAssignedSubmited: Quiz[] = [];
  isStartedQuiz = false;
  // management time of quizes
  minuteOfTimeRemaining = [];
  secondOfTimeRemaining = [];
  minutesTotalTime = 0;
  nameOfCurrentQuizViewing: string;
  indexOfCurrentQuizViewing = 0;
  timerSecond: any;
  timerMinute: any;

  public secondOfTotalTimeRemainingAsync = new BehaviorSubject<number>(null);
  public minuteOfTotalTimeRemainingAsync = new BehaviorSubject<number>(null);
  public isTimeUp = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  // lab
  getsecondOfTotalTimeRemainingAsync() {
    return this.secondOfTotalTimeRemainingAsync.asObservable();
  }
  getminutesOfTotalTimeRemainingAsync() {
    return this.minuteOfTotalTimeRemainingAsync.asObservable();
  }

  getminutesOfTotalTimeRemainingValue() {
    return this.minuteOfTotalTimeRemainingAsync.value;
  }

  getMinutesTotalTimeValue() {
    return this.minutesTotalTime;
  }

  setTimeUp(val: boolean) {
    this.isTimeUp.next(val);
  }

  getTimeUp() {
    return this.isTimeUp.asObservable();
  }
  setCurrentCandidate(c: Candidate) {
    this.currentCandidate = c;
  }

  get getCurrentCandidate() {
    return this.currentCandidate;
  }

  setCandidateQuizAssigned(c: CandidateQuizAssigned) {
    this.candidateQuizAssigned = c;
   // this.initTotalTime();
  }

  setCandidateQuizAssignedItem(q: Quiz) {
    if (this.candidateQuizAssigned !== undefined) {
      const itemIndex = this.candidateQuizAssigned.quizes.findIndex(item => item.name === q.name);
      this.candidateQuizAssigned.quizes[itemIndex] = q;
    }
  }
  get getCandidateQuizAssigned() {
    return this.candidateQuizAssigned;
  }

  setCandidateQuizAssignedSubmited(q: Quiz) {
    if (!this.candidateQuizAssignedSubmited.map(t => t.name).includes(q.name)) {
      this.candidateQuizAssignedSubmited.push(q);
    } else {
      // update quiz already submited
      const index = this.candidateQuizAssignedSubmited.findIndex(item => item.name === q.name);
      this.candidateQuizAssignedSubmited[index] = q;
    }
  }

  get getCandidateQuizAssignedSubmited() {
    return this.candidateQuizAssignedSubmited;
  }

  get getCandidateQuizAssignedNotSubmited() {
    const tmp = [];
    this.candidateQuizAssigned.quizes.forEach(element => {
      tmp.push(element.name);
    });
    return this.candidateQuizAssignedSubmited.filter(t => !tmp.includes(t.name));
  }

  getData() {
    return this.http.get<Candidate[]>(AppConstants.base_url + 'Candidate');
  }

  insertOrUpdate(candidate: Candidate) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<any>(AppConstants.base_url + 'Candidate/InsertOrUpdate', candidate, { headers });
  }

  delete(c: Candidate) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<any>(AppConstants.base_url + 'Candidate/Delete', c.id, { headers });
  }

  getCurrentCandidateInfo() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get<Candidate>(AppConstants.base_url + 'Candidate/getCandidateByName?name='
      + localStorage.getItem('currentUserName'), { headers });
  }

  getQuizAssigned(c: Candidate) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<CandidateQuizAssigned>(AppConstants.base_url + 'Candidate/GetQuizAssigned', c.id, { headers });
  }
  getQuizAssignedDefault() {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<CandidateQuizAssigned>(AppConstants.base_url + 'Candidate/GetQuizAssigned',
      + localStorage.getItem('currentCandidateId').toString(), { headers });
  }

  setCurrentQuizNameViewing(name: string) {
    if (this.candidateQuizAssigned !== undefined) {
      this.nameOfCurrentQuizViewing = name;
      this.indexOfCurrentQuizViewing = this.candidateQuizAssigned.quizes.findIndex(t => t.name === name);
    }
  }
  get getCurrentQuizNameViewing() {
    return this.nameOfCurrentQuizViewing;
  }

  get getCurrentTimeRemainingOfTheQuizViewing() {
    if (this.isStartedQuiz) {
      return '' + this.minuteOfTimeRemaining[this.indexOfCurrentQuizViewing] + ':'
        + this.secondOfTimeRemaining[this.indexOfCurrentQuizViewing];
    }
    return '' + this.minutesTotalTime.toString() + ':' + '00';
  }

  async onStartViewExam() {
   
    if (this.isStartedQuiz) 
    {
      return;
    }
    this.isStartedQuiz = true;
    // detect the quiz was reloaded, set timer back again
    if (localStorage.getItem('timerSecond') && localStorage.getItem('timerMinute')) {
      this.secondOfTotalTimeRemainingAsync.next(Number.parseFloat(localStorage.getItem('timerSecond')));
      this.minuteOfTotalTimeRemainingAsync.next(Number.parseFloat(localStorage.getItem('timerMinute')));
    }
    else {
      await this.initTotalTime();
    }
    this.timerSecond = setInterval(() => {
      this.tickSecond();
      // cached timer each second
      this.saveTimer();
    }, 1000);
    
  }

  // avoid lost the timer if the user reload the app
  async saveTimer() {
    if (this.timerSecond) {
      localStorage.setItem('timerSecond', this.secondOfTotalTimeRemainingAsync.value.toString())
    }
    if (this.timerMinute) {
      localStorage.setItem('timerMinute', this.minuteOfTotalTimeRemainingAsync.value.toString())
    }
  }

  async onReloadTimer() {
    if (this.timerSecond) {
      clearInterval(this.timerSecond);
    }
    if (this.timerMinute) {
      clearInterval(this.timerMinute);
    }
    localStorage.removeItem('timerSecond');
    localStorage.removeItem('timerMinute');
  }

  tickSecond() {
    let tmpSecond = this.secondOfTotalTimeRemainingAsync.value;
    if (tmpSecond === 0) {
      this.tickMinute();
      tmpSecond = 60;
    }
    tmpSecond -= 1;
    this.secondOfTotalTimeRemainingAsync.next(tmpSecond);
  }

  tickMinute() {
    let tmpMinute = this.minuteOfTotalTimeRemainingAsync.value;
    tmpMinute--;
    this.minuteOfTotalTimeRemainingAsync.next(tmpMinute);
  }

  timeUp() {
    this.secondOfTotalTimeRemainingAsync.complete();
    this.minuteOfTotalTimeRemainingAsync.complete();
  }

  logout() {
    clearInterval(this.timerSecond);
    clearInterval(this.timerMinute);
  }
  // index of quiz also is index of time in the arrays
  initTotalTime() {
    this.minutesTotalTime = 0;
    this.minuteOfTimeRemaining = [];
    this.secondOfTimeRemaining = [];

    if (this.candidateQuizAssigned !== undefined) {
      this.candidateQuizAssigned.quizes.forEach(item => {
        this.minuteOfTimeRemaining.push(0);
        this.secondOfTimeRemaining.push(0);
      });

      for (let i = 0; i < this.candidateQuizAssigned.quizes.length; i++) {
        this.minutesTotalTime += this.candidateQuizAssigned.quizes[i].timeUpMinutes;
      }
      /// lab
      this.minutesTotalTime--;
      this.secondOfTotalTimeRemainingAsync.next(59);
      this.minuteOfTotalTimeRemainingAsync.next(this.minutesTotalTime);
    }
  }



}
