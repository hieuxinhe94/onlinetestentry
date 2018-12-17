import { Injectable } from '@angular/core';
import { Quiz } from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor() {}

  caculateMark(quiz: Quiz) {
    let rightAnswer = 0;
    quiz.questions.forEach(q => {
      if (q.isAnswered) {
        q.answers.forEach(a => {


          if (a.hasSelected && a.isRightAnswer) {
            rightAnswer++;
          }
        }); }
    });
    return rightAnswer;
  }

  caculateAswered(quiz: Quiz) {
    let answered = 0;
    quiz.questions.forEach(q => {
      if (q.isAnswered) {
        answered++;
      }
    });
    return answered;
  }


}
