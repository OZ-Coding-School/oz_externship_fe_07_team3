export type ExamTabType = 'all' | 'done' | 'pending'
export type ExamStatus = 'done' | 'pending'

export type ExamSubject = {
  id: number
  title: string
  thumbnail_img_url: string | null
}

export type ExamInfo = {
  status: ExamStatus
  score: number | null
  correct_answer_count: number | null
}

export type ExamSummary = {
  id: number
  title: string
  thumbnail_img_url: string
  subject: ExamSubject
}

export type ExamDeploymentItem = {
  id: number
  submission_id: number | null
  exam: ExamSummary
  question_count: number
  total_score: number
  exam_info: ExamInfo
  is_done: boolean
  duration_time: number
}

export type ExamDeploymentListResponse = {
  page: number
  has_next: boolean
  results: ExamDeploymentItem[]
}
