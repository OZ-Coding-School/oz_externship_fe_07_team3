import { patchMyInfo } from '@/api/mypage'
import type { UpdateMyInfoRequest } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MY_INFO_QUERY_KEY } from './useGetMyInfo'
import { MY_ENROLLED_COURSES_QUERY_KEY } from '../enrolled-student/useGetMyEnrolledCourses'

export const usePatchMyInfo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateMyInfoRequest) => patchMyInfo(payload),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(MY_INFO_QUERY_KEY, updatedData)
      queryClient.invalidateQueries({ queryKey: MY_ENROLLED_COURSES_QUERY_KEY })
    },
  })
}
