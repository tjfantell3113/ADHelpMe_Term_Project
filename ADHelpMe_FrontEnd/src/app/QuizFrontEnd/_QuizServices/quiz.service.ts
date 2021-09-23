import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Quiz} from "../_QuizModels/Quiz";
import {FinishedQuiz} from "../_QuizModels/FinishedQuiz";
import {FinishedQuizStats} from "../_QuizModels/FinishedQuizStats";

@Injectable({providedIn: 'root'})
export class QuizService {
  constructor(private http: HttpClient) { }

  getQuizzes() {
    return this.http.get<Quiz[]>(`http://localhost:3030/quiz/getquizzes`);
  }

  getQuiz(quizId: string) {
    return this.http.get<Quiz>(`http://localhost:3030/quiz/getquiz/${quizId}`);
  }

  getOldQuiz(quizId) {
    return this.http.get<FinishedQuiz>(`http://localhost:3030/quiz/getfinishedquiz/${quizId}`);
  }

  getOldQuizzes() {
    return this.http.get<FinishedQuiz[]>(`http://localhost:3030/quiz/getfinishedquizzes`);
  }

  submitAnswers(quiz: Quiz) {
    return this.http.post(`http://localhost:3030/quiz/submitanswers`, quiz);
  }

  submitQuiz(quiz: Quiz) {
    return this.http.post(`http://localhost:3030/quiz/submitnewquiz`, quiz);
  }

  deleteQuiz(quizId) {
    return this.http.delete(`http://localhost:3030/quiz/deletequiz/${quizId}`);
  }

  deleteOldQuiz(quizId) {
    return this.http.delete(`http://localhost:3030/quiz/deleteoldquiz/${quizId}`);
  }

}
