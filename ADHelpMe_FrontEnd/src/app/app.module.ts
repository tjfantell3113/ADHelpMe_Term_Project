import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { MaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { IgxAvatarModule } from 'igniteui-angular';
import { QuizHomePageComponent } from './QuizFrontEnd/quiz-home-page/quiz-home-page.component';
import { QuizComponent } from './QuizFrontEnd/quiz/quiz.component';
import { QuestionComponent } from './QuizFrontEnd/question/question.component';
import { NewQuizHomeComponent } from './QuizFrontEnd/new-quiz-home/new-quiz-home.component';
import { ReviewQuizHomeComponent } from './QuizFrontEnd/review-quiz-home/review-quiz-home.component';
import { CreateQuizComponent } from './QuizFrontEnd/create-quiz/create-quiz.component';
import { QuestionDialogComponent } from './QuizFrontEnd/question-dialog/question-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { ReviewQuizComponent } from './QuizFrontEnd/review-quiz/review-quiz.component';
import { QuizModerationComponent } from './QuizFrontEnd/quiz-moderation/quiz-moderation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    RegisterComponent,
    QuizHomePageComponent,
    QuizComponent,
    QuestionComponent,
    NewQuizHomeComponent,
    ReviewQuizHomeComponent,
    CreateQuizComponent,
    QuestionDialogComponent,
    ReviewQuizComponent,
    QuizModerationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IgxAvatarModule,
    MatDialogModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [QuestionDialogComponent]
})
export class AppModule {
}
