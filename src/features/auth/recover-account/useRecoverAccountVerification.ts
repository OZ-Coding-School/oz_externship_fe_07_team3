import { useCallback, useEffect, useState } from 'react'

import { useTimer } from '@/hooks/useTimer'
import { useRestoreAccount } from '@/api/queries/auth/useRestoreAccount'
import { getErrorMessage } from '@/utils/getErrorMessage'
import { useEmailVerificationActions } from '../shared/useEmailVerificationActions'

const INITIAL_TIME = 300

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
  const [emailToken, setEmailToken] = useState<string | null>(null)

  const { mutateAsync: restoreAccountMutateAsync, isPending } =
    useRestoreAccount()

  const { formattedTime, isExpired, startTimer, stopTimer, resetTimer } =
    useTimer(INITIAL_TIME)

  const { handleSendEmailCode, handleVerifyEmailCode } =
    useEmailVerificationActions()

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
    if (!isSendToastVisible) {
      return
    }

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

    setEmailToken(null)
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
      setEmailToken(null)
    }
  }

  const handleSendCode = async () => {
    if (!email.trim()) {
      setErrorMessage('이메일을 입력해주세요.')
      return
    }

    try {
      await handleSendEmailCode({ email })

      setIsCodeSent(true)
      setIsCodeVerified(false)
      setErrorMessage('')
      setCode('')
      setEmailToken(null)
      startTimer()
      setIsSendToastVisible(true)
    } catch (error) {
      setIsCodeSent(false)
      setIsCodeVerified(false)
      setCode('')
      setEmailToken(null)
      setErrorMessage(getErrorMessage(error, '인증번호 전송에 실패했습니다.'))
      resetTimer()
    }
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

  const handleVerifyCode = async () => {
    if (!validateCode()) {
      setIsCodeVerified(false)
      return
    }

    try {
      const result = await handleVerifyEmailCode({
        email,
        code,
      })

      setEmailToken(result.email_token)
      setErrorMessage('')
      setIsCodeVerified(true)
      stopTimer()
    } catch (error) {
      setEmailToken(null)
      setIsCodeVerified(false)
      setErrorMessage(getErrorMessage(error, '인증코드가 일치하지 않습니다.'))
    }
  }

  const handleCompleteButtonClick = async () => {
    if (!validateCode()) {
      return
    }

    if (!isCodeVerified) {
      setErrorMessage('인증코드 확인을 완료해주세요.')
      return
    }

    if (!emailToken) {
      setErrorMessage('이메일 인증 토큰이 없습니다. 다시 인증해주세요.')
      return
    }

    try {
      await restoreAccountMutateAsync({
        email_token: emailToken,
      })

      setErrorMessage('')
      setIsCompletePopupVisible(true)
    } catch (error) {
      setErrorMessage(
        getErrorMessage(error, '계정 복구에 실패했습니다. 다시 시도해주세요.')
      )
    }
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
    isPending,
    handleEmailChange,
    handleCodeChange,
    handleSendCode,
    handleVerifyCode,
    handleCompleteButtonClick,
    closeCompletePopup,
  }
}
