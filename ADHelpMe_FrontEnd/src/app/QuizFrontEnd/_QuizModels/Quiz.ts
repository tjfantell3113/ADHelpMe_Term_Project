import {User} from "../../_models/user";
import {Question} from "./Question";

export class Quiz {
  id: string
  quizName: string
  description: string
  createdBy: User // TODO: use for filtering quizzes
  author: string
  questions: Question[]
}
