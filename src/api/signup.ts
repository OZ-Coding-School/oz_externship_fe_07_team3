import { publicApi } from '@/api/api'
import { APIS_PATHS } from '@/constants/apisPaths'
import type {
  SendEmailVerificationCodeRequest,
  SendEmailVerificationCodeResponse,
  SignupRequest,
  SignupResponse,
  VerifyEmailVerificationCodeRequest,
  VerifyEmailVerificationCodeResponse,
} from '@/types/auth-type/signup'
import { useMutation } from '@tanstack/react-query'
import {
  sendPhoneVerificationCode,
  verifyPhoneVerificationCode,
} from './mypage'

// 이메일 인증 전송
export const useSendEmailVerificationCode = () => {
  return useMutation({
    mutationFn: async (payload: SendEmailVerificationCodeRequest) => {
      const { data } = await publicApi.post<SendEmailVerificationCodeResponse>(
        APIS_PATHS.SEND_EMAIL_VERIFICATION,
        payload
      )
      return data
    },
  })
}

// 이메일 인증 확인
export const useVerifyEmailVerificationCode = () => {
  return useMutation({
    mutationFn: async (payload: VerifyEmailVerificationCodeRequest) => {
      const { data } =
        await publicApi.post<VerifyEmailVerificationCodeResponse>(
          APIS_PATHS.VERIFY_EMAIL_VERIFICATION,
          payload
        )
      return data
    },
  })
}
// 비밀번호 인증 전송
export const useSendPhoneVerificationCode = () => {
  return useMutation({
    mutationFn: sendPhoneVerificationCode,
  })
}

// 비밀번호 확인
export const useVerifyPhoneVerificationCode = () => {
  return useMutation({
    mutationFn: verifyPhoneVerificationCode,
  })
}

// 가입
export const postSignup = async (payload: SignupRequest) => {
  const { data } = await publicApi.post<SignupResponse>(
    APIS_PATHS.SIGNUP,
    payload
  )
  return data
}
