export type loginRequest = {
  email: string
  password: string
}

export type loginSuccessResponse = {
  access_Token: string
}

export type loginErrorResponse = {
  errorDetail: {
    email?: string
    password?: string
    detail?: string
    expireAt?: string //Todo: Date 객체인지 String인지 확인하기
  }
}
