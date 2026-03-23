import type { Gender, SignupErrors, SignupState } from './SignupState'

const NAME_REGEX = /^[가-힣a-zA-Z\s]{2,20}$/
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,10}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const BIRTH_REGEX = /^\d{8}$/
const PHONE_NUMBER_REGEX = /^\d+$/
const PASSWORD_REGEX =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=[{\]};:'",.<>/?\\|`~]).{8,15}$/

export const validateName = (name: string) => {
  if (!name.trim()) {
    return '이름을 입력해주세요.'
  }
  if (!NAME_REGEX.test(name.trim())) {
    return '이름은 2~20자의 한글 또는 영문으로 입력해주세요.'
  }
  return ''
}

export const validateNickname = (nickname: string) => {
  if (!nickname.trim()) return '닉네임을 입력해주세요.'
  if (!NICKNAME_REGEX.test(nickname.trim())) {
    return '닉네임은 2~10자의 한글, 영문, 숫자로 입력해주세요.'
  }
  return ''
}

export const validateBirth = (birth: string) => {
  if (!birth.trim()) return '생년월일을 입력해주세요.'
  if (!BIRTH_REGEX.test(birth)) {
    return '생년월일은 8자리 숫자로 입력해주세요.'
  }

  const year = Number(birth.slice(0, 4))
  const month = Number(birth.slice(4, 6))
  const day = Number(birth.slice(6, 8))

  const date = new Date(year, month - 1, day)
  const isValidDate =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day

  if (!isValidDate) return '올바른 생년월일을 입력해주세요.'

  return ''
}

export const validateGender = (gender?: Gender) => {
  if (!gender) return '성별을 선택해주세요.'
  return ''
}

export const validateEmail = (email: string) => {
  if (!email.trim()) return '이메일을 입력해주세요.'
  if (!EMAIL_REGEX.test(email.trim())) {
    return '올바른 이메일 형식을 입력해주세요.'
  }
  return ''
}

export const validatePhone = (
  phoneFirst: string,
  phoneMiddle: string,
  phoneLast: string
) => {
  if (!phoneFirst || !phoneMiddle || !phoneLast) {
    return '휴대전화 번호를 입력해주세요.'
  }

  if (phoneFirst.length !== 3) return '휴대전화 번호를 올바르게 입력해주세요.'
  if (phoneMiddle.length < 3 || phoneMiddle.length > 4) {
    return '휴대전화 번호를 올바르게 입력해주세요.'
  }
  if (phoneLast.length !== 4) return '휴대전화 번호를 올바르게 입력해주세요.'

  if (
    !PHONE_NUMBER_REGEX.test(phoneFirst) ||
    !PHONE_NUMBER_REGEX.test(phoneMiddle) ||
    !PHONE_NUMBER_REGEX.test(phoneLast)
  ) {
    return '휴대전화 번호는 숫자만 입력해주세요.'
  }

  return ''
}

export const validatePassword = (password: string) => {
  if (!password.trim()) return '비밀번호를 입력해주세요.'
  if (!PASSWORD_REGEX.test(password)) {
    return '비밀번호는 8~15자의 영문, 숫자, 특수문자를 포함해야 합니다.'
  }
  return ''
}

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
) => {
  if (!confirmPassword.trim()) return '비밀번호 확인을 입력해주세요.'
  if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다.'
  return ''
}

export const validateSignupForm = (state: SignupState): SignupErrors => {
  return {
    name: validateName(state.name),
    nickname: validateNickname(state.nickname),
    birth: validateBirth(state.birth),
    gender: validateGender(state.gender),
    email: validateEmail(state.email),
    phone: validatePhone(state.phoneFirst, state.phoneMiddle, state.phoneLast),
    password: validatePassword(state.password),
    confirmPassword: validateConfirmPassword(
      state.password,
      state.confirmPassword
    ),
  }
}

export const hasSignupErrors = (errors: SignupErrors) =>
  Object.values(errors).some(Boolean)

export const isSignupFormFilled = (state: SignupState) =>
  Boolean(
    state.name.trim() &&
    state.nickname.trim() &&
    state.birth.trim() &&
    state.gender &&
    state.email.trim() &&
    state.phoneFirst.trim() &&
    state.phoneMiddle.trim() &&
    state.phoneLast.trim() &&
    state.password.trim() &&
    state.confirmPassword.trim()
  )
