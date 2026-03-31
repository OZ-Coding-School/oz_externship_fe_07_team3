import type {
  CheckNicknameRequest,
  CheckNicknameSuccessResponse,
} from '@/types/checkNickName'
import { publicApi } from './api'
import { APIS_PATHS } from '@/constants/apisPaths'

export const postCheckNickname = async (
  payload: CheckNicknameRequest
): Promise<CheckNicknameSuccessResponse> => {
  const { data } = await publicApi.post<CheckNicknameSuccessResponse>(
    APIS_PATHS.CHECK_NICKNAME,
    payload
  )

  return data
}
