import { logout, type LogoutResponse } from '@/api/mypage'
import { useMutation } from '@tanstack/react-query'

export const useLogout = () => {
  return useMutation<LogoutResponse, Error>({
    mutationFn: logout,
  })
}
