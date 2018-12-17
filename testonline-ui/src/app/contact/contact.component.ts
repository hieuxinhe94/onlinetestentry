import { Component, OnInit } from '@angular/core';
import { ConfigurationService } from '../service/configuration.service';
import { AppConstants } from '../common/app.constants';

@Component({
  selector: 'itsol-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // config
  contactHtml = '';

  constructor( private configService: ConfigurationService) { }

  ngOnInit() {

    this.configService.getConfigs().subscribe( i => {
      if (i !== null) {
        this.contactHtml = i.filter(t => t.key === AppConstants.GET_CONTACTS_NAME)[0].val;
      }
      });
  }

}
