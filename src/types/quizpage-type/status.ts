export type ExamStatus = 'pending' | 'activated' | 'closed'

export type ExamStatusResponse = {
  exam_status: ExamStatus
  force_submit: boolean
}
