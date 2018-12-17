import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { MatSnackBar } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../service/user.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Router } from '@angular/router';
import { ConfigurationService } from '../service/configuration.service';
import { NotificationsService } from 'angular2-notifications';
import { CandidateService } from '../service/candidate.service';

@Component({
  selector: 'itsol-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private candidateService: CandidateService,
    private configurationService: ConfigurationService,
    public snackBar: MatSnackBar,
    private _notificationService: NotificationsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  async onSubmit() {
    if (this.form.valid) {
      const user = new User(this.form.value);
      await this.authService.login(this.form.value).subscribe(
        async response => {
          if (response.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('currentUserName', user.userName);
            localStorage.setItem('currentToken',response.token);
            localStorage.setItem('role', response.role);
            this.authService.setLogined(true);
            await this.initConfigurations();

            switch (response.role) {

              case 'Employee': {
                this.router.navigate(['admin-dashboard']);
                 this.authService.setIsCandidate(false);
                 this.authService.setIsEmployee(true);
                break;
              }
              case 'Candidate': {
                this.router.navigate(['/']);
                this.authService.setIsCandidate(true);
                this.authService.setIsEmployee(false);
                this.candidateService.onReloadTimer();
                break;
              }
            }
          }
          return response.user;
        },
        error => {
          console.log(error);
          this.message = error.statusText;
          switch (error.status) {
            case 401: { this.message += ' : Username or password is not correct.'; break; }
            case 0: { this.message += ' : Cannot request to the server.'; break; }
          }
          this.authService.setLogined(false);
        }
      );
    }
    this.userService.init();
    
    this.formSubmitAttempt = true;
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 5000,
      data: 'message login show',
      announcementMessage: 'message from login component',
      horizontalPosition: 'center'
    });
  }

  initConfigurations() {
    this.configurationService.getAllConfigurations().subscribe(
      (res) => {
        this.configurationService.setConfigs(res);
      },
      (e) => {
        this._notificationService.error('Error', 'Cannot get the application configuration properties. please try again.');
        this.router.navigate(['/login']);
        console.log(e);
      }
    );
  }

}
