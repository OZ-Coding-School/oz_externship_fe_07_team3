import { useMutation } from '@tanstack/react-query'
import type { ChangePasswordResponse } from '@/types/api-response/myPageResponse'
import type { ChangePasswordRequest } from '@/types/api-request/myPageRequest'
import { postChangePassword } from '../mypage'

export const useChangePassword = () => {
  return useMutation<ChangePasswordResponse, Error, ChangePasswordRequest>({
    mutationFn: postChangePassword,
  })
}
