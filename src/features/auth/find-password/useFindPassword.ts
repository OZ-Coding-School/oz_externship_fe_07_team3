import { useCallback, useEffect, useState } from 'react'

import { usePhoneVerification } from '@/features/auth/hooks/usePhoneVerification'

type Step = 'input' | 'reset'

const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,15}$/

type UseFindPasswordParams = {
  isOpen: boolean
}

export const useFindPassword = ({ isOpen }: UseFindPasswordParams) => {
  const [step, setStep] = useState<Step>('input')
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [findErrorMessage, setFindErrorMessage] = useState('')
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
      setFindErrorMessage('')
      setIsCompletePopupOpen(false)
      resetVerification()
    }
  }, [isOpen, resetVerification])

  const handleEmailChange = (value: string) => {
    setEmail(value)

    if (findErrorMessage) {
      setFindErrorMessage('')
    }
  }

  const handleNewPasswordChange = (value: string) => {
    setNewPassword(value)

    if (findErrorMessage) {
      setFindErrorMessage('')
    }
  }

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)

    if (findErrorMessage) {
      setFindErrorMessage('')
    }
  }

  const validateEmail = () => {
    if (!email.trim()) {
      setFindErrorMessage('이메일을 입력해주세요.')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email.trim())) {
      setFindErrorMessage('올바른 이메일 형식을 입력해주세요.')
      return false
    }

    return true
  }

  const handleSendCode = async () => {
    if (!validateEmail()) {
      return
    }

    setFindErrorMessage('')

    // TODO: 인증코드 전송 API 연동
    markCodeSent()
  }

  const handleVerifyCode = async () => {
    if (!validateBeforeVerify()) {
      return
    }

    // TODO: 인증코드 확인 API 연동
    // 실패 시:
    // setVerificationError('인증번호가 일치하지 않습니다.')
    // return

    markCodeVerified()
  }

  const handleNextStep = () => {
    if (!validateEmail()) {
      return
    }

    if (!validateBeforeSubmit()) {
      return
    }

    setFindErrorMessage('')
    setStep('reset')
  }

  const validatePassword = () => {
    if (!newPassword.trim()) {
      setFindErrorMessage('새 비밀번호를 입력해주세요.')
      return false
    }

    if (!confirmPassword.trim()) {
      setFindErrorMessage('비밀번호를 다시 입력해주세요.')
      return false
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      setFindErrorMessage('비밀번호 형식이 올바르지 않습니다.')
      return false
    }

    if (newPassword !== confirmPassword) {
      setFindErrorMessage('비밀번호가 일치하지 않습니다.')
      return false
    }

    return true
  }

  const handleResetPassword = async () => {
    if (!validatePassword()) {
      return
    }

    // TODO: 비밀번호 변경 API 연동
    setFindErrorMessage('')
    setIsCompletePopupOpen(true)
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
    findErrorMessage,
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
    setVerificationError,
  }
}
