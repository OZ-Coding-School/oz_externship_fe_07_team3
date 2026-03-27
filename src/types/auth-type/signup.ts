export type SendEmailVerificationCodeRequest = {
  email: string
}

export type SendEmailVerificationCodeResponse = {
  detail: string
}

export type VerifyEmailVerificationCodeRequest = {
  email: string
  code: string
}

export type VerifyEmailVerificationCodeResponse = {
  detail: string
  email_token: string
}

export type SignupRequest = {
  password: string
  nickname: string
  name: string
  birthday: string
  gender: 'M' | 'F'
  email_token: string
  sms_token: string
}

export type SignupResponse = {
  detail: string
  user_info: {
    email: string
    nickname: string
    name: string
    birthday: string
    gender: 'M' | 'F'
    phone_number: string
  }
}
