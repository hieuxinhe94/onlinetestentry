import { Quiz } from './quiz';
import { Candidate } from './candidate';
import { CandidateQuizAssigned, CandidateQuizAssign } from './CandidateQuizAssigned';

export class CandidateQuizResult {

  id: number;
  index: number;
  quiz: Quiz;
  candidate: Candidate;
  candidateQuizAssign: CandidateQuizAssign;
  dateSubmited: Date;
  workingTimeMinues: number;

  mark: number;
  answeredQuestionCount: number;
  rightQuestionCount: number;
  totalQuestionCount: number;
  status: number;

  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.index = data.index;
    this.quiz = data.quiz;
    this.dateSubmited = data.dateSubmited;
    this.workingTimeMinues = data.workingTimeMinues;
    this.mark = data.mark;
    this.candidateQuizAssign = data.candidateQuizAssign;
    this.answeredQuestionCount = data.answeredQuestionCount;
    this.rightQuestionCount = data.rightQuestionCount;
    this.totalQuestionCount = data.totalQuestionCount;
    this.status = data.status;
  }
}
