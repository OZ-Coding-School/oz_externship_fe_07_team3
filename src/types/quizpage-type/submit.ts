export type SubmitExamAnswer = {
  question_id: number
  type: string
  submitted_answer: unknown
}

export type SubmitExamRequest = {
  deployment_id: number
  started_at: string
  cheating_count: number
  answers: SubmitExamAnswer[]
}

export type SubmitExamResponse = {
  submission_id: number
  score: number
  correct_answer_count: number
  redirect_url: string
}
