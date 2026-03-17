import type { FieldValues, Path, UseFormSetError } from 'react-hook-form'
import { z, type ZodError } from 'zod'

type MapZodErrorsToRHFParams<TFieldValues extends FieldValues> = {
  error: ZodError<TFieldValues>
  setError: UseFormSetError<TFieldValues>
}

/**
 * Zod 에러를 react-hook-form의 setError 형태로 변환해주는 함수
 */
export const changePasswordZodErrorsToRHF = <TFieldValues extends FieldValues>({
  error,
  setError,
}: MapZodErrorsToRHFParams<TFieldValues>) => {
  const { fieldErrors } = z.flattenError(error)

  Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
    const firstMessage = messages?.[0]
    if (!firstMessage) {
      return
    }

    setError(fieldName as Path<TFieldValues>, {
      type: 'manual',
      message: firstMessage,
    })
  })
}
