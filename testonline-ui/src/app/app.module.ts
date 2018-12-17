import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavMaterialComponent } from './nav-material/nav-material.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// tslint:disable-next-line:max-line-length
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,


  } from '@angular/material';
import { DashboardMaterialComponent } from './dashboard-material/dashboard-material.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { SummaryComponent } from './summary/summary.component';
import { TableMaterialComponent } from './table-material/table-material.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { DialogSubmitQuizComponent } from './dialog/dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { QuizDashboardComponent } from './quiz-dashboard/quiz-dashboard.component';
import { QuizManageComponent } from './quiz-manage/quiz-manage.component';
import { CandidateManageComponent } from './candidate-manage/candidate-manage.component';
import { AdminNewCandidatePopupComponent } from './admin-new-candidate-popup/admin-new-candidate-popup.component';
import { AdminQuizManagePopupComponent } from './admin-quiz-manage-popup/admin-quiz-manage-popup.component';
import { NewQuizSubjectDialogComponent } from './new-quiz-subject-dialog/new-quiz-subject-dialog.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { QuestionViewDetailPopupComponent } from './question-view-detail-popup/question-view-detail-popup.component';
import { CandidateViewDetailPopupComponent } from './candidate-view-detail-popup/candidate-view-detail-popup.component';
import { TimeUpPopupComponent } from './time-up-popup/time-up-popup.component';
import { CandidateResultSummaryComponent } from './candidate-result-summary/candidate-result-summary.component';
import { GuidelinePopupComponent } from './guideline-popup/guideline-popup.component';
import { TokenInterceptor } from './common/TokenInterceptor';
import { AdminConfigComponent } from './admin/components/admin-config/admin-config.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMaterialComponent,
    DashboardMaterialComponent,
    HomeComponent,
    QuizComponent,
    SummaryComponent,
    TableMaterialComponent,
    LoginComponent,
    DialogSubmitQuizComponent,
    SnackbarComponent,
    AboutComponent,
    ContactComponent,
    FeedbackComponent,
    AdminDashboardComponent,
    QuizDashboardComponent,
    QuizManageComponent,
    CandidateManageComponent,
    AdminNewCandidatePopupComponent,
    AdminQuizManagePopupComponent,
    NewQuizSubjectDialogComponent,
    AdminHistoryComponent,
    QuestionViewDetailPopupComponent,
    CandidateViewDetailPopupComponent,
    TimeUpPopupComponent,
    CandidateResultSummaryComponent,
    GuidelinePopupComponent,
    AdminConfigComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    ChartsModule,
    SimpleNotificationsModule.forRoot(),
    CKEditorModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
  ],
  entryComponents: [
    DialogSubmitQuizComponent,
    SnackbarComponent,
    AdminNewCandidatePopupComponent,
    AdminQuizManagePopupComponent,
    NewQuizSubjectDialogComponent,
    QuestionViewDetailPopupComponent,
    CandidateViewDetailPopupComponent,
    TimeUpPopupComponent,
    GuidelinePopupComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
