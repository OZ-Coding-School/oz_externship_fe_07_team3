import type {
  DeleteMyAccountRequest,
  EnrolledCourseResponse,
  MyInfoResponse,
  UpdateMyInfoRequest,
} from '@/types'
import { api } from './api'
import { APIS_PATHS } from '@/constants/apisPaths'
import type { ChangePasswordRequest } from '@/types/api-request/myPageRequest'
import type { ChangePasswordResponse } from '@/types/api-response/myPageResponse'

export const getMyInfo = async () => {
  const { data } = await api.get<MyInfoResponse>(APIS_PATHS.GET_MY_INFO)
  return data
}

export const patchMyInfo = async (payload: UpdateMyInfoRequest) => {
  const { data } = await api.patch<MyInfoResponse>(
    APIS_PATHS.PATCH_MY_INFO,
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

export const deleteMyAccount = async (payload: DeleteMyAccountRequest) => {
  const response = await api.delete(APIS_PATHS.DELETE_MY_ACCOUNT, {
    data: payload,
  })

  return response.data
}

export const postChangePassword = async (
  payload: ChangePasswordRequest
): Promise<ChangePasswordResponse> => {
  const { data } = await api.post<ChangePasswordResponse>(
    APIS_PATHS.CHANGE_PASSWORD,
    payload
  )

  return data
}
