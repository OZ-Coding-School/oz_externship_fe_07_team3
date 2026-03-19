export type CheckNicknameRequest = {
  nickname: string
}

export type CheckNicknameSuccessResponse = {
  detail: string
}

export type CheckNicknameErrorResponse = {
  error_detail: string | Record<string, string[]>
}
