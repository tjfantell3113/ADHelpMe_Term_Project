import {Question} from "./Question";
import {User} from "../../_models/user";

export class FinishedQuiz {
  id: string
  quizName: string
  description: string
  createdBy: User // TODO: use for filtering quizzes
  author: string
  numCorrect: number
  numQuestions: number
  result: string // TODO: create custom results for quizzes, these may not be classical graded quizzes
  grade: number
  takenBy: User
  questions: Question[]
}
