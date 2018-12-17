import { Quiz } from './quiz';
import { Summary } from 'src/app/model/summary';

export class Candidate {
  id: number;
  index: number;
  userName: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  email: string;
  status: number;
  createdDate: Date;
  lastActivateDate: Date;

  subjectNames: string [];

  finalScore: number;
  quizes: Quiz[];
  startTime: Date;
  submitTime: Date;
  summary: Summary;

  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.index = data.index;
    this.userName = data.userName;
    this.password = data.password;
    this.subjectNames = data.subjectNames;
    this.phoneNumber = data.phoneNumber;
    this.address = data.address;
    this.status = data.status;
    this.createdDate = data.createdDate;
    this.lastActivateDate = data.lastActivateDate;
    this.finalScore = data.finalScore;
    this.quizes = data.quizes;
    this.startTime = data.startTime;
    this.submitTime = data.submitTime;
    this.summary = data.summary;
  }

}
