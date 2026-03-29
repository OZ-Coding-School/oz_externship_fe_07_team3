import type { QuizQuestionType } from '../quizpage-type/question'

export type ResultAnswer = string | string[] | null

export type ResultQuestion = {
  id: number
  type: QuizQuestionType
  question: string
  point: number
  prompt: string | null
  blank_count: number | null
  options: string[]
  submitted_answer: ResultAnswer
  answer: ResultAnswer
  explanation: string | null
  is_correct: boolean
}

export type ResultData = {
  id: number
  submitter_id: number
  deployment_id: number
  exam: {
    id: number
    title: string
    thumbnail_img_url: string
  }
  questions: ResultQuestion[]
  cheating_count: number
  total_score: number
  correct_answer_count: number
  elapsed_time: number
  started_at: string
  submitted_at: string
}
