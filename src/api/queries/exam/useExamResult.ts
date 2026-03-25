import { getExamResult } from '@/api/exam'
import { useQuery } from '@tanstack/react-query'

export const useExamResult = (
  submissionId: number,
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['examResult', submissionId],
    queryFn: () => getExamResult(submissionId),
    enabled: enabled && !!submissionId,
  })
}
