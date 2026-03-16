import { useCallback, useState } from 'react'

import { useTimer } from '@/hooks/useTimer'

const INITIAL_TIME = 300

export const usePhoneVerification = () => {
  const [code, setCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [codeErrorMessage, setCodeErrorMessage] = useState('')

  const { formattedTime, isExpired, startTimer, stopTimer, resetTimer } =
    useTimer(INITIAL_TIME)

  const resetVerification = useCallback(() => {
    setCode('')
    setIsCodeSent(false)
    setIsCodeVerified(false)
    setCodeErrorMessage('')
    stopTimer()
    resetTimer()
  }, [resetTimer, stopTimer])

  const handleCodeChange = (value: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, '')
    setCode(onlyNumbers)

    if (codeErrorMessage) {
      setCodeErrorMessage('')
    }

    if (isCodeVerified) {
      setIsCodeVerified(false)
    }
  }

  const markCodeSent = () => {
    setIsCodeSent(true)
    setIsCodeVerified(false)
    setCode('')
    setCodeErrorMessage('')
    resetTimer()
    startTimer()
  }

  const markCodeVerified = () => {
    setIsCodeVerified(true)
    setCodeErrorMessage('')
    stopTimer()
  }

  const setVerificationError = (message: string) => {
    setCodeErrorMessage(message)
  }

  const validateBeforeVerify = () => {
    if (!isCodeSent) {
      setCodeErrorMessage('인증번호를 먼저 전송해주세요.')
      return false
    }

    if (!code.trim()) {
      setCodeErrorMessage('인증번호를 입력해주세요.')
      return false
    }

    if (isExpired) {
      setCodeErrorMessage('인증 시간이 만료되었습니다. 다시 전송해주세요.')
      setIsCodeVerified(false)
      return false
    }

    return true
  }

  const validateBeforeSubmit = () => {
    if (!isCodeSent) {
      setCodeErrorMessage('인증번호를 먼저 전송해주세요.')
      return false
    }

    if (!isCodeVerified) {
      setCodeErrorMessage('인증번호 확인을 완료해주세요.')
      return false
    }

    return true
  }

  return {
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
  }
}
