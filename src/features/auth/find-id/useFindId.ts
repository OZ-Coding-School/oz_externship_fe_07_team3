import { useEffect, useState } from 'react'

import { usePhoneVerification } from '@/features/auth/hooks/usePhoneVerification'

export type FindIdStep = 'input' | 'result'

export type FindIdHandlers = {
  onSendCode: (params: { name: string; phone: string }) => Promise<void> | void
  onVerifyCode: (params: { code: string }) => Promise<void> | void
  onFindId: (params: {
    name: string
    phone: string
  }) => Promise<{ maskedEmail: string }> | { maskedEmail: string }
}

type UseFindIdParams = {
  isOpen: boolean
  handlers: FindIdHandlers
}

export const useFindId = ({ isOpen, handlers }: UseFindIdParams) => {
  const [step, setStep] = useState<FindIdStep>('input')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [findErrorMessage, setFindErrorMessage] = useState('')
  const [maskedEmail, setMaskedEmail] = useState('')

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
      setName('')
      setPhone('')
      setFindErrorMessage('')
      setMaskedEmail('')
      resetVerification()
    }
  }, [isOpen, resetVerification])

  const validateIdentityFields = () => {
    if (!name.trim()) {
      setFindErrorMessage('이름을 입력해주세요.')
      return false
    }

    if (!phone.trim()) {
      setFindErrorMessage('휴대전화 번호를 입력해주세요.')
      return false
    }

    return true
  }

  const handleNameChange = (value: string) => {
    setName(value)

    if (findErrorMessage) {
      setFindErrorMessage('')
    }
  }

  const handlePhoneChange = (value: string) => {
    const onlyNumbers = value.replace(/[^0-9]/g, '').slice(0, 11)
    const isPhoneChanged = onlyNumbers !== phone
    const hasVerificationProgress = Boolean(
      code || isCodeSent || isCodeVerified || codeErrorMessage
    )

    setPhone(onlyNumbers)

    if (findErrorMessage) {
      setFindErrorMessage('')
    }

    if (isPhoneChanged && hasVerificationProgress) {
      resetVerification()
    }
  }

  const handleSendCode = async () => {
    if (!validateIdentityFields()) {
      return
    }

    setFindErrorMessage('')

    try {
      await handlers.onSendCode({ name, phone })
      markCodeSent()
    } catch (error) {
      if (error instanceof Error) {
        setFindErrorMessage(error.message)
        return
      }

      setFindErrorMessage('인증번호 전송에 실패했습니다.')
    }
  }

  const handleVerifyCode = async () => {
    if (!validateBeforeVerify()) {
      return
    }

    try {
      await handlers.onVerifyCode({ code })
      markCodeVerified()
    } catch (error) {
      if (error instanceof Error) {
        setVerificationError(error.message)
        return
      }

      setVerificationError('인증번호 확인에 실패했습니다.')
    }
  }

  const handleFindId = async () => {
    if (!validateIdentityFields()) {
      return
    }

    if (!validateBeforeSubmit()) {
      return
    }

    try {
      const result = await handlers.onFindId({ name, phone })
      setFindErrorMessage('')
      setMaskedEmail(result.maskedEmail)
      setStep('result')
    } catch (error) {
      if (error instanceof Error) {
        setFindErrorMessage(error.message)
        return
      }

      setFindErrorMessage('입력하신 정보와 일치하는 계정을 찾을 수 없습니다.')
    }
  }

  return {
    step,
    name,
    phone,
    code,
    isCodeSent,
    isCodeVerified,
    codeErrorMessage,
    findErrorMessage,
    maskedEmail,
    formattedTime,
    handleNameChange,
    handlePhoneChange,
    handleCodeChange,
    handleSendCode,
    handleVerifyCode,
    handleFindId,
  }
}
