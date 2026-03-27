import { publicApi } from '@/api/api'
import type {
  SendEmailVerificationCodeRequest,
  SendEmailVerificationCodeResponse,
  VerifyEmailVerificationCodeRequest,
  VerifyEmailVerificationCodeResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/auth-type/signup'

const SIGNUP_ENDPOINTS = {
  SEND_EMAIL: '/accounts/verification/send-email',
  VERIFY_EMAIL: '/accounts/verification/verify-email',
  SIGNUP: '/accounts/signup',
} as const

export const postSendEmailVerificationCode = async (
  payload: SendEmailVerificationCodeRequest
) => {
  const { data } = await publicApi.post<SendEmailVerificationCodeResponse>(
    SIGNUP_ENDPOINTS.SEND_EMAIL,
    payload
  )

  return data
}

export const postVerifyEmailVerificationCode = async (
  payload: VerifyEmailVerificationCodeRequest
) => {
  const { data } = await publicApi.post<VerifyEmailVerificationCodeResponse>(
    SIGNUP_ENDPOINTS.VERIFY_EMAIL,
    payload
  )

  return data
}

export const postSignup = async (payload: SignupRequest) => {
  const { data } = await publicApi.post<SignupResponse>(
    SIGNUP_ENDPOINTS.SIGNUP,
    payload
  )

  return data
}
