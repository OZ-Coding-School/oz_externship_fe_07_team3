import { changePhone } from '@/api/mypage'
import { useMutation } from '@tanstack/react-query'

export const useChangePhone = () => {
  return useMutation({
    mutationFn: changePhone,
  })
}
