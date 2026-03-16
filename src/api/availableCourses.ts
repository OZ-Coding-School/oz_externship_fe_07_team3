import type { AvailableCourseItem } from '@/types/api-response/course'
import { api } from './api'
import { APIS_PATHS } from '@/constants/apisPaths'

export async function getAvailableCourses() {
  const response = await api.get<AvailableCourseItem[]>(
    APIS_PATHS.AVAILABLE_COURSES
  )

  return response.data
}
