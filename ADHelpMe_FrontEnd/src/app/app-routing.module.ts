import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './_services/auth-guard.service';
import {AdminComponent} from './admin/admin.component';
import {RegisterComponent} from './register/register.component';
import {Role} from './_models/role';
import {QuizHomePageComponent} from "./QuizFrontEnd/quiz-home-page/quiz-home-page.component";
import {QuizComponent} from "./QuizFrontEnd/quiz/quiz.component";
import {NewQuizHomeComponent} from "./QuizFrontEnd/new-quiz-home/new-quiz-home.component";
import {ReviewQuizHomeComponent} from "./QuizFrontEnd/review-quiz-home/review-quiz-home.component";
import {CreateQuizComponent} from "./QuizFrontEnd/create-quiz/create-quiz.component";
import {ReviewQuizComponent} from "./QuizFrontEnd/review-quiz/review-quiz.component";
import {QuizModerationComponent} from "./QuizFrontEnd/quiz-moderation/quiz-moderation.component";

//TODO: add the route to the 'settings' component.

const routes: Routes = [
  {path: '', component: HomeComponent, canActivate: [AuthGuard]}, // TODO: make home page visitable by anyone, this just protects the current PARecord app code
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent },
  {path: 'quizzes', component: QuizHomePageComponent, canActivate: [AuthGuard]},
  {path: 'new-quizzes', component: NewQuizHomeComponent, canActivate: [AuthGuard]},
  {path: 'review-quizzes', component: ReviewQuizHomeComponent, canActivate: [AuthGuard]},
  {path: 'review-quiz', component: ReviewQuizComponent, canActivate: [AuthGuard]},
  {path: 'create-quiz', component: CreateQuizComponent, canActivate: [AuthGuard]},
  {path: 'moderate-quizzes', component: QuizModerationComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},
  {path: 'quiz', component: QuizComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
