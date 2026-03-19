import type {
  CheckNicknameErrorResponse,
  CheckNicknameRequest,
  CheckNicknameSuccessResponse,
} from '@/types/checkNickName'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { postCheckNickname } from '../checkNickName'

export const useCheckNickName = () => {
  return useMutation<
    CheckNicknameSuccessResponse,
    AxiosError<CheckNicknameErrorResponse>,
    CheckNicknameRequest
  >({
    mutationFn: postCheckNickname,
  })
}
