import { Quiz } from './quiz';

export class Summary {
    id: number;
    name: string;
    userId: number;
    quizes: Quiz[];
    dateStart: Date;
    dateEnd: Date;
    totalMark: number;
    totalSubject: number;
    answeredCount: number;
    totalQuestion: number;
    /**
     *
     */
    constructor(data: any) {
      data = data || {};
      this.id = data.id;
      this.name = data.name;
      this.userId = data.userId;
      this.quizes = data.quizes;
      this.dateStart = data.dateStart;
      this.dateEnd = data.dateEnd;
      this.totalMark = data.totalMark;
    }

}
