import { getExamQuestions } from '@/api/exam'
import { useQuery } from '@tanstack/react-query'

export const useExamQuestions = (deploymentId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['examQuestions', deploymentId],
    queryFn: () => getExamQuestions(deploymentId),
    enabled: enabled && !!deploymentId,
  })
}
