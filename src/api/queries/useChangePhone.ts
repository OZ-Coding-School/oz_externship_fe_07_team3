import { useMutation } from '@tanstack/react-query'
import { changePhone } from '../mypage'

export const useChangePhone = () => {
  return useMutation({
    mutationFn: changePhone,
  })
}
