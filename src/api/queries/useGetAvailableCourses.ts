import { useQuery } from '@tanstack/react-query'
import { getAvailableCourses } from '@/api/availableCourses'
import type { AvailableCourseItem } from '@/types/api-response/course'

export const AVAILABLE_COURSES_QUERY_KEY = ['available-courses']

export function useGetAvailableCourses() {
  return useQuery<AvailableCourseItem[]>({
    queryKey: [AVAILABLE_COURSES_QUERY_KEY],
    queryFn: getAvailableCourses,
  })
}
