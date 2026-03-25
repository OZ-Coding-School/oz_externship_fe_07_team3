import { patchMyInfo } from '@/api/mypage'
import type { UpdateMyInfoRequest } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MY_INFO_QUERY_KEY } from './useGetMyInfo'

export const usePatchMyInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateMyInfoRequest) => patchMyInfo(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: MY_INFO_QUERY_KEY })
    },
  })
}
