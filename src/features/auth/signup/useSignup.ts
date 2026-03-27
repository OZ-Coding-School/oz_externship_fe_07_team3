import { useState } from 'react'
import type { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { ROUTES_PATHS } from '@/constants/routesPaths'
import { toast } from 'sonner'

import {
  postSendEmailVerificationCode,
  postVerifyEmailVerificationCode,
  postSignup,
} from '@/api/signup'
import type { SignupRequest } from '@/types/auth-type/signup'
import { useCheckNickName } from '@/api/queries/useCheckNickName'
import {
  useSendPhoneVerificationCode,
  useVerifyPhoneVerificationCode,
} from '@/api/queries/usePhoneVerification'
import { useCodeVerification } from '@/features/auth/shared/useCodeVerification'
import type { CheckNicknameErrorResponse } from '@/types/checkNickName'
import { getErrorMessage } from '@/utils/getErrorMessage'
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

type PhoneField = 'phoneFirst' | 'phoneMiddle' | 'phoneLast'

type SubmitBlockedReason =
  | 'validation'
  | 'nickname'
  | 'emailVerification'
  | 'phoneVerification'
  | null

const NICKNAME_CHECK_REQUIRED_MESSAGE = '닉네임 중복확인을 완료해주세요.'
const EMAIL_VERIFICATION_REQUIRED_MESSAGE = '이메일 인증을 완료해주세요.'
const PHONE_VERIFICATION_REQUIRED_MESSAGE = '휴대전화 인증을 완료해주세요.'

const NICKNAME_DUPLICATED_MESSAGE = '이미 사용 중인 닉네임입니다.'

const CODE_SENT_MESSAGE = '인증번호를 전송했습니다.'
const CODE_SEND_FAIL_MESSAGE = '인증번호 전송에 실패했습니다.'
const INVALID_CODE_MESSAGE = '인증코드가 일치하지 않습니다.'

const SIGNUP_SUCCESS_MESSAGE = '회원가입이 완료되었습니다.'
const SIGNUP_FAIL_MESSAGE = '회원가입에 실패했습니다.'

const formatBirthday = (birth: string) => {
  if (birth.length !== 8) return birth

  return `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`
}

const mapSignupStateToPayload = (
  state: SignupState,
  emailToken: string,
  smsToken: string
): SignupRequest => {
  return {
    password: state.password,
    nickname: state.nickname.trim(),
    name: state.name.trim(),
    birthday: formatBirthday(state.birth),
    gender: state.gender === 'male' ? 'M' : 'F',
    email_token: emailToken,
    sms_token: smsToken,
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
  const [emailToken, setEmailToken] = useState<string | null>(null)
  const [smsToken, setSmsToken] = useState<string | null>(null)

  const emailVerification = useCodeVerification()
  const phoneVerification = useCodeVerification()

  const checkNicknameMutation = useCheckNickName()
  const sendEmailCodeMutation = useMutation({
    mutationFn: postSendEmailVerificationCode,
  })
  const verifyEmailCodeMutation = useMutation({
    mutationFn: postVerifyEmailVerificationCode,
  })
  const sendPhoneCodeMutation = useSendPhoneVerificationCode()
  const verifyPhoneCodeMutation = useVerifyPhoneVerificationCode()
  const signupMutation = useMutation({
    mutationFn: postSignup,
  })

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
    setEmailToken(null)
  }

  const clearPhoneVerificationState = () => {
    phoneVerification.resetVerification()
    setPhoneAvailableMessage('')
    setSmsToken(null)
  }

  const getSubmitBlockedReason = (
    nextState: SignupState,
    nextErrors?: SignupErrors
  ): SubmitBlockedReason => {
    const signupErrors = nextErrors ?? validateSignupForm(nextState)

    if (hasSignupErrors(signupErrors)) return 'validation'
    if (!nextState.isNicknameChecked) return 'nickname'
    if (!emailToken || !emailVerification.isCodeVerified)
      return 'emailVerification'
    if (!smsToken || !phoneVerification.isCodeVerified)
      return 'phoneVerification'

    return null
  }

  const applySubmitBlockedErrors = (
    reason: Exclude<SubmitBlockedReason, null>
  ) => {
    if (reason === 'nickname') {
      setErrors((prev) => ({
        ...prev,
        nickname: NICKNAME_CHECK_REQUIRED_MESSAGE,
      }))
    }

    if (reason === 'emailVerification') {
      setErrors((prev) => ({
        ...prev,
        email: EMAIL_VERIFICATION_REQUIRED_MESSAGE,
      }))
    }

    if (reason === 'phoneVerification') {
      setErrors((prev) => ({
        ...prev,
        phone: PHONE_VERIFICATION_REQUIRED_MESSAGE,
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

      let message = NICKNAME_DUPLICATED_MESSAGE

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

  const handleSendEmailCode = async () => {
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

    try {
      await sendEmailCodeMutation.mutateAsync({
        email: state.email.trim(),
      })

      setErrors((prev) => ({
        ...prev,
        email: '',
      }))
      setEmailAvailableMessage(CODE_SENT_MESSAGE)
      emailVerification.markCodeSent()
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        email: getErrorMessage(error, CODE_SEND_FAIL_MESSAGE),
      }))
      clearEmailVerificationState()
    }
  }

  const handleVerifyEmailCode = async () => {
    setFieldTouched('email')

    if (!emailVerification.validateBeforeVerify()) return

    try {
      const result = await verifyEmailCodeMutation.mutateAsync({
        email: state.email.trim(),
        code: emailVerification.code,
      })

      setEmailToken(result.email_token)
      emailVerification.markCodeVerified()
      setErrors((prev) => ({
        ...prev,
        email: '',
      }))
    } catch (error) {
      setEmailToken(null)
      emailVerification.setVerificationError(
        getErrorMessage(error, INVALID_CODE_MESSAGE)
      )
    }
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

  const handleSendPhoneCode = async () => {
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

    try {
      await sendPhoneCodeMutation.mutateAsync({
        phone_number: getFullPhoneNumber(state),
      })

      setErrors((prev) => ({
        ...prev,
        phone: '',
      }))
      setPhoneAvailableMessage(CODE_SENT_MESSAGE)
      phoneVerification.markCodeSent()
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        phone: getErrorMessage(error, CODE_SEND_FAIL_MESSAGE),
      }))
      clearPhoneVerificationState()
    }
  }

  const handleVerifyPhoneCode = async () => {
    setFieldTouched('phone')

    if (!phoneVerification.validateBeforeVerify()) return

    try {
      const result = await verifyPhoneCodeMutation.mutateAsync({
        phone_number: getFullPhoneNumber(state),
        code: phoneVerification.code,
      })

      setSmsToken(result.sms_token)
      phoneVerification.markCodeVerified()
      setErrors((prev) => ({
        ...prev,
        phone: '',
      }))
    } catch (error) {
      setSmsToken(null)
      phoneVerification.setVerificationError(
        getErrorMessage(error, INVALID_CODE_MESSAGE)
      )
    }
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

  const submit = async () => {
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

    if (!emailToken || !smsToken) {
      return
    }

    const payload = mapSignupStateToPayload(state, emailToken, smsToken)

    try {
      await signupMutation.mutateAsync(payload)
      toast.success(SIGNUP_SUCCESS_MESSAGE)
      navigate(ROUTES_PATHS.LOGIN_PAGE)
    } catch (error) {
      toast.error(getErrorMessage(error, SIGNUP_FAIL_MESSAGE))
    }
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
