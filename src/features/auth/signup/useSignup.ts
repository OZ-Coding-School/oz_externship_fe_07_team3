import { useState } from 'react'
import type { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import { toast } from 'sonner'

import { useCheckNickName } from '@/api/queries/useCheckNickName'
import { useCodeVerification } from '@/features/auth/shared/useCodeVerification'
import type { CheckNicknameErrorResponse } from '@/types/checkNickName'
import {
  initialSignupErrors,
  initialSignupState,
  initialSignupTouched,
  type SignupErrors,
  type SignupState,
  type SignupTouched,
} from './SignupState'
import {
  hasSignupErrors,
  isSignupFormFilled,
  validateEmail,
  validatePhone,
  validateSignupForm,
} from './validateSignup'
import { SIGNUP_MOCKS } from '@/test/mocks/signupUiMocks'

type PhoneField = 'phoneFirst' | 'phoneMiddle' | 'phoneLast'

type SubmitBlockedReason =
  | 'validation'
  | 'nickname'
  | 'emailVerification'
  | 'phoneVerification'
  | null

const mapSignupStateToPayload = (state: SignupState) => {
  return {
    name: state.name.trim(),
    nickname: state.nickname.trim(),
    birth: state.birth,
    gender: state.gender,
    email: state.email.trim(),
    phone: `${state.phoneFirst}${state.phoneMiddle}${state.phoneLast}`,
    password: state.password,
  }
}

const getFullPhoneNumber = (state: SignupState) =>
  `${state.phoneFirst}${state.phoneMiddle}${state.phoneLast}`

export const useSignup = () => {
  const navigate = useNavigate()

  const [state, setState] = useState<SignupState>(initialSignupState)
  const [errors, setErrors] = useState<SignupErrors>(initialSignupErrors)
  const [touched, setTouched] = useState<SignupTouched>(initialSignupTouched)
  const [submitted, setSubmitted] = useState(false)

  const [emailAvailableMessage, setEmailAvailableMessage] = useState('')
  const [phoneAvailableMessage, setPhoneAvailableMessage] = useState('')

  const emailVerification = useCodeVerification()
  const phoneVerification = useCodeVerification()
  const checkNicknameMutation = useCheckNickName()

  const setFieldTouched = (field: keyof SignupTouched) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const setAllTouched = () => {
    setTouched({
      name: true,
      nickname: true,
      birth: true,
      gender: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    })
  }

  const updateStateAndValidate = (nextState: SignupState) => {
    setState(nextState)

    const nextErrors = validateSignupForm(nextState)
    setErrors(nextErrors)

    return nextErrors
  }

  const clearEmailVerificationState = () => {
    emailVerification.resetVerification()
    setEmailAvailableMessage('')
  }

  const clearPhoneVerificationState = () => {
    phoneVerification.resetVerification()
    setPhoneAvailableMessage('')
  }

  const getSubmitBlockedReason = (
    nextState: SignupState,
    nextErrors?: SignupErrors
  ): SubmitBlockedReason => {
    const signupErrors = nextErrors ?? validateSignupForm(nextState)

    if (hasSignupErrors(signupErrors)) return 'validation'
    if (!nextState.isNicknameChecked) return 'nickname'
    if (!emailVerification.isCodeVerified) return 'emailVerification'
    if (!phoneVerification.isCodeVerified) return 'phoneVerification'

    return null
  }

  const applySubmitBlockedErrors = (
    reason: Exclude<SubmitBlockedReason, null>
  ) => {
    if (reason === 'nickname') {
      setErrors((prev) => ({
        ...prev,
        nickname: '닉네임 중복확인을 완료해주세요.',
      }))
    }

    if (reason === 'emailVerification') {
      setErrors((prev) => ({
        ...prev,
        email: '이메일 인증을 완료해주세요.',
      }))
    }

    if (reason === 'phoneVerification') {
      setErrors((prev) => ({
        ...prev,
        phone: '휴대전화 인증을 완료해주세요.',
      }))
    }
  }

  const handleNameChange = (value: string) => {
    updateStateAndValidate({ ...state, name: value })
  }

  const handleNicknameChange = (value: string) => {
    updateStateAndValidate({
      ...state,
      nickname: value,
      isNicknameChecked: false,
    })
  }

  const handleNicknameCheck = async () => {
    setFieldTouched('nickname')

    const nicknameError = validateSignupForm(state).nickname
    if (nicknameError) {
      setErrors((prev) => ({
        ...prev,
        nickname: nicknameError,
      }))
      return
    }

    const trimmedNickname = state.nickname.trim()

    try {
      await checkNicknameMutation.mutateAsync({
        nickname: trimmedNickname,
      })

      setState((prev) => ({ ...prev, isNicknameChecked: true }))
      setErrors((prev) => ({
        ...prev,
        nickname: '',
      }))
    } catch (error) {
      setState((prev) => ({ ...prev, isNicknameChecked: false }))

      let message = '이미 사용 중인 닉네임입니다.'

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosError<CheckNicknameErrorResponse>
        const detail = axiosError.response?.data?.error_detail

        if (typeof detail === 'string') {
          message = detail
        } else if (
          detail &&
          typeof detail === 'object' &&
          'nickname' in detail &&
          Array.isArray(detail.nickname) &&
          typeof detail.nickname[0] === 'string'
        ) {
          message = detail.nickname[0]
        }
      }

      setErrors((prev) => ({
        ...prev,
        nickname: message,
      }))
    }
  }

  const handleBirthChange = (value: string) => {
    const only = value.replace(/[^0-9]/g, '').slice(0, 8)
    updateStateAndValidate({ ...state, birth: only })
  }

  const handleGenderChange = (value: 'male' | 'female') => {
    updateStateAndValidate({ ...state, gender: value })
    setFieldTouched('gender')
  }

  const handleEmailChange = (value: string) => {
    updateStateAndValidate({ ...state, email: value })
    clearEmailVerificationState()
  }

  const handleSendEmailCode = () => {
    setFieldTouched('email')

    const emailError = validateEmail(state.email)
    if (emailError) {
      setErrors((prev) => ({
        ...prev,
        email: emailError,
      }))
      setEmailAvailableMessage('')
      return
    }

    const trimmedEmail = state.email.trim().toLowerCase()
    const isTaken = SIGNUP_MOCKS.email.taken.some(
      (email: string) => email.toLowerCase() === trimmedEmail
    )

    if (isTaken) {
      setErrors((prev) => ({
        ...prev,
        email: '이미 가입된 이메일입니다.',
      }))
      clearEmailVerificationState()
      return
    }

    setErrors((prev) => ({
      ...prev,
      email: '',
    }))
    setEmailAvailableMessage('사용 가능한 이메일입니다.')
    emailVerification.markCodeSent()
  }

  const handleVerifyEmailCode = () => {
    setFieldTouched('email')

    if (!emailVerification.validateBeforeVerify()) return

    if (emailVerification.code !== SIGNUP_MOCKS.email.code) {
      emailVerification.setVerificationError('인증코드가 일치하지 않습니다.')
      return
    }

    emailVerification.markCodeVerified()
  }

  const handlePhoneChange = (key: PhoneField, value: string) => {
    const maxLengthMap: Record<PhoneField, number> = {
      phoneFirst: 3,
      phoneMiddle: 4,
      phoneLast: 4,
    }

    const only = value.replace(/[^0-9]/g, '').slice(0, maxLengthMap[key])
    const next = { ...state, [key]: only }

    updateStateAndValidate(next)
    clearPhoneVerificationState()
  }

  const handleSendPhoneCode = () => {
    setFieldTouched('phone')

    const phoneError = validatePhone(
      state.phoneFirst,
      state.phoneMiddle,
      state.phoneLast
    )

    if (phoneError) {
      setErrors((prev) => ({
        ...prev,
        phone: phoneError,
      }))
      setPhoneAvailableMessage('')
      return
    }

    const fullPhoneNumber = getFullPhoneNumber(state)
    const isTaken = SIGNUP_MOCKS.phone.taken.includes(fullPhoneNumber)

    if (isTaken) {
      setErrors((prev) => ({
        ...prev,
        phone: '이미 가입에 사용된 휴대전화 번호입니다.',
      }))
      clearPhoneVerificationState()
      return
    }

    setErrors((prev) => ({
      ...prev,
      phone: '',
    }))
    setPhoneAvailableMessage('사용 가능한 휴대전화 번호입니다.')
    phoneVerification.markCodeSent()
  }

  const handleVerifyPhoneCode = () => {
    setFieldTouched('phone')

    if (!phoneVerification.validateBeforeVerify()) return

    if (phoneVerification.code !== SIGNUP_MOCKS.phone.code) {
      phoneVerification.setVerificationError('인증코드가 일치하지 않습니다.')
      return
    }

    phoneVerification.markCodeVerified()
  }

  const handlePasswordChange = (value: string) => {
    updateStateAndValidate({ ...state, password: value })
  }

  const handleConfirmPasswordChange = (value: string) => {
    updateStateAndValidate({ ...state, confirmPassword: value })
  }

  const isPasswordMatch =
    state.password.trim() !== '' &&
    state.confirmPassword.trim() !== '' &&
    state.password === state.confirmPassword

  const filled = isSignupFormFilled(state)
  const formBlockedReason = getSubmitBlockedReason(state)
  const isSubmitDisabled = !(filled && formBlockedReason === null)

  const submit = () => {
    setSubmitted(true)
    setAllTouched()

    const nextErrors = validateSignupForm(state)
    setErrors(nextErrors)

    const submitBlockedReason = getSubmitBlockedReason(state, nextErrors)
    if (submitBlockedReason) {
      if (submitBlockedReason !== 'validation') {
        applySubmitBlockedErrors(submitBlockedReason)
      }
      return
    }

    const payload = mapSignupStateToPayload(state)

    // TODO: 회원가입 API 연동
    void payload

    toast.success('회원가입이 완료되었습니다.')
    navigate(ROUTES_PATHS.LOGIN_PAGE)
  }

  return {
    state,
    errors,
    touched,
    submitted,

    handleNameChange,
    handleNicknameChange,
    handleNicknameCheck,
    handleBirthChange,
    handleGenderChange,
    handleEmailChange,
    handlePhoneChange,
    handlePasswordChange,
    handleConfirmPasswordChange,

    handleSendEmailCode,
    handleVerifyEmailCode,
    handleSendPhoneCode,
    handleVerifyPhoneCode,

    emailVerification,
    phoneVerification,

    emailAvailableMessage,
    phoneAvailableMessage,

    setFieldTouched,
    isPasswordMatch,
    isSubmitDisabled,
    submit,
  }
}
