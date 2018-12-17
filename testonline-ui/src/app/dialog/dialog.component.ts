import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Quiz } from '../model/quiz';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'itsol-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogSubmitQuizComponent implements OnInit {

  data: any;
  constructor(public dialogRef: MatDialogRef<DialogSubmitQuizComponent>,
    @Inject(MAT_DIALOG_DATA) public _data: Quiz) {
      this.data = _data;
      debugger;
    }

    questionCount: number;
    answerCount = 0;
  ngOnInit() {
     this.questionCount = this._data.questions.length;
     this._data.questions.forEach( (q) => {if (q.isAnswered) {
      this.answerCount ++;
     } });
  }
  onYesClick(): void {
    this.dialogRef.close(1);
  }

  onNoClick(): void {
    this.dialogRef.close(0);
  }
}
