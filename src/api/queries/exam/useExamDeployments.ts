import { getExamDeployments } from '@/api/exam'
import { useQuery } from '@tanstack/react-query'

export const useExamDeployments = () => {
  return useQuery({
    queryKey: ['examDeployments'],
    queryFn: getExamDeployments,
  })
}
