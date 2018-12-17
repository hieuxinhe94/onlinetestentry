import { HttpHeaders } from '@angular/common/http';

export class AppConstants {
  public static get base_url(): string {
    return 'http://localhost:56789/api/';
  }
  public static get headers(): HttpHeaders {
    return new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', localStorage.getItem('token'));
  }

  public static get GET_APPLICATION_NAME(): string {
    return 'APP_NAME';
  }
  public static get GET_GETTING_STARTED_MENU(): string {
    return 'GETTING_STARTED_MENU';
  }
  public static get GET_ABOUT_COMPANY_NAME(): string {
    return 'ABOUT_COMPANY';
  }
  public static get GET_CONTACTS_NAME(): string {
    return 'CONTACTS';
  }
  public static get GET_GETTING_STARTED_MENU_STEP_1(): string {
    return 'GETTING_STARTED_MENU_STEP_1';
  }
  public static get GET_GETTING_STARTED_MENU_STEP_2(): string {
    return 'GETTING_STARTED_MENU_STEP_2';
  }
  public static get GET_GETTING_STARTED_MENU_STEP_3(): string {
    return 'GETTING_STARTED_MENU_STEP_3';
  }
  ///



  ///
  public static get GET_VERSION(): string {
    return 'VERSION';
  }
}
