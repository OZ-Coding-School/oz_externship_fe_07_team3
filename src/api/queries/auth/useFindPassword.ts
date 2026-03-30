import { postResetPassword } from '@/api/auth'
import type { ResetPasswordRequest } from '@/types/auth-type/resetPassword'
import { useMutation } from '@tanstack/react-query'

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (payload: ResetPasswordRequest) => postResetPassword(payload),
  })
}
