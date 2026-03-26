import { postFindEmail } from '@/api/auth'
import type { FindEmailRequest } from '@/types/auth-type/findEmail'
import { useMutation } from '@tanstack/react-query'

export const useFindEmail = () => {
  return useMutation({
    mutationFn: (payload: FindEmailRequest) => postFindEmail(payload),
  })
}
