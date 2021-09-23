import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Question} from "../_QuizModels/Question";
import {QuestionType} from "../_QuizModels/QuestionType";
import {AnswerMultipleChoice} from "../_QuizModels/AnswerMultipleChoice";
import {AnswerMultipleSelect} from "../_QuizModels/AnswerMultipleSelect";
import {AnswerMatch} from "../_QuizModels/AnswerMatch";
import {AnswerDropDown} from "../_QuizModels/AnswerDropDown";
import {AnswerText} from "../_QuizModels/AnswerText";

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

  form: FormGroup;
  questionBuilderTitle: string;
  title: string;
  description: string;
  question: Question;
  type: QuestionType;
  answer: (AnswerMultipleChoice | AnswerDropDown | AnswerMultipleSelect | AnswerMatch | AnswerText);
  newAnswer: string;
  answerReady = false;
  submitted = false;
  // not enough time to add other question types
  questionTypes = [
    { value: QuestionType.multipleChoice, text: 'Multiple Choice' }//,
    // { value: QuestionType.multipleSelect, text: 'Multiple Select' },
    // { value: QuestionType.dropDown, text: 'Drop Down' },
    // { value: QuestionType.match, text: 'Match' },
    // { value: QuestionType.text, text: 'Text' }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data)
  {
    this.questionBuilderTitle = data.title;
    if (data.question){
      this.question = data.question;
      this.title = data.question.title;
      this.description = data.question.subText;
      this.type = data.question.type;
      this.answer = data.question.answer;
      this.answerReady = true;
    } else {
      this.question = new Question();
    }
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: [this.title, [Validators.required]],
      description: [this.description, [Validators.required]],
      type: [this.type, [Validators.required]]
    });
  }

  changeAnswerType(type) {
    switch (type) {
      case QuestionType.multipleChoice:
        let answer = new AnswerMultipleChoice();
        answer.choices = [this.newAnswer];
        answer.correctAnswer = this.newAnswer;
        this.answer = answer;
        this.answerReady = true;
        break;
      case QuestionType.multipleSelect:
        this.question.answer = new AnswerMultipleSelect();
        break;
      case QuestionType.match:
        this.question.answer = new AnswerMatch();
        break;
      case QuestionType.dropDown:
        this.question.answer = new AnswerDropDown();
        break;
      case QuestionType.text:
        this.question.answer = new AnswerText();
        break;
    }
  }

  get f() {
    return this.form.controls;
  }

  setCorrectMCAnswer(correct) {
    let answer = this.answer as AnswerMultipleChoice;
    answer.correctAnswer = correct;
    this.answer = answer;
  }

  deleteMCAnswer(i) {
    let answer = this.answer as AnswerMultipleChoice;
    answer.choices.splice(i, 1);
  }

  addMCAnswer() {
    if (!this.answer) {
      this.answerReady = false;
      this.changeAnswerType(this.form.value.type);
      console.log(this.answer);
    } else {
      let answer = this.answer as AnswerMultipleChoice;
      if (!answer.choices.includes(this.newAnswer)) {
        answer.choices.push(this.newAnswer);
        this.answer = answer;
      }
    }
  }

  save() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.question.title = this.form.value.title;
    this.question.subText = this.form.value.description;
    this.question.type = this.form.value.type;
    this.question.answer = this.answer;
    this.dialogRef.close({question: this.question});
  }

  close() {
    this.dialogRef.close();
  }
}
