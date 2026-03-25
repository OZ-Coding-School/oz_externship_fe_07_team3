export type ExamTabType = 'all' | 'done' | 'pending'
export type ExamStatus = 'done' | 'pending'
export type ExamDeploymentItem = {
  id: number
  submission_id: number | null
  exam: {
    id: number
    title: string
    thumbnail_img_url: string
    subject: {
      id: number
      title: string
      thumbnail_img_url: string | null
    }
  }
  question_count: number
  total_score: number
  exam_info: {
    status: ExamStatus
    score: number | null
    correct_answer_count: number | null
  }
  is_done: boolean
  duration_time: number
}

export type ExamDeploymentListResponse = {
  page: number
  has_next: boolean
  results: ExamDeploymentItem[]
}
