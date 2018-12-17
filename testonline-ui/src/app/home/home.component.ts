import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { QuizDashboardComponent } from '../quiz-dashboard/quiz-dashboard.component';
import { ConfigurationService } from '../service/configuration.service';
import { AppConstants } from '../common/app.constants';


@Component({
  selector: 'itsol-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  // config
  config_step1 = '';
  config_step2 = '';
  config_step3 = '';

  constructor(private _formBuilder: FormBuilder,
    private configService: ConfigurationService,
    private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

   this.configService.getConfigs().subscribe( i => {
    if (i !== null) {
      this.config_step1 = i.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU_STEP_1)[0].val;
      this.config_step2 = i.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU_STEP_2)[0].val;
      this.config_step3 = i.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU_STEP_3)[0].val;
    }
    });

  }
  openBottomSheet(): void {
    this.bottomSheet.open(QuizDashboardComponent);
  }

}

