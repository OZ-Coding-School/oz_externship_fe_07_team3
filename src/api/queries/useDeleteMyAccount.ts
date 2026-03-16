import { useMutation } from '@tanstack/react-query'

import { deleteMyAccount } from '@/api/mypage'
import type { DeleteMyAccountRequest } from '@/types'

export const useDeleteMyAccount = () => {
  return useMutation({
    mutationFn: (payload: DeleteMyAccountRequest) => deleteMyAccount(payload),
  })
}
