import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../service/configuration.service';
import { AppConstants } from '../common/app.constants';

@Component({
  selector: 'itsol-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  // config
  aboutHtml = '';

  constructor(private configService: ConfigurationService) { }

  ngOnInit() {

    this.configService.getConfigs().subscribe(i => {
      if (i !== null) {
        this.aboutHtml = i.filter(t => t.key === AppConstants.GET_ABOUT_COMPANY_NAME)[0].val;
      }
    });
  }
}
