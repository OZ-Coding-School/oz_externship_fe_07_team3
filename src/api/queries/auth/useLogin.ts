import { useMutation } from '@tanstack/react-query'
import type {
  loginRequest,
  loginSuccessResponse,
} from '@/types/auth-type/login'
import { postLogin } from '@/api/auth'

export const useLogin = () => {
  return useMutation<loginSuccessResponse, Error, loginRequest>({
    mutationFn: postLogin,
  })
}
