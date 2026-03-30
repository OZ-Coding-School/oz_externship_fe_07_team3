import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { usePhoneVerification } from '@/hooks/usePhoneVerification'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import getPhoneButtonText, { type PhoneEditStep } from '@/utils/phoneButtonText'
import {
  useSendPhoneVerificationCode,
  useVerifyPhoneVerificationCode,
} from '@/api/signup'

type VerificationStatus = 'default' | 'success' | 'danger'

type UsePhoneNumberVerificationSectionParams = {
  phoneNumber: string
  onChangePhoneNumber: (phoneNumber: string) => void
  onVerifiedTokenChange: (token: string | null) => void
}

export default function usePhoneNumberVerificationSection({
  phoneNumber,
  onChangePhoneNumber,
  onVerifiedTokenChange,
}: UsePhoneNumberVerificationSectionParams) {
  const [phoneEditStep, setPhoneEditStep] = useState<PhoneEditStep>('default')
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>('default')

  const phoneInputRef = useRef<HTMLInputElement | null>(null)

  const sendCodeMutation = useSendPhoneVerificationCode()
  const verifyCodeMutation = useVerifyPhoneVerificationCode()

  const {
    code,
    isCodeSent,
    isCodeVerified,
    codeErrorMessage,
    formattedTime,
    isExpired,
    handleCodeChange,
    resetVerification,
    markCodeSent,
    markCodeVerified,
    setVerificationError,
    validateBeforeVerify,
  } = usePhoneVerification()

  useEffect(() => {
    if (phoneEditStep === 'verifying' && isExpired && !isCodeVerified) {
      setVerificationStatus('danger')
      setVerificationError(
        '인증번호 전송 시간이 초과되었습니다. 인증번호를 재전송 해주세요.'
      )
    }
  }, [phoneEditStep, isExpired, isCodeVerified, setVerificationError])

  const phoneDisplayValue = formatPhoneNumber(phoneNumber)
  const phoneButtonText = getPhoneButtonText(phoneEditStep)

  const isPhoneReadOnly =
    phoneEditStep === 'default' || phoneEditStep === 'verified'

  const showVerificationField =
    phoneEditStep === 'verifying' || phoneEditStep === 'verified'

  const verificationHelperText =
    verificationStatus === 'success' ? undefined : codeErrorMessage || undefined

  const isVerifyButtonDisabled =
    !isCodeSent ||
    !code.trim() ||
    isCodeVerified ||
    isExpired ||
    verifyCodeMutation.isPending

  const isPhoneActionButtonDisabled =
    phoneEditStep === 'verified' || sendCodeMutation.isPending

  const focusPhoneInput = () => {
    requestAnimationFrame(() => {
      phoneInputRef.current?.focus()
    })
  }

  const resetPhoneVerificationUi = () => {
    setVerificationStatus('default')
    resetVerification()
    onVerifiedTokenChange(null)
  }

  const enterEditMode = () => {
    setPhoneEditStep('editing')
    resetPhoneVerificationUi()
    focusPhoneInput()
  }

  const validatePhoneNumberBeforeSend = () => {
    if (!phoneNumber.trim()) {
      setVerificationStatus('danger')
      setVerificationError('휴대전화 번호를 입력해주세요.')
      focusPhoneInput()
      return false
    }

    if (phoneNumber.length !== 11) {
      setVerificationStatus('danger')
      setVerificationError('휴대전화 번호 11자리를 입력해주세요.')
      focusPhoneInput()
      return false
    }

    return true
  }

  const handlePhoneNumberChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0, 11)

    onChangePhoneNumber(onlyNumbers)
    onVerifiedTokenChange(null)

    if (phoneEditStep === 'verified') {
      setPhoneEditStep('editing')
    }

    if (verificationStatus !== 'default') {
      setVerificationStatus('default')
    }

    if (isCodeSent || isCodeVerified) {
      resetVerification()
    }
  }

  const handleSendVerificationCode = async () => {
    const isValid = validatePhoneNumberBeforeSend()

    if (!isValid) return

    try {
      await sendCodeMutation.mutateAsync({
        phone_number: phoneNumber,
      })

      markCodeSent()
      setPhoneEditStep('verifying')
      setVerificationStatus('default')
      toast.success('인증번호를 전송했습니다.')
    } catch {
      setVerificationStatus('danger')
      setVerificationError('인증번호 전송에 실패했습니다.')
    }
  }

  const handleClickPhoneActionButton = async () => {
    if (phoneEditStep === 'default' || phoneEditStep === 'verified') {
      enterEditMode()
      return
    }

    await handleSendVerificationCode()
  }

  const handleVerifyCode = async () => {
    const isValid = validateBeforeVerify()

    if (!isValid) {
      setVerificationStatus('danger')
      return
    }

    try {
      const result = await verifyCodeMutation.mutateAsync({
        phone_number: phoneNumber,
        code,
      })

      markCodeVerified()
      setPhoneEditStep('verified')
      setVerificationStatus('success')
      onVerifiedTokenChange(result.sms_token)
      toast.success('휴대전화 인증이 완료되었습니다.')
    } catch {
      setVerificationStatus('danger')
      setVerificationError('인증번호가 일치하지 않습니다.')
    }
  }

  return {
    phoneInputRef,
    phoneDisplayValue,
    phoneButtonText,
    phoneEditStep,
    verificationStatus,
    code,
    formattedTime,
    isCodeSent,
    isCodeVerified,
    isExpired,
    isPhoneReadOnly,
    showVerificationField,
    verificationHelperText,
    isVerifyButtonDisabled,
    isPhoneActionButtonDisabled,
    sendCodeMutation,
    verifyCodeMutation,
    handlePhoneNumberChange,
    handleCodeChange,
    handleClickPhoneActionButton,
    handleVerifyCode,
  }
}
