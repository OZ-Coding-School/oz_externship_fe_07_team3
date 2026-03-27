import { publicApi } from '@/api/api'
import { APIS_PATHS } from '@/constants/apisPaths'
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
    APIS_PATHS.SEND_EMAIL_VERIFICATION,
    payload
  )
  return data
}

export const postVerifyEmailVerificationCode = async (
  payload: VerifyEmailVerificationCodeRequest
) => {
  const { data } = await publicApi.post<VerifyEmailVerificationCodeResponse>(
    APIS_PATHS.VERIFY_EMAIL_VERIFICATION,
    payload
  )
  return data
}

export const postSignup = async (payload: SignupRequest) => {
  const { data } = await publicApi.post<SignupResponse>(
    APIS_PATHS.SIGNUP,
    payload
  )
  return data
}
