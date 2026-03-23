import { getMyEnrolledCourses } from '@/api/mypage'
import { useQuery } from '@tanstack/react-query'

export const MY_ENROLLED_COURSES_QUERY_KEY = ['my-enrolled-courses']

export const useGetMyEnrolledCourses = () => {
  return useQuery({
    queryKey: MY_ENROLLED_COURSES_QUERY_KEY,
    queryFn: getMyEnrolledCourses,
  })
}
