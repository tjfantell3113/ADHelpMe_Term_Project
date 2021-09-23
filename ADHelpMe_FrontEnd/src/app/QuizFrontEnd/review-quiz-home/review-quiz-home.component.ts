import {Component, HostListener, OnInit} from '@angular/core';
import {QuizService} from "../_QuizServices/quiz.service";
import {NotificationService} from "../../_services/notification.service";
import {Router} from "@angular/router";
import {User} from "../../_models/user";
import {FinishedQuiz} from "../_QuizModels/FinishedQuiz";
import {Quiz} from "../_QuizModels/Quiz";

const TOOLBAR_HEIGHT = 64;

@Component({
  selector: 'app-review-quiz-home',
  templateUrl: './review-quiz-home.component.html',
  styleUrls: ['./review-quiz-home.component.css']
})
export class ReviewQuizHomeComponent implements OnInit {

  quizzes: FinishedQuiz[];
  screenHeight: number;
  filterString = "";
  filter = [];
  constructor(
    private quizService: QuizService,
    private notifService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTakenQuizzes();
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  getTakenQuizzes() {
    this.quizService.getOldQuizzes().subscribe(
      quizzes => {
        this.quizzes = quizzes;
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning'); });
  }

  filterQuizzes() {
    this.filter = this.filterString.split(', ');
    if (this.filter.length > 0 && this.filter[0] !== "") {
      this.quizService.getOldQuizzes().subscribe(
        quizzes => {
          let newQuizzes: FinishedQuiz[] = [];
          for (const quiz of quizzes) {
            const inFilter = this.filter.includes(quiz.author) ||
              this.filter.includes(quiz.quizName);
            if (inFilter) {
              newQuizzes.push(quiz);
            }
          }
          this.quizzes = newQuizzes;
        },
        error => {
          this.notifService.showNotif(error.toString(), 'warning');
        }
      );
    } else {
      this.getTakenQuizzes();
    }
  }

  reviewQuiz(quizId) {
    this.router.navigate(['review-quiz'], {
      queryParams: {
        quizId: quizId
      }
    })
      .then(navigated => {
        if (!navigated) {
          this.notifService.showNotif('Error going to quiz page', 'error');
        }
      })
      .catch(err => {
        this.notifService.showNotif(err);
      });
  }

  deleteQuiz(quizId) {
    this.quizService.deleteOldQuiz(quizId).subscribe(
      msg => {
        this.notifService.showNotif(msg, "success", 4000);
        this.getTakenQuizzes();
      },
      err => {
        this.notifService.showNotif(err, "error", 4000);
      }
    )
  }
}
