import { api } from './api'
import { APIS_PATHS } from '@/constants/apisPaths'
import type {
  FindEmailRequest,
  FindEmailResponse,
} from '@/types/auth-type/findEmail'
import type {
  loginRequest,
  loginSuccessResponse,
} from '@/types/auth-type/login'

export const postLogin = async (
  payload: loginRequest
): Promise<loginSuccessResponse> => {
  const { data } = await api.post<loginSuccessResponse>(
    APIS_PATHS.POST_LOGIN,
    payload
  )

  return data
}

export const postFindEmail = async (payload: FindEmailRequest) => {
  const { data } = await api.post<FindEmailResponse>(
    APIS_PATHS.FIND_EMAIL,
    payload
  )

  return data
}
