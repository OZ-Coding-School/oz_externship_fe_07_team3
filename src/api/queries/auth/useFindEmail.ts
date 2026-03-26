import { postFindEmail } from '@/api/auth'
import type {
  FindEmailRequest,
  FindEmailResponse,
} from '@/types/auth-type/findEmail'
import { useMutation } from '@tanstack/react-query'

export const useFindEmail = () => {
  return useMutation<FindEmailResponse, Error, FindEmailRequest>({
    mutationFn: (payload: FindEmailRequest) => postFindEmail(payload),
  })
}
