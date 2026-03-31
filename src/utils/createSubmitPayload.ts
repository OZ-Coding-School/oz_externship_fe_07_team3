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
    answers: quizData.questions.map((q) => {
      const userAnswer = answers[q.question_id]

      // ORDERING 처리
      if (q.type === 'ORDERING' && Array.isArray(userAnswer)) {
        const converted = userAnswer.map((label: string) => {
          if (!/^[A-Z]$/.test(label)) {
            return label
          }

          const index = label.charCodeAt(0) - 65
          return q.options?.[index] ?? ''
        })

        return {
          question_id: q.question_id,
          type: q.type,
          submitted_answer: converted,
        }
      }

      // 나머지 타입 그대로
      return {
        question_id: q.question_id,
        type: q.type,
        submitted_answer: userAnswer,
      }
    }),
  }
}
