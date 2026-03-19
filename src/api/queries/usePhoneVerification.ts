import { useMutation } from '@tanstack/react-query'
import {
  sendPhoneVerificationCode,
  verifyPhoneVerificationCode,
} from '../mypage'

export const useSendPhoneVerificationCode = () => {
  return useMutation({
    mutationFn: sendPhoneVerificationCode,
  })
}

export const useVerifyPhoneVerificationCode = () => {
  return useMutation({
    mutationFn: verifyPhoneVerificationCode,
  })
}
