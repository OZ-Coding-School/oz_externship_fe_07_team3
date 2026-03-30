import { getMyInfo } from '@/api/mypage'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'

export const MY_INFO_QUERY_KEY = ['my-info']

export const useGetMyInfo = (enabled = true) => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized)

  return useQuery({
    queryKey: MY_INFO_QUERY_KEY,
    queryFn: getMyInfo,
    enabled: enabled && isAuthInitialized && !!accessToken,
  })
}
