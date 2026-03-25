import { postEnrollStudent } from '@/api/mypage'
import type { EnrollStudentRequest } from '@/types/api-request/myPageRequest'
import type {
  EnrollStudentResponse,
  ErrorDetailResponse,
} from '@/types/api-response/myPageResponse'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MY_ENROLLED_COURSES_QUERY_KEY } from './useGetMyEnrolledCourses'

export const usePostEnrollStudent = () => {
  const queryClient = useQueryClient()
  return useMutation<
    EnrollStudentResponse,
    ErrorDetailResponse,
    EnrollStudentRequest
  >({
    mutationFn: postEnrollStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: MY_ENROLLED_COURSES_QUERY_KEY,
      })
    },
  })
}
