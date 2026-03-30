import { useMutation } from '@tanstack/react-query'

import { postRestoreAccount } from '@/api/auth'

export const useRestoreAccount = () => {
  return useMutation({
    mutationFn: postRestoreAccount,
  })
}
