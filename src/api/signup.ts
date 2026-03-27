import { publicApi } from '@/api/api'
import type {
  SendEmailVerificationCodeRequest,
  SendEmailVerificationCodeResponse,
  VerifyEmailVerificationCodeRequest,
  VerifyEmailVerificationCodeResponse,
  SignupRequest,
  SignupResponse,
} from '@/types/auth-type/signup'

export const postSendEmailVerificationCode = async (
  payload: SendEmailVerificationCodeRequest
) => {
  const { data } = await publicApi.post<SendEmailVerificationCodeResponse>(
    '/accounts/verification/send-email',
    payload
  )

  return data
}

export const postVerifyEmailVerificationCode = async (
  payload: VerifyEmailVerificationCodeRequest
) => {
  const { data } = await publicApi.post<VerifyEmailVerificationCodeResponse>(
    '/accounts/verification/verify-email',
    payload
  )

  return data
}

export const postSignup = async (payload: SignupRequest) => {
  const { data } = await publicApi.post<SignupResponse>(
    '/accounts/signup',
    payload
  )

  return data
}
