export class QuestionType {
  id: number;
  name: string;

  /**
   *
   */
  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.name = data.name;
  }
}
