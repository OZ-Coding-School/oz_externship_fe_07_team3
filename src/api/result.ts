import type { QuizData } from '@/types/quizpage-type/question'
import axios from 'axios'

export async function getResultQuestions(
  deploymentId: number
): Promise<QuizData> {
  const { data } = await axios.get<QuizData>(
    `/api/v1/exams/deployments/${deploymentId}`
  )

  return data
}
