import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Question} from "../_QuizModels/Question";
import {QuestionComponent} from "../question/question.component";
import {FinishedQuiz} from "../_QuizModels/FinishedQuiz";
import {ActivatedRoute, Router} from "@angular/router";
import {QuizService} from "../_QuizServices/quiz.service";
import {NotificationService} from "../../_services/notification.service";
import {AuthService} from "../../_services/auth.service";

const TOOLBAR_HEIGHT = 64;

@Component({
  selector: 'app-review-quiz',
  templateUrl: './review-quiz.component.html',
  styleUrls: ['./review-quiz.component.css']
})
export class ReviewQuizComponent implements OnInit {
  screenHeight: number;
  quiz: FinishedQuiz;
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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (!params.quizId) {
        this.router.navigate(['review-quizzes'])
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  getQuiz(quizId) {
    this.currentQuestionNumber = 1;
    this.quizService.getOldQuiz(quizId).subscribe(quiz => {
      this.quiz = quiz;
      this.totalQuestions = this.quiz.questions.length;
      this.quizLoaded = true;
    })
  }

  begin() {
    this.currentQuestion = this.quiz.questions[0]
    this.quizStarted = true
  }

  goToQuestion(qId) {
    this.currentQuestion = this.quiz.questions[qId - 1];
    this.currentQuestionNumber = qId
    this.questionComponent.setUpQuestion(this.currentQuestion, false)
  }

  getPreviousQuestion() {
    this.currentQuestionNumber = this.currentQuestionNumber - 1
    this.currentQuestion = this.quiz.questions[this.currentQuestionNumber - 1]
    this.questionComponent.setUpQuestion(this.currentQuestion, false)
  }

  getNextQuestion() {
    this.currentQuestionNumber = this.currentQuestionNumber + 1
    this.currentQuestion = this.quiz.questions[this.currentQuestionNumber - 1]
    this.questionComponent.setUpQuestion(this.currentQuestion, false)
  }

  done() {
    this.router.navigate(['review-quizzes'])
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
