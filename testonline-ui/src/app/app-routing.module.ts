import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { SummaryComponent } from './summary/summary.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FeedbackComponent } from './feedback/feedback.component';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { QuizDashboardComponent } from './quiz-dashboard/quiz-dashboard.component';
import { QuizManageComponent } from './quiz-manage/quiz-manage.component';
import { CandidateManageComponent } from './candidate-manage/candidate-manage.component';
import { AdminHistoryComponent } from './admin-history/admin-history.component';
import { CandidateResultSummaryComponent } from './candidate-result-summary/candidate-result-summary.component';
import { AdminConfigComponent } from './admin/components/admin-config/admin-config.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
  { path: 'quiz-dashboard', component: QuizDashboardComponent,  canActivate: [AuthGuard] },
  { path: 'quiz', component: QuizComponent,  canActivate: [AuthGuard] },
  { path: 'summary', component: SummaryComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacts', component: ContactComponent },
  { path: 'historycal', component: AdminHistoryComponent },
  { path: 'feedbacks', component: FeedbackComponent },
  { path: 'quiz-manage', component: QuizManageComponent, canLoad: [AuthGuard] },
  { path: 'app-setup', component: AdminConfigComponent, canLoad: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canLoad: [AuthGuard] },
  { path: 'candidate-manage', component: CandidateManageComponent, canLoad: [AuthGuard] },
  { path: 'candidate-result-analys', component: CandidateResultSummaryComponent, canLoad: [AuthGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
