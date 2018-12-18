import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Quiz } from '../model/quiz';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user';
import { AppConstants } from '../common/app.constants';
import { Question } from '../model/question';
import { Answer } from '../model/answer';
import { Subject } from 'src/app/model/subject';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private http: HttpClient) {
  }
  quizAll: Quiz[];

  setQuizesDb (q: Quiz []) {
    this.quizAll = q;
  }
  get getQuizesDb () {

    return this.quizAll;
  }

  getFullQuiz() {
    return this.http.get<Quiz[]>(AppConstants.base_url + 'Quiz' );
  }

 getFullQuizBySubjectName(subject: string) {
    return this.http.get<Quiz>(AppConstants.base_url + 'Quiz/getFullQuizBySubjectName?name=' + subject);
  }

   insertOrUpdateQuestion(question: Question) {
    return this.http.post<any>(AppConstants.base_url + 'Quiz/insertOrUpdateQuestionToQuiz',   question );
  }

 createNewQuiz(subject: Subject) {
    return  this.http.post<any>(AppConstants.base_url + 'Quiz/createNewSubject',   subject);
  }

   insertOrUpdateAnswer(answer: Answer) {
    return  this.http.post<any>(AppConstants.base_url + 'Quiz/insertOrUpdateAnswerToQuestion',   answer);
  }

   deleteQuestion(q: Question) {
    return  this.http.post<any>(AppConstants.base_url + 'Quiz/deleteQuestion',  q.id );
  }

   deleteAnswer(a: Answer) {
    return this.http.post<any>(AppConstants.base_url + 'Quiz/deleteAnswer',   a.id);
  }

}
