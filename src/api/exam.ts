import { EXAM_API_PATHS } from '@/constants/apisPaths'
import type { SubmitExamResponse } from '@/types/api-response/examResponse'
import type { ExamDeploymentListResponse } from '@/types/mypage-type/examDeployment'
import type { QuizData } from '@/types/quizpage-type/question'
import type { ExamStatusResponse } from '@/types/quizpage-type/status'
import type { SubmitExamRequest } from '@/types/quizpage-type/submit'
import type { ResultData } from '@/types/result-type/answer'
import { api } from './api'

export const getExamDeployments =
  async (): Promise<ExamDeploymentListResponse> => {
    const { data } = await api.get<ExamDeploymentListResponse>(
      EXAM_API_PATHS.DEPLOYMENTS
    )
    return data
  }

export const getExamQuestions = async (
  deploymentId: number
): Promise<QuizData> => {
  const { data } = await api.get<QuizData>(
    EXAM_API_PATHS.deploymentDetail(deploymentId)
  )
  return data
}

export const checkExamCode = async (deploymentId: number, code: string) => {
  const { data } = await api.post(EXAM_API_PATHS.checkCode(deploymentId), {
    code,
  })
  return data
}

export const getExamStatus = async (
  deploymentId: number
): Promise<ExamStatusResponse> => {
  const { data } = await api.get<ExamStatusResponse>(
    EXAM_API_PATHS.status(deploymentId)
  )
  return data
}

export const submitExam = async (
  payload: SubmitExamRequest
): Promise<SubmitExamResponse> => {
  const { data } = await api.post<SubmitExamResponse>(
    EXAM_API_PATHS.submit,
    payload
  )
  return data
}
export const getExamResult = async (
  submissionId: number
): Promise<ResultData> => {
  const { data } = await api.get<ResultData>(
    EXAM_API_PATHS.result(submissionId)
  )
  return data
}
