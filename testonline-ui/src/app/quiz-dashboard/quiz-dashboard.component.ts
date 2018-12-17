import { Component, OnInit } from '@angular/core';
import { Subject } from '../model/subject';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { Quiz } from '../model/quiz';
import { CandidateService } from '../service/candidate.service';
import { CandidateQuizAssigned } from '../model/CandidateQuizAssigned';

@Component({
  selector: 'itsol-quiz-dashboard',
  templateUrl: './quiz-dashboard.component.html',
  styleUrls: ['./quiz-dashboard.component.scss']
})
export class QuizDashboardComponent implements OnInit {

  isNotSelectedSubject = false;
  subjects: Subject[];
  candidateQuizesAssigned: CandidateQuizAssigned;
  constructor(
    private userService: UserService,
    private candidateService: CandidateService,
    private router: Router
    ) { }

  ngOnInit() {
    this.isNotSelectedSubject = true;
    this.candidateService.getQuizAssignedDefault().subscribe ( (res) => {
    this.candidateQuizesAssigned = res;
    },
    (e) => {

    });
  }

  onSelectSubject(subject: string) {
    this.isNotSelectedSubject = false;
    this.router.navigate(['/quiz'], {
      queryParams: {'subject': subject},
   });
  }
}
