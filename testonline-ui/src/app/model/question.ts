import { Answer } from './answer';
import { QuestionType } from './question-type';

export class Question {

  id: number;
  quizId: number;
  name: string;
  title: string ;
  content: string ;


  weight: Float32Array;
  questionCategoryId: number ;
  questionType: QuestionType ;
  isMultiSelection: boolean;
  dateCreated: Date;

  answers: Answer[];

  isAnswered = false;

  index: number;
  color: string;
  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.index = data.index;
    this.name = data.name;
    this.title = data.title;
    this.content = data.content;
    this.isMultiSelection = data.isMultiSelection;
    this.weight = data.weight;
    this.questionCategoryId = data.questionCategoryId;
    this.questionType = data.questionType;
    this.dateCreated = data.dateCreated;
    this.answers = data.answers;
    this.isAnswered = data.isAnswered;

  }
}
