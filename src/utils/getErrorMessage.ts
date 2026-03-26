import type { ErrorDetailResponse } from '@/types/api-response/myPageResponse'
import { AxiosError } from 'axios'

export const getErrorMessage = (
  error: unknown,
  fallbackMessage: string
): string => {
  if (error instanceof AxiosError) {
    const responseData = error.response?.data as ErrorDetailResponse | undefined

    if (!responseData) {
      return fallbackMessage
    }

    if (
      'error_detail' in responseData &&
      typeof responseData.error_detail === 'string'
    ) {
      return responseData.error_detail
    }

    if (
      'error_detail' in responseData &&
      responseData.error_detail &&
      typeof responseData.error_detail === 'object'
    ) {
      const firstError = Object.values(responseData.error_detail)[0]?.[0]
      if (firstError) {
        return firstError
      }
    }
  }

  return fallbackMessage
}
