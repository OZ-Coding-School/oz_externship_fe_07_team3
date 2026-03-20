import type { ErrorDetailResponse } from '@/types/api-response/myPageResponse'
import { AxiosError } from 'axios'

export type MyInfoFieldErrors = {
  nickname?: string
  name?: string
  birthday?: string
  gender?: string
  phone_number?: string
  common?: string
}

const getFirstErrorMessage = (value: unknown) => {
  if (Array.isArray(value) && typeof value[0] === 'string') {
    return value[0]
  }

  return undefined
}

/**
 * 마이페이지 - 내 정보 수정 에러 처리 함수
 */
export const parseUpdateMyInfoError = (error: unknown): MyInfoFieldErrors => {
  const fallbackMessage = '요청 처리 중 오류가 발생했습니다.'

  if (!(error instanceof AxiosError)) {
    return { common: fallbackMessage }
  }

  const responseData = error.response?.data as ErrorDetailResponse | undefined
  const errorDetail = responseData?.error_detail

  if (!errorDetail) {
    return { common: fallbackMessage }
  }

  if (typeof errorDetail === 'string') {
    return { common: errorDetail }
  }

  if (typeof errorDetail === 'object') {
    return {
      nickname: getFirstErrorMessage(errorDetail.nickname),
      name: getFirstErrorMessage(errorDetail.name),
      birthday: getFirstErrorMessage(errorDetail.birthday),
      gender: getFirstErrorMessage(errorDetail.gender),
      common: undefined,
    }
  }

  return { common: fallbackMessage }
}
