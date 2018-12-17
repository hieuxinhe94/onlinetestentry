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
    this.configurationService.getConfigs().subscribe(i => {
      if (i !== null) {
        this.APP_NAME = i.filter(t => t.key === AppConstants.GET_APPLICATION_NAME)[0].val;
        this.VERSION = i.filter(t => t.key === AppConstants.GET_VERSION)[0].val;
        this.ABOUT_COMPANY = i.filter(t => t.key === AppConstants.GET_ABOUT_COMPANY_NAME)[0].val;
        this.CONTACTS = i.filter(t => t.key === AppConstants.GET_CONTACTS_NAME)[0].val;
        this.GETTING_STARTED_TEXT = i.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU)[0].val;
        this.GETTING_STARTED_MENU_STEP_1 = i.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU_STEP_1)[0].val;
        this.GETTING_STARTED_MENU_STEP_2 = i.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU_STEP_2)[0].val;
        this.GETTING_STARTED_MENU_STEP_3 = i.filter(t => t.key === AppConstants.GET_GETTING_STARTED_MENU_STEP_3)[0].val;
      }
    });
  }

  SaveAllConfigurations() {

  }

  onYesClick() {
    this.SaveAllConfigurations();
  }

  onNoClick() {
    this.initConfigurations();
  }

}
