import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'itsol-guideline-popup',
  templateUrl: './guideline-popup.component.html',
  styleUrls: ['./guideline-popup.component.scss']
})
export class GuidelinePopupComponent implements OnInit {

  constructor(  public dialogRef: MatDialogRef<GuidelinePopupComponent>) {


   }

  ngOnInit() {
  }

}
