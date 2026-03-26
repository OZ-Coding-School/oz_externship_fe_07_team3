export type SendPhoneVerificationCodeRequest = {
  phone_number: string
}

export type SendPhoneVerificationCodeResponse = {
  detail: string
}

export type VerifyPhoneVerificationCodeRequest = {
  phone_number: string
  code: string
}

export type VerifyPhoneVerificationCodeResponse = {
  detail: string
  sms_token: string
}

export type ChangePhoneRequest = {
  phone_verify_token: string
}

export type ChangePhoneResponse = {
  detail: string
  phone_number: string
}
