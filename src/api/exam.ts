import type { QuizData } from '@/types/quizpage-type/question'
import { api } from './api'

export const getExamQuestions = async (
  deploymentId: number
): Promise<QuizData> => {
  const { data } = await api.get<QuizData>(
    `/exams/deployments/${deploymentId}`,
    {
      headers: {
        Authorization: 'Bearer test-token',
      },
    }
  )
  return data
}
