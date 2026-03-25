import { useQuery } from '@tanstack/react-query'
import { getMyInfo } from '@/api/auth'

export const useMyInfo = () => {
  return useQuery({
    queryKey: ['myInfo'],
    queryFn: getMyInfo,
    enabled: false,
  })
}
