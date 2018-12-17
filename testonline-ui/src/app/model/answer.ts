export class Answer {

  id: number;
  index: number;
  questionId: number;
  title: string;
  isRightAnswer: boolean;
  hasSelected: boolean;

  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.index = data.index;
    this.questionId = data.questionId;
    this.title = data.title;
    this.isRightAnswer = data.isRightAnswer;
    this.hasSelected = data.hasSelected;
}
}
