import { useQuery } from '@tanstack/react-query'
import { getMyEnrolledCourses } from '../mypage'

export const MY_ENROLLED_COURSES_QUERY_KEY = ['my-enrolled-courses']

export const useGetMyEnrolledCourses = () => {
  return useQuery({
    queryKey: MY_ENROLLED_COURSES_QUERY_KEY,
    queryFn: getMyEnrolledCourses,
  })
}
