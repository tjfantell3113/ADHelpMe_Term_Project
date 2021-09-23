import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {QuizService} from "../_QuizServices/quiz.service";
import {NotificationService} from "../../_services/notification.service";
import {Quiz} from "../_QuizModels/Quiz";

const TOOLBAR_HEIGHT = 64;

@Component({
  selector: 'app-new-quiz-home',
  templateUrl: './new-quiz-home.component.html',
  styleUrls: ['./new-quiz-home.component.css']
})
export class NewQuizHomeComponent implements OnInit {

  quizzes: Quiz[];
  screenHeight: number;
  filterString = "";
  filter = [];

  constructor(
    private quizService: QuizService,
    private notifService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getQuizzes();
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  getQuizzes() {
    this.quizService.getQuizzes().subscribe(
      quizzes => {
        this.quizzes = quizzes;
      },
      error => {
        this.notifService.showNotif(error.toString(), 'warning'); });
  }

  filterQuizzes() {
    this.filter = this.filterString.split(', ');
    if (this.filter.length > 0 && this.filter[0] !== "") {
      this.quizService.getQuizzes().subscribe(
        quizzes => {
          let newQuizzes: Quiz[] = [];
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
      this.getQuizzes();
    }
  }

  takeQuiz(quizId) {
    this.router.navigate(['quiz'], {
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
}
