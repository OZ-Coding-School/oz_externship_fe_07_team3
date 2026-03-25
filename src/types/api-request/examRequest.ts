import type { AnswerValue } from '@/types/answer-type/answer'
import type { QuizQuestionType } from '@/types/quizpage-type/question'

export type SubmitAnswerItem = {
  question_id: number
  type: QuizQuestionType
  submitted_answer: AnswerValue
}

export type SubmitPayload = {
  deployment_id: number
  started_at: string
  cheating_count: number
  answers: SubmitAnswerItem[]
}
