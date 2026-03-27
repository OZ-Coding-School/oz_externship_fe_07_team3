import { useEffect, useState } from 'react'

const INITIAL_TIME = 300

const formatTime = (seconds: number) => {
  const minute = Math.floor(seconds / 60)
  const second = seconds % 60

  return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}

type VerificationMode = 'email' | 'phone'

type UseCodeVerificationOptions = {
  mode: VerificationMode
}

const sanitizeVerificationCode = (value: string, mode: VerificationMode) => {
  if (mode === 'phone') {
    return value.replace(/[^0-9]/g, '').slice(0, 6)
  }

  return value.trim()
}

export const useCodeVerification = ({ mode }: UseCodeVerificationOptions) => {
  const [verificationCode, setVerificationCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [codeErrorMessage, setCodeErrorMessage] = useState('')
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME)

  useEffect(() => {
    if (!isCodeSent || isCodeVerified || timeLeft <= 0) return

    const timer = window.setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [isCodeSent, isCodeVerified, timeLeft])

  const handleCodeChange = (value: string) => {
    const sanitizedValue = sanitizeVerificationCode(value, mode)
    setVerificationCode(sanitizedValue)
    setCodeErrorMessage('')
  }

  const markCodeSent = () => {
    setIsCodeSent(true)
    setIsCodeVerified(false)
    setVerificationCode('')
    setCodeErrorMessage('')
    setTimeLeft(INITIAL_TIME)
  }

  const markCodeVerified = () => {
    setIsCodeVerified(true)
    setVerificationCode('')
    setCodeErrorMessage('')
  }

  const setVerificationError = (message: string) => {
    setCodeErrorMessage(message)
  }

  const resetVerification = () => {
    setVerificationCode('')
    setIsCodeSent(false)
    setIsCodeVerified(false)
    setCodeErrorMessage('')
    setTimeLeft(INITIAL_TIME)
  }

  const validateBeforeVerify = () => {
    if (!isCodeSent) {
      setCodeErrorMessage('인증번호를 먼저 요청해주세요.')
      return false
    }

    if (!verificationCode.trim()) {
      setCodeErrorMessage('인증번호를 입력해주세요.')
      return false
    }

    if (mode === 'phone' && verificationCode.length !== 6) {
      setCodeErrorMessage('휴대폰 인증번호 6자리를 입력해주세요.')
      return false
    }

    if (timeLeft <= 0) {
      setCodeErrorMessage('인증 시간이 만료되었습니다. 다시 요청해주세요.')
      return false
    }

    return true
  }

  const validateBeforeSubmit = () => {
    if (!isCodeVerified) {
      setCodeErrorMessage('인증을 완료해주세요.')
      return false
    }

    return true
  }

  const isExpired = isCodeSent && !isCodeVerified && timeLeft <= 0

  return {
    verificationCode,
    isCodeSent,
    isCodeVerified,
    isExpired,
    codeErrorMessage,
    formattedTime: formatTime(timeLeft),
    handleCodeChange,
    resetVerification,
    markCodeSent,
    markCodeVerified,
    setVerificationError,
    validateBeforeVerify,
    validateBeforeSubmit,
  }
}

export default useCodeVerification
