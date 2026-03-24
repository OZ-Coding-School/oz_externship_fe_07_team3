import { submitExam } from '@/api/exam'
import type { SubmitExamRequest } from '@/types/quizpage-type/submit'
import { useMutation } from '@tanstack/react-query'

type SubmitExamParams = {
  deploymentId: number
  payload: SubmitExamRequest
}

export const useSubmitExam = () => {
  return useMutation({
    mutationFn: ({ deploymentId, payload }: SubmitExamParams) =>
      submitExam(deploymentId, payload),
  })
}
