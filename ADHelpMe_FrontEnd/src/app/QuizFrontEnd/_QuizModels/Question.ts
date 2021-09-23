import {QuestionType} from "./QuestionType";
import {AnswerMultipleChoice} from "./AnswerMultipleChoice";
import {AnswerDropDown} from "./AnswerDropDown";
import {AnswerMultipleSelect} from "./AnswerMultipleSelect";
import {AnswerMatch} from "./AnswerMatch";
import {AnswerText} from "./AnswerText";


export class Question {
  type: QuestionType
  title: string
  subText: string
  answer: (AnswerMultipleChoice | AnswerDropDown | AnswerMultipleSelect | AnswerMatch | AnswerText)
}
