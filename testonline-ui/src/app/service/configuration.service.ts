import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ApplicationConfig } from '../model/application-config';
import { AppConstants } from '../common/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  configs = new BehaviorSubject<ApplicationConfig[]>(null);

  configurations: ApplicationConfig[] = []; 
  
  constructor(private http: HttpClient) { }

  setConfigs(val: ApplicationConfig[]) {
    this.configurations = val;
    this.configs.next(val);
  }

  get getConfigurations () {
    return this.configurations;
  }
  
  getConfigs() {
   return this.configs.asObservable();
  }

  getAllConfigurations() {
    return this.http.get<ApplicationConfig[]>(AppConstants.base_url + 'ApplicationConfig');
  }

  getByKey(key: string) {

    return this.http.get<ApplicationConfig[]>(AppConstants.base_url +
      'ApplicationConfig/GetByKey?key=' + key);
  }

  addKey(key: string, val: string) {
    const applicationConfig = new ApplicationConfig(null);
    applicationConfig.key = key;
    applicationConfig.val = val;


    return this.http.get<ApplicationConfig[]>(AppConstants.base_url +
      'ApplicationConfig/InsertOrUpdate');
  }

  updateKeys(configs: ApplicationConfig[]) {
    let data = {
      ApplicationConfigs: configs
    };

    return this.http.post<any>(AppConstants.base_url +
      'ApplicationConfig/InsertOrUpdateAll', data);
  }
}
