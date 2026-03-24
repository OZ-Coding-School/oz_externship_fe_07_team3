import type { SubmitPayload } from '@/types/api-request/examRequest'
import type { SubmitExamResponse } from '@/types/api-response/examResponse'
import type { ExamDeploymentListResponse } from '@/types/mypage-type/examDeployment'
import type { QuizData } from '@/types/quizpage-type/question'
import type { ExamStatusResponse } from '@/types/quizpage-type/status'
import type { ResultData } from '@/types/result-type/answer'

import { api } from './api'

export const getExamDeployments =
  async (): Promise<ExamDeploymentListResponse> => {
    const { data } =
      await api.get<ExamDeploymentListResponse>('/exams/deployments')
    return data
  }

export const getExamQuestions = async (
  deploymentId: number
): Promise<QuizData> => {
  const { data } = await api.get<QuizData>(`/exams/deployments/${deploymentId}`)
  return data
}

export const checkExamCode = async (deploymentId: number, code: string) => {
  const { data } = await api.post(
    `/exams/deployments/${deploymentId}/check-code`,
    { code }
  )
  return data
}

export const getExamStatus = async (
  deploymentId: number
): Promise<ExamStatusResponse> => {
  const { data } = await api.get<ExamStatusResponse>(
    `/exams/deployments/${deploymentId}/status`
  )
  return data
}

export const submitExam = async (
  payload: SubmitPayload
): Promise<SubmitExamResponse> => {
  const { data } = await api.post<SubmitExamResponse>(
    '/exams/submissions',
    payload
  )
  return data
}

export const getExamSubmissionResult = async (
  submissionId: number
): Promise<ResultData> => {
  const { data } = await api.get<ResultData>(
    `/exams/submissions/${submissionId}`
  )
  return data
}
