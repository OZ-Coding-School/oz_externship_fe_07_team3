import { api, publicApi } from './api'
import { APIS_PATHS } from '@/constants/apisPaths'
import type {
  FindEmailRequest,
  FindEmailResponse,
} from '@/types/auth-type/findEmail'
import type {
  loginRequest,
  loginSuccessResponse,
} from '@/types/auth-type/login'
import type {
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/types/auth-type/resetPassword'
import type {
  RestoreAccountRequest,
  RestoreAccountResponse,
} from '@/types/auth-type/restoreAccount'

type RefreshResponse = {
  access_token: string
}

export const postLogin = async (
  payload: loginRequest
): Promise<loginSuccessResponse> => {
  const { data } = await publicApi.post<loginSuccessResponse>(
    APIS_PATHS.POST_LOGIN,
    payload
  )

  return data
}

export const postFindEmail = async (
  payload: FindEmailRequest
): Promise<FindEmailResponse> => {
  const { data } = await api.post<FindEmailResponse>(
    APIS_PATHS.FIND_EMAIL,
    payload
  )

  return data
}

export const postResetPassword = async (payload: ResetPasswordRequest) => {
  const { data } = await api.post<ResetPasswordResponse>(
    APIS_PATHS.RESET_PASSWORD,
    payload
  )

  return data
}

export const postRestoreAccount = async (payload: RestoreAccountRequest) => {
  const { data } = await publicApi.post<RestoreAccountResponse>(
    APIS_PATHS.ACCOUNTS_RESTORE,
    payload
  )

  return data
}

export const postRefreshToken = async (): Promise<RefreshResponse> => {
  const { data } = await api.post<RefreshResponse>(APIS_PATHS.REFRESH_TOKEN)
  return data
}
