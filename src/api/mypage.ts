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
import type {
  ChangePhoneRequest,
  SendPhoneVerificationCodeRequest,
  VerifyPhoneVerificationCodeRequest,
  ChangePhoneResponse,
  SendPhoneVerificationCodeResponse,
  VerifyPhoneVerificationCodeResponse,
} from '@/types/mypage-type/verifyPhone'

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

export const sendPhoneVerificationCode = async (
  payload: SendPhoneVerificationCodeRequest
) => {
  const { data } = await api.post<SendPhoneVerificationCodeResponse>(
    APIS_PATHS.PHONE_VERIFICATION_SEND,
    payload
  )

  return data
}

export const verifyPhoneVerificationCode = async (
  payload: VerifyPhoneVerificationCodeRequest
) => {
  const { data } = await api.post<VerifyPhoneVerificationCodeResponse>(
    APIS_PATHS.PHONE_VERIFICATION_VERIFY,
    payload
  )

  return data
}

export const changePhone = async (payload: ChangePhoneRequest) => {
  const { data } = await api.patch<ChangePhoneResponse>(
    APIS_PATHS.CHANGE_PHONE,
    payload
  )

  return data
}

export type LogoutResponse = {
  detail: string
}

export const logout = async (): Promise<LogoutResponse> => {
  const { data } = await api.post<LogoutResponse>(APIS_PATHS.LOGOUT)
  return data
}
