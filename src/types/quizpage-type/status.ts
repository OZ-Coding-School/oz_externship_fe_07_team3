export type ExamStatus = 'activated' | 'closed'

export type ExamStatusResponse = {
  exam_status: ExamStatus
  force_submit: boolean
}
