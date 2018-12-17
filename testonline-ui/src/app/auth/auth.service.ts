import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../service/user.service';
import { AppConstants } from '../common/app.constants';
import { LogInModel } from '../model/login-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private candidate = new BehaviorSubject<boolean>(false);
  private employee = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    if (localStorage.getItem('currentUser') ) {
      this.loggedIn.next(true);
  }
    return this.loggedIn.asObservable();
  }
  get isCandidate() {

    if (localStorage.getItem('role') === 'Candidate' ) {
      this.candidate.next(true);
  }
    return this.candidate.asObservable();
  }

  get isEmployee() {
    if (localStorage.getItem('role') === 'Employee' ) {
      this.employee.next(true);
  }
    return this.employee.asObservable();
  }


  setLogined(val: boolean) {
    this.loggedIn.next(val);
  }
  setIsCandidate(val: boolean) {
    this.candidate.next(val);
  }

  setIsEmployee(val: boolean) {
    this.employee.next(val);
  }
  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

  login(user: User) {
       const objLogin = new LogInModel(user);
      return this.http.post<any>( AppConstants.base_url + 'Token/CreateToken',  objLogin );
  }

  logout() {
    localStorage.clear();
    this.loggedIn.next(false);
    this.candidate.next(false);
    this.employee.next(false);
    this.router.navigate(['/login']);
  }
}
