import { useCallback, useEffect, useState } from 'react'

import { useTimer } from '@/hooks/useTimer'

const INITIAL_TIME = 300

// TODO: API 연동 시 제거
const MOCK_VERIFY_CODE = '123456'

type UseRecoverAccountVerificationParams = {
  isOpen: boolean
}

export const useRecoverAccountVerification = ({
  isOpen,
}: UseRecoverAccountVerificationParams) => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSendToastVisible, setIsSendToastVisible] = useState(false)
  const [isCompletePopupVisible, setIsCompletePopupVisible] = useState(false)

  const { formattedTime, isExpired, startTimer, stopTimer, resetTimer } =
    useTimer(INITIAL_TIME)

  const resetVerificationState = useCallback(() => {
    setEmail('')
    setCode('')
    setIsCodeSent(false)
    setIsCodeVerified(false)
    setErrorMessage('')
    setIsSendToastVisible(false)
    setIsCompletePopupVisible(false)
    resetTimer()
  }, [resetTimer])

  useEffect(() => {
    if (!isOpen) {
      resetVerificationState()
    }
  }, [isOpen, resetVerificationState])

  useEffect(() => {
    if (!isSendToastVisible) return

    const timer = window.setTimeout(() => {
      setIsSendToastVisible(false)
    }, 2500)

    return () => window.clearTimeout(timer)
  }, [isSendToastVisible])

  const handleEmailChange = (value: string) => {
    setEmail(value)

    if (isCodeSent) {
      setIsCodeSent(false)
    }

    if (isCodeVerified) {
      setIsCodeVerified(false)
    }

    if (errorMessage) {
      setErrorMessage('')
    }

    setCode('')
    resetTimer()
  }

  const handleCodeChange = (value: string) => {
    setCode(value)

    if (errorMessage) {
      setErrorMessage('')
    }

    if (isCodeVerified) {
      setIsCodeVerified(false)
    }
  }

  const handleSendCode = () => {
    if (!email.trim()) return

    setIsCodeSent(true)
    setIsCodeVerified(false)
    setErrorMessage('')
    setCode('')
    startTimer()
    setIsSendToastVisible(true)
  }

  const validateCode = () => {
    if (!isCodeSent) {
      setErrorMessage('인증코드를 먼저 전송해주세요.')
      return false
    }

    if (!code.trim()) {
      setErrorMessage('인증코드를 입력해주세요.')
      return false
    }

    if (isExpired) {
      setErrorMessage('인증 시간이 만료되었습니다. 다시 전송해주세요.')
      return false
    }

    return true
  }

  const handleVerifyCode = () => {
    if (!validateCode()) {
      setIsCodeVerified(false)
      return
    }

    // TODO: API 연동 시 아래 mock 로직 제거
    if (code.trim() !== MOCK_VERIFY_CODE) {
      setErrorMessage('인증코드가 일치하지 않습니다.')
      setIsCodeVerified(false)
      return
    }

    setErrorMessage('')
    setIsCodeVerified(true)
    stopTimer()
  }

  const handleCompleteButtonClick = () => {
    if (!validateCode()) return

    if (!isCodeVerified) {
      setErrorMessage('인증코드 확인을 완료해주세요.')
      return
    }

    setErrorMessage('')
    setIsCompletePopupVisible(true)
  }

  const closeCompletePopup = () => {
    setIsCompletePopupVisible(false)
  }

  return {
    email,
    code,
    isCodeSent,
    isCodeVerified,
    errorMessage,
    isSendToastVisible,
    isCompletePopupVisible,
    formattedTime,
    handleEmailChange,
    handleCodeChange,
    handleSendCode,
    handleVerifyCode,
    handleCompleteButtonClick,
    closeCompletePopup,
  }
}
