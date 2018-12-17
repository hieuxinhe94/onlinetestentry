import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ApplicationConfig } from '../model/application-config';
import { AppConstants } from '../common/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configs = new BehaviorSubject<ApplicationConfig[]>(null) ;

  constructor(private http: HttpClient) { }

  setConfigs(val: ApplicationConfig[]) {
    this.configs.next(val);
  }

  getConfigs() {
    return this.configs.asObservable();
  }

  getAllConfigurations() {
    return this.http.get<ApplicationConfig[]>(AppConstants.base_url +'ApplicationConfig');
  }

  getByKey(key: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.get<ApplicationConfig[]>(AppConstants.base_url +
      'ApplicationConfig/GetByKey?key=' + key, {headers});
  }

  addKey(key: string, val: string) {
    const applicationConfig = new ApplicationConfig(null);
    applicationConfig.key = key;
    applicationConfig.val = val;

    const headers = new HttpHeaders().set('content-type', 'application/json');
  return this.http.get<ApplicationConfig[]>(AppConstants.base_url +
    'ApplicationConfig/InsertOrUpdate',  {headers}); }

}

