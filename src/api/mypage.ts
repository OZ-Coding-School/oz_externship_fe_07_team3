import type {
  EnrolledCourseResponse,
  MyInfoResponse,
  UpdateMyInfoRequest,
} from '@/types'
import { api } from './api'
import { APIS_PATHS } from '@/constants/apisPaths'

export const getMyInfo = async () => {
  const { data } = await api.get<MyInfoResponse>(APIS_PATHS.GET_MY_INFO)
  return data
}

export const patchMyInfo = async (payload: UpdateMyInfoRequest) => {
  const { data } = await api.patch<MyInfoResponse>(
    APIS_PATHS.PATCH_MY_Info,
    payload
  )
  return data
}

export const getMyEnrolledCourses = async () => {
  const { data } = await api.get<EnrolledCourseResponse[]>(
    APIS_PATHS.GET_MY_ENROLLED_COURSES
  )
  return data
}
