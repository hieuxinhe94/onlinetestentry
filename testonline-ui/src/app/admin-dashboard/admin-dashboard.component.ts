import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'itsol-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    // Radar
    public radarChartLabels: string[] = ['Java', 'English', 'IQ', 'GMAT', 'NET', 'ANDROID'];
    public radarChartData: any = [
      {data: [50, 50, 50, 50, 50, 50], label: 'Candidate test result graph.'}
    ];
  public radarChartType = 'radar';
  cards = [
    { id : 1, subject: 'java' , max: 'no count', avg: 'no count'},
    { id : 2, subject: 'english' , max: 'no count', avg: 'no count'},
    { id : 3, subject: 'gmat' , max: 'no count', avg: 'no count'},
    { id : 4, subject: 'iq' , max: 'no count', avg: 'no count'},
    { id : 5, subject: 'dotnet' , max: 'no count', avg: 'no count'},
    { id : 6, subject: 'android' , max: 'no count', avg: 'no count'},
  ];

  constructor() { }

  ngOnInit() {
  }

    // events
    public chartClicked(e: any): void {
      console.log(e);
    }

    public chartHovered(e: any): void {
      console.log(e);
    }
}
