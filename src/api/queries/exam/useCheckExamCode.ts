import { checkExamCode } from '@/api/exam'
import { useMutation } from '@tanstack/react-query'

export const useCheckExamCode = () => {
  return useMutation({
    mutationFn: ({
      deploymentId,
      entryCode,
    }: {
      deploymentId: number
      entryCode: string
    }) => checkExamCode(deploymentId, entryCode),
  })
}
