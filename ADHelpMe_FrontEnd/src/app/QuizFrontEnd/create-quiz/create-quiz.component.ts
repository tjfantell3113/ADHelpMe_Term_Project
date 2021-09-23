import {Component, HostListener, OnInit} from '@angular/core';
import {Quiz} from "../_QuizModels/Quiz";
import {QuizService} from "../_QuizServices/quiz.service";
import {NotificationService} from "../../_services/notification.service";
import {Router} from "@angular/router";
import {AuthService} from "../../_services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {Question} from "../_QuizModels/Question";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {QuestionDialogComponent} from "../question-dialog/question-dialog.component";
import {QuestionType} from "../_QuizModels/QuestionType";

const TOOLBAR_HEIGHT = 64;

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  quiz: Quiz;
  screenHeight: number;
  quizForm: FormGroup;
  submitted = false;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private notifService: NotificationService,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.setUpNewQuiz();
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
    this.quizForm = this.formBuilder.group({
      quizName: ['', [Validators.required, Validators.pattern('^[a-zA-Z -_]+$')]],
      quizDescription: ['', [Validators.required, Validators.pattern('^[a-zA-Z.!?,-_1-9 ]+$')]]
    });
  }

  get f() {
    return this.quizForm.controls;
  }

  onSu

  submitQuiz() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.quizForm.invalid || this.quiz.questions.length === 0) {
      return;
    }

    this.loading = true;
    this.quiz.quizName = this.quizForm.value.quizName;
    this.quiz.description = this.quizForm.value.quizDescription;
    this.quizService.submitQuiz(this.quiz)
      .pipe(first())
      .subscribe(
        data => {
          this.notifService.showNotif(data, "success", 4000);
          this.router.navigate(['/new-quizzes']);
        },
        error => {
          console.log('Error:', error);
          this.notifService.showNotif(error);
          this.loading = false;
        });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  setUpNewQuiz() {
    this.quiz = new Quiz();
    //@ts-ignore
    let userId = this.authService.currentUserValue._id;
    this.quiz.createdBy = userId;
    this.quiz.author = this.authService.currentUserValue.username;
    this.quiz.quizName = "";
    this.quiz.description = "";
    this.quiz.questions = [];
  }

  openDialog(questionIndex, title) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let question;
    if (questionIndex == -1) {
      question = undefined;
    } else {
      question = this.quiz.questions[questionIndex]
    }

    dialogConfig.data = {
      title: title,
      question: question
    };

    const dialogRef = this.dialog.open(QuestionDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          if (questionIndex == -1) {
            this.quiz.questions.push(data.question);
          } else {
            this.quiz.questions[questionIndex] = data.question;
          }
        }
      }
    );
  }

  addNewQuestion() {
    this.openDialog(-1, "Create New Question");
  }

  editQuestion(i) {
    this.openDialog(i, "Edit Question");
  }

  deleteQuestion(i) {
    this.quiz.questions.splice(i, 1);
  }

}
