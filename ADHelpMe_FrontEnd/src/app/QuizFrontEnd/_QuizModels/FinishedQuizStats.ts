import {User} from "../../_models/user";
import {Question} from "./Question";

export class FinishedQuizStats {
  id: string
  quizName: string
  description: string
  createdBy: User // TODO: use for filtering quizzes
  numCorrect: number
  numQuestions: number
  result: string // TODO: create custom results for quizses, these may not be classical graded quizzes
  grade: number
  takenBy: User
  questions: Question[]
}
