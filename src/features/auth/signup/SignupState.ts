export type Gender = 'male' | 'female'

export type SignupState = {
  name: string
  nickname: string
  isNicknameChecked: boolean

  birth: string
  gender?: Gender

  email: string

  phoneFirst: string
  phoneMiddle: string
  phoneLast: string

  password: string
  confirmPassword: string
}

export type SignupErrors = {
  name: string
  nickname: string
  birth: string
  gender: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export type SignupTouched = {
  name: boolean
  nickname: boolean
  birth: boolean
  gender: boolean
  email: boolean
  phone: boolean
  password: boolean
  confirmPassword: boolean
}

export const initialSignupState: SignupState = {
  name: '',
  nickname: '',
  isNicknameChecked: false,

  birth: '',
  gender: undefined,

  email: '',

  phoneFirst: '010',
  phoneMiddle: '',
  phoneLast: '',

  password: '',
  confirmPassword: '',
}

export const initialSignupErrors: SignupErrors = {
  name: '',
  nickname: '',
  birth: '',
  gender: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

export const initialSignupTouched: SignupTouched = {
  name: false,
  nickname: false,
  birth: false,
  gender: false,
  email: false,
  phone: false,
  password: false,
  confirmPassword: false,
}
