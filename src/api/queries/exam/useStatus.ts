import { getExamStatus } from '@/api/exam'
import { useQuery } from '@tanstack/react-query'

export const useStatus = (deploymentId: number, enabled: boolean) => {
  return useQuery({
    queryKey: ['examStatus', deploymentId],
    queryFn: () => getExamStatus(deploymentId),
    enabled,
  })
}
