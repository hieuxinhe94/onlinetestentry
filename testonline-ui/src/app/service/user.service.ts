import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../model/quiz';
import { Subject } from '../model/subject';
import { AppConstants } from '../common/app.constants';
import { CandidateQuizResult } from '../model/candidate-quiz-result';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private  httpClient:  HttpClient) {

   }

  private notStartedExam = new BehaviorSubject<boolean>(false);
  private notStopedExam = new BehaviorSubject<boolean>(false);

  private quizes = new BehaviorSubject<Quiz[]>(null);
  _quizes = this.quizes.asObservable();
  private submitedQuizs = new BehaviorSubject<Quiz[]>(null);
  _submitedQuizs = this.submitedQuizs.asObservable();

  getContacts() {
    return  this.httpClient.get(`/contacts`);
  }
  init() {
    this.notStartedExam.next(true);
    this.notStopedExam.next(true);
  }



 get isNotStartExam() {

  if (localStorage.getItem('isStartedExam')) {
    this.notStartedExam.next(false);
  }
  return this.notStartedExam.asObservable();
  }

  get isNotStopExam() {
   if (localStorage.getItem('isStopedExam')) {
     this.notStartedExam.next(false);
   }
   return this.notStartedExam.asObservable();
   }

  startExam() {
    localStorage.setItem('isStartedExam', new Date().getTime().toString()) ;
    this.notStartedExam.next(false);
  }
  stopExam() {
    localStorage.setItem('isStopedExam', new Date().getTime().toString()) ;
    this.notStopedExam.next(false);
  }

  doQuiz( q: Quiz) {
    if (this.quizes.value == null ) {
      this.quizes.next([q]);
    } else {
      this.quizes.value.push(q);
    }

    // localStorage.setItem('userQuized',this.quizes.value);
  }

  submitQuiz( quizSubmitting: CandidateQuizResult ) {
    // post to http api
    // if (this.submitedQuizs.value == null) {
    //   this.submitedQuizs.next([quizSubmitting]);
    // } else {
    //   this.submitedQuizs.value.push(quizSubmitting);
    //   this.submitedQuizs.next(this.submitedQuizs.value);
    // }

    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.httpClient.post<any>(AppConstants.base_url + 'Quiz/submitQuizByCandidate',   quizSubmitting , { headers});
  }

   canSubmit (q: Quiz) {

     if (this.submitedQuizs.value !== null) {
       if ( this.submitedQuizs.value.find(sq => sq.id === q.id ))  {
        return false;
      }
    }
      return true;
  }


}
