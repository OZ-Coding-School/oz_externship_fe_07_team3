import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

import { usePhoneVerification } from '@/hooks/usePhoneVerification'

type Step = 'input' | 'reset'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,15}$/

export type FindPasswordHandlers = {
  onSendCode: (params: { email: string }) => Promise<void> | void
  onVerifyCode: (params: { code: string }) => Promise<void> | void
  onResetPassword: (params: {
    email: string
    newPassword: string
  }) => Promise<void> | void
}

type UseFindPasswordParams = {
  isOpen: boolean
  handlers: FindPasswordHandlers
}

export const useFindPassword = ({
  isOpen,
  handlers,
}: UseFindPasswordParams) => {
  const [step, setStep] = useState<Step>('input')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [inputErrorMessage, setInputErrorMessage] = useState('')
  const [resetErrorMessage, setResetErrorMessage] = useState('')
  const [isCompletePopupOpen, setIsCompletePopupOpen] = useState(false)

  const {
    code,
    isCodeSent,
    isCodeVerified,
    codeErrorMessage,
    formattedTime,
    handleCodeChange,
    resetVerification,
    markCodeSent,
    markCodeVerified,
    setVerificationError,
    validateBeforeVerify,
    validateBeforeSubmit,
  } = usePhoneVerification()

  useEffect(() => {
    if (!isOpen) {
      setStep('input')
      setEmail('')
      setNewPassword('')
      setConfirmPassword('')
      setInputErrorMessage('')
      setResetErrorMessage('')
      setIsCompletePopupOpen(false)
      resetVerification()
    }
  }, [isOpen, resetVerification])

  const clearInputErrorMessage = () => {
    if (inputErrorMessage) {
      setInputErrorMessage('')
    }
  }

  const clearResetErrorMessage = () => {
    if (resetErrorMessage) {
      setResetErrorMessage('')
    }
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    clearInputErrorMessage()
  }

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value)
    clearResetErrorMessage()
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    clearResetErrorMessage()
  }

  const validateEmail = () => {
    if (!email.trim()) {
      setInputErrorMessage('이메일을 입력해주세요.')
      return false
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setInputErrorMessage('올바른 이메일 형식을 입력해주세요.')
      return false
    }

    return true
  }

  const validatePassword = () => {
    if (!newPassword.trim()) {
      setResetErrorMessage('새 비밀번호를 입력해주세요.')
      return false
    }

    if (!confirmPassword.trim()) {
      setResetErrorMessage('비밀번호를 다시 입력해주세요.')
      return false
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      setResetErrorMessage('비밀번호 형식이 올바르지 않습니다.')
      return false
    }

    if (newPassword !== confirmPassword) {
      setResetErrorMessage('비밀번호가 일치하지 않습니다.')
      return false
    }

    return true
  }

  const handleSendCode = async () => {
    if (!validateEmail()) {
      return
    }

    setInputErrorMessage('')

    try {
      await handlers.onSendCode({ email })
      markCodeSent()
      toast.success('전송 완료! 이메일을 확인해주세요.')
    } catch (error) {
      if (error instanceof Error) {
        setInputErrorMessage(error.message)
        return
      }

      setInputErrorMessage('인증코드 전송에 실패했습니다.')
    }
  }

  const handleVerifyCode = async () => {
    if (!validateBeforeVerify()) {
      return
    }

    try {
      await handlers.onVerifyCode({ code })
      markCodeVerified()
      setInputErrorMessage('')
    } catch (error) {
      if (error instanceof Error) {
        setVerificationError(error.message)
        return
      }

      setVerificationError('인증번호 확인에 실패했습니다.')
    }
  }

  const handleNextStep = () => {
    if (!validateEmail()) {
      return
    }

    if (!validateBeforeSubmit()) {
      return
    }

    setInputErrorMessage('')
    setStep('reset')
  }

  const handleResetPassword = async () => {
    if (!validatePassword()) {
      return
    }

    try {
      await handlers.onResetPassword({ email, newPassword })
      setResetErrorMessage('')
      setIsCompletePopupOpen(true)
    } catch (error) {
      if (error instanceof Error) {
        setResetErrorMessage(error.message)
        return
      }

      setResetErrorMessage('비밀번호 변경에 실패했습니다.')
    }
  }

  const handleCloseCompletePopup = useCallback(() => {
    setIsCompletePopupOpen(false)
  }, [])

  return {
    step,
    email,
    newPassword,
    confirmPassword,
    code,
    isCodeSent,
    isCodeVerified,
    codeErrorMessage,
    inputErrorMessage,
    resetErrorMessage,
    formattedTime,
    isCompletePopupOpen,
    handleEmailChange,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleCodeChange,
    handleSendCode,
    handleVerifyCode,
    handleNextStep,
    handleResetPassword,
    handleCloseCompletePopup,
  }
}
