export type ResetPasswordRequest = {
  email_token: string
  new_password: string
}

export type ResetPasswordResponse = {
  detail: string
}
