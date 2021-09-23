import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Question} from "../_QuizModels/Question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  // Using input to get initial question, then ViewChild to update that value
  @Input() question: Question;
  // emitters only have to be set up once, so @Output is fine here
  @Output() answerEmitter = new EventEmitter<Question>();
  enabled: boolean;

  constructor() { }

  ngOnInit(): void {
    // @ts-ignore the quizzes only support multiple choice for now
    if (!this.question.answer.userAnswer) {
      this.enabled = true;
    }
  }

  setUpQuestion(question: Question, enableComponent: boolean) {
    this.question = question
    this.enabled = enableComponent
  }

  saveQuestion(event) {
    this.answerEmitter.emit(this.question)
  }
}
