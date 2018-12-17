import { Injectable } from '@angular/core';
import { AppConstants } from '../common/app.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandidateQuizResult } from '../model/candidate-quiz-result';
import { CandidateQuizAssigned } from '../model/CandidateQuizAssigned';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  candidateQuizResult: CandidateQuizResult[];
  constructor(
    private http: HttpClient
  ) { }

  get getCandidateQuizResult() {
    return this.candidateQuizResult;
  }
  setCandidateQuizResult(_candidateQuizResult: CandidateQuizResult[]) {
     this.candidateQuizResult = _candidateQuizResult;
  }
  getAllQuizAssignned () {
    return this.http.get<CandidateQuizAssigned[]>(AppConstants.base_url +
       'Summary/GetAllQuizAssigned');
  }
  getAllQuizSubmitedResult () {
    return this.http.get<CandidateQuizResult[]>(AppConstants.base_url +
      'Summary/GetAllQuizAssignedResult');
  }

  getQuizSubmitedResultByCandidate (candidateName: string) {
    return this.http.get<CandidateQuizResult[]>(AppConstants.base_url +
      'Summary/GetAllQuizAssignedResultByCandidateName?candidateName=' + candidateName);
  }

}
