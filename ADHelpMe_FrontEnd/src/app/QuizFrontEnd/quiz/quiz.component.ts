import {Component, OnInit, ViewChild, AfterViewInit, HostListener} from '@angular/core';
import {AnswerMultipleChoice} from "../_QuizModels/AnswerMultipleChoice";
import {Question} from "../_QuizModels/Question";
import {QuestionType} from "../_QuizModels/QuestionType";
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../_QuizModels/Quiz";
import {User} from "../../_models/user";
import {QuizService} from "../_QuizServices/quiz.service";
import {NotificationService} from "../../_services/notification.service";
import {QuestionComponent} from "../question/question.component";
import {first} from "rxjs/operators";
import {FinishedQuiz} from "../_QuizModels/FinishedQuiz";
import {AuthService} from "../../_services/auth.service";

const TOOLBAR_HEIGHT = 64;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  screenHeight: number;
  quiz: Quiz;
  currentQuestion: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
  quizStarted: boolean;
  quizLoaded = false;
  @ViewChild(QuestionComponent, {static: false})
  questionComponent: QuestionComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private notifService: NotificationService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (!params.quizId) {
        this.router.navigate(['new-quizzes'])
          .then(navigated => {
            if (!navigated) {
              this.notifService.showNotif('Error going back to quiz page', 'error');
            }
          })
          .catch(err => {
            this.notifService.showNotif(err);
          });
      } else {
        this.getQuiz(params.quizId);
      }
    });
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  getQuiz(quizId) {
    this.currentQuestionNumber = 1;
    this.quizService.getQuiz(quizId).subscribe(quiz => {
      this.quiz = quiz;
      this.totalQuestions = this.quiz.questions.length;
      this.quizLoaded = true;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  begin() {
    this.currentQuestion = this.quiz.questions[0]
    this.quizStarted = true
  }

  saveQuestion(event) {
    this.quiz.questions[this.currentQuestionNumber - 1] = event
  }

  goToQuestion(qId) {
    this.currentQuestion = this.quiz.questions[qId - 1];
    this.currentQuestionNumber = qId
    this.questionComponent.setUpQuestion(this.currentQuestion, true)
  }

  getPreviousQuestion() {
    this.currentQuestionNumber = this.currentQuestionNumber - 1
    this.currentQuestion = this.quiz.questions[this.currentQuestionNumber - 1]
    this.questionComponent.setUpQuestion(this.currentQuestion, true)
  }

  getNextQuestion() {
    this.currentQuestionNumber = this.currentQuestionNumber + 1
    this.currentQuestion = this.quiz.questions[this.currentQuestionNumber - 1]
    this.questionComponent.setUpQuestion(this.currentQuestion, true)
  }

  submit() {
    let finishedQuiz = new FinishedQuiz();
    finishedQuiz.quizName = this.quiz.quizName;
    finishedQuiz.description = this.quiz.description;
    finishedQuiz.createdBy = this.quiz.createdBy;
    finishedQuiz.author = this.quiz.author;
    let numCorrect = 0;
    for (const question of this.quiz.questions) {
      const answer = question.answer as AnswerMultipleChoice;
      if (answer.correctAnswer === answer.userAnswer) {
        numCorrect++;
      }
    }
    finishedQuiz.numCorrect = numCorrect;
    finishedQuiz.numQuestions = this.quiz.questions.length;
    finishedQuiz.grade = ((numCorrect / this.quiz.questions.length) * 100);
    finishedQuiz.result = finishedQuiz.grade > 70 ?
      "You probably have ADHD. Start the diagnosis proccess ASAP!" : "You most likely do not have ADHD.";
    //@ts-ignore
    finishedQuiz.takenBy = this.authService.currentUserValue._id;
    finishedQuiz.questions = this.quiz.questions;
    this.quizService.submitAnswers(finishedQuiz).pipe(first()).subscribe(
      (resp: any) => {
        this.notifService.showNotif(resp);
      }, error => {
        this.notifService.showNotif(error);
      });
    this.router.navigate(['quizzes'])
      .then(navigated => {
        if (!navigated) {
          this.notifService.showNotif('Error going back to quiz page', 'error');
        }
      })
      .catch(err => {
        this.notifService.showNotif(err);
      });
  }

}
