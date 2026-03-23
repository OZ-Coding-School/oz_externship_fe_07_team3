import type { QuizQuestionType } from '../quizpage-type/question'

export type ResultAnswer = string | string[] | null

export type ResultQuestion = {
  question_id: number
  number: number
  type: QuizQuestionType
  question: string
  point: number
  prompt: string | null
  blank_count: number | null
  options: string[] | null
  user_answer: ResultAnswer
  correct_answer: ResultAnswer
  explanation: string | null
  is_correct: boolean
  earned_point: number
}

export type ResultData = {
  exam_id: number
  exam_name: string
  duration_time: number
  elapsed_time: number
  cheating_count: number
  total_score: number
  questions: ResultQuestion[]
}
