import {
  useSendEmailVerificationCode,
  useVerifyEmailVerificationCode,
} from '@/api/signup'
import { getErrorMessage } from '@/utils/getErrorMessage'
import type {
  SendEmailVerificationCodeRequest,
  VerifyEmailVerificationCodeRequest,
} from '@/types/auth-type/signup'

type UseEmailVerificationActionsParams = {
  onSendSuccess?: () => void
  onSendError?: (message: string) => void
  onVerifySuccess?: (emailToken: string) => void
  onVerifyError?: (message: string) => void
}

export const useEmailVerificationActions = ({
  onSendSuccess,
  onSendError,
  onVerifySuccess,
  onVerifyError,
}: UseEmailVerificationActionsParams = {}) => {
  const sendEmailCodeMutation = useSendEmailVerificationCode()
  const verifyEmailCodeMutation = useVerifyEmailVerificationCode()

  const handleSendEmailCode = async ({
    email,
  }: SendEmailVerificationCodeRequest) => {
    try {
      await sendEmailCodeMutation.mutateAsync({ email: email.trim() })

      onSendSuccess?.()
    } catch (error) {
      onSendError?.(getErrorMessage(error, '인증번호 전송에 실패했습니다.'))
      throw error
    }
  }

  const handleVerifyEmailCode = async ({
    email,
    code,
  }: VerifyEmailVerificationCodeRequest) => {
    try {
      const result = await verifyEmailCodeMutation.mutateAsync({
        email: email.trim(),
        code: code.trim(),
      })

      onVerifySuccess?.(result.email_token)

      return result
    } catch (error) {
      const message = getErrorMessage(error, '인증코드가 일치하지 않습니다.')
      onVerifyError?.(message)
      throw error
    }
  }

  return {
    handleSendEmailCode,
    handleVerifyEmailCode,
  }
}
