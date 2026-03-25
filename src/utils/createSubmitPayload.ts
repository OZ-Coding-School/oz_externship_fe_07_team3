import type { AnswerMap } from '@/types/answer-type/answer'
import type { SubmitPayload } from '@/types/api-request/examRequest'
import type { QuizData } from '@/types/quizpage-type/question'

type CreateSubmitPayloadParams = {
  deploymentId: number
  startedAt: string
  cheatingCount: number
  quizData: QuizData
  answers: AnswerMap
}

export const createSubmitPayload = ({
  deploymentId,
  startedAt,
  cheatingCount,
  quizData,
  answers,
}: CreateSubmitPayloadParams): SubmitPayload => {
  return {
    deployment_id: deploymentId,
    started_at: startedAt,
    cheating_count: cheatingCount,
    answers: quizData.questions.map((question) => ({
      question_id: question.question_id,
      type: question.type,
      submitted_answer: answers[question.question_id] ?? null,
    })),
  }
}
