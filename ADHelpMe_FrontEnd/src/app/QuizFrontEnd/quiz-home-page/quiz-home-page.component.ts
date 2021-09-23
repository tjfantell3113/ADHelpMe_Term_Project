import {Component, HostListener, OnInit} from '@angular/core';
import {QuizService} from "../_QuizServices/quiz.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../_services/notification.service";

const TOOLBAR_HEIGHT = 64;

@Component({
  selector: 'app-quiz-home-page',
  templateUrl: './quiz-home-page.component.html',
  styleUrls: ['./quiz-home-page.component.css']
})
export class QuizHomePageComponent implements OnInit {

  screenHeight: number;

  constructor(
    private quizService: QuizService,
    private notifService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenHeight = window.innerHeight - TOOLBAR_HEIGHT;
  }

  goToNewQuizzes() {
    this.router.navigate(['new-quizzes'], {
    })
      .then(navigated => {
        if (!navigated) {
          this.notifService.showNotif('Error going to new quiz page', 'error');
        }
      })
      .catch(err => {
        this.notifService.showNotif(err);
      });
  }

  goToCreateQuizzes() {
    this.router.navigate(['create-quiz'], {
    })
      .then(navigated => {
        if (!navigated) {
          this.notifService.showNotif('Error going to new quiz page', 'error');
        }
      })
      .catch(err => {
        this.notifService.showNotif(err);
      });
  }

  goToOldQuizzes() {
    this.router.navigate(['review-quizzes'], {
    })
      .then(navigated => {
        if (!navigated) {
          this.notifService.showNotif('Error going to review quiz page', 'error');
        }
      })
      .catch(err => {
        this.notifService.showNotif(err);
      });
  }

}
