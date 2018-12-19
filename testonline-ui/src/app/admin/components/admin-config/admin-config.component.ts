import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ApplicationConfig } from 'src/app/model/application-config';
import { ConfigurationService } from 'src/app/service/configuration.service';
import { NotificationsService } from 'angular2-notifications';
import { AppConstants } from 'src/app/common/app.constants';

@Component({
  selector: 'itsol-admin-config',
  templateUrl: './admin-config.component.html',
  styleUrls: ['./admin-config.component.scss']
})
export class AdminConfigComponent implements OnInit {
  public Editor = ClassicEditor;
  configs: ApplicationConfig[] = [];

  APP_NAME: string;
  VERSION: string;
  ABOUT_COMPANY: string;
  CONTACTS: string;
  GETTING_STARTED_TEXT: string;
  GETTING_STARTED_MENU_STEP_1: string;
  GETTING_STARTED_MENU_STEP_2: string;
  GETTING_STARTED_MENU_STEP_3: string;

  constructor(private configurationService: ConfigurationService,
    private _notificationService: NotificationsService) { }

  ngOnInit() {
    this.initConfigurations();
  }

  initConfigurations() {
    this.configurationService.getConfigs().subscribe( data => {
      if (data) {
        this.APP_NAME = data.filter(t => t.key === AppConstants.GET_APPLICATION_NAME)[0].val;
        this.VERSION = data.filter(t => t.key === AppConstants.GET_VERSION)[0].val;
        this.ABOUT_COMPANY = data.filter(t => t.key === AppConstants.GET_ABOUT_COMPANY_NAME)[0].val;
        this.CONTACTS = data.filter(t => t.key === AppConstants.GET_CONTACTS_NAME)[0].val;
        this.GETTING_STARTED_TEXT = data.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU)[0].val;
        this.GETTING_STARTED_MENU_STEP_1 = data.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU_STEP_1)[0].val;
        this.GETTING_STARTED_MENU_STEP_2 = data.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU_STEP_2)[0].val;
        this.GETTING_STARTED_MENU_STEP_3 = data.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU_STEP_3)[0].val;
      }
      else {
        this.refresh();
      }
    });
  }

  refresh() {
    this.configurationService.getAllConfigurations().subscribe( res => {
      this.configurationService.setConfigs(res);
    }); 
  }

  saveAllConfigurations() {
    let dataToUpdate = [
      new ApplicationConfig ({ key: 'APP_NAME', val: this.APP_NAME }) ,
      new ApplicationConfig ({ key: 'VERSION', val: this.VERSION }) ,
      new ApplicationConfig ({ key: 'ABOUT_COMPANY', val: this.ABOUT_COMPANY }) ,
      new ApplicationConfig ({ key: 'CONTACTS', val: this.CONTACTS }) ,
      new ApplicationConfig ({ key: 'GETTING_STARTED_TEXT', val: this.GETTING_STARTED_TEXT }) ,
      new ApplicationConfig ({ key: 'GETTING_STARTED_MENU_STEP_1', val: this.GETTING_STARTED_MENU_STEP_1 }) ,
      new ApplicationConfig ({ key: 'GETTING_STARTED_MENU_STEP_2', val: this.GETTING_STARTED_MENU_STEP_2 }) ,
      new ApplicationConfig ({ key: 'GETTING_STARTED_MENU_STEP_3', val: this.GETTING_STARTED_MENU_STEP_3 }) ,
    ];

    this.configurationService.updateKeys(dataToUpdate).subscribe(res => {
      this._notificationService.info('Sucessfully', 'The configs were updated.');
      this.refresh();
    }, err => {
      this._notificationService.error('Oops', 'An error ocurred, please try again');
    });
  }

  onYesClick() {
    this.saveAllConfigurations();
    this.refresh();
  }

  onNoClick() {
    this.initConfigurations();
  }

}
