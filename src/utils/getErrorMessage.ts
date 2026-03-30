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

    if (Array.isArray(responseData.error_detail)) {
      return responseData.error_detail[0] ?? fallbackMessage
    }

    if (
      responseData.error_detail &&
      typeof responseData.error_detail === 'object'
    ) {
      for (const value of Object.values(responseData.error_detail)) {
        if (typeof value === 'string') return value
        if (Array.isArray(value) && typeof value[0] === 'string')
          return value[0]
      }
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
