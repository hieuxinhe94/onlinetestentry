import { Candidate } from './candidate';
import { Quiz } from './quiz';

export interface CandidateQuizAssigned {

  candidateId: number;
  candidate: Candidate;
  quizId: number;
  quizes: Quiz[];
  dateStart: Date;
  dateExprire: Date;
  status: boolean;


}

export interface CandidateQuizAssign {

  candidateId: number;
  candidate: Candidate;
  quizId: number;
  quiz: Quiz;
  dateStart: Date;
  dateExprire: Date;
  status: boolean;


}
