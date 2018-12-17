import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../service/summary.service';
import { CandidateService } from '../service/candidate.service';

@Component({
  selector: 'itsol-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(
    private summaryService: SummaryService,
    private candidateService: CandidateService,
  ) { }

  ngOnInit() {

  }

}
