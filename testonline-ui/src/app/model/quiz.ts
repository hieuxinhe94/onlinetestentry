import { QuizConfig } from './quiz-config';
import { Question } from './question';

export class Quiz {

  id: number;
  title: string;
  index: number;
  userId: number ;
  name: string;
  description: string;
  config: QuizConfig;
  date: Date;
  timeUpMinutes: number;
  status: number;
  questions: Question[];

  constructor(data: any) {
    if (data) {
        this.id = data.id;
        this.title = data.title;
        this.index = data.index;
        this.userId = data.userId;
        this.name = data.name;
        this.status = data.status;
        this.timeUpMinutes = data.timeUpMinutes;
        this.description = data.description;
        this.config = new QuizConfig(data.config);
        this.questions = [];
        data.questions.forEach(q => {
            this.questions.push(new Question(q));
        });
    }
  }

}
