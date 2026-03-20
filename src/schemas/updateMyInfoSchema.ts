import { z } from 'zod'

const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]+$/
const BIRTHDAY_REGEX = /^\d{4}-\d{2}-\d{2}$/

export const genderSchema = z.enum(['M', 'F'])

const isValidBirthday = (value: string) => {
  if (!BIRTHDAY_REGEX.test(value)) {
    return false
  }

  const [year, month, day] = value.split('-').map(Number)

  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

export const nicknameSchema = z
  .string()
  .trim()
  .min(2, '닉네임은 2자 이상 입력해주세요.')
  .max(10, '닉네임은 10자 이하로 입력해주세요.')
  .regex(NICKNAME_REGEX, '닉네임은 한글, 영문, 숫자만 사용할 수 있어요.')

export const updateMyInfoFormSchema = z.object({
  nickname: nicknameSchema,
  name: z.string().trim().min(1, '이름을 입력해주세요.'),
  birthday: z
    .string()
    .trim()
    .regex(BIRTHDAY_REGEX, '생년월일은 YYYYMMDD 형식으로 입력해주세요.')
    .refine(isValidBirthday, '올바른 생년월일을 입력해주세요.'),
  gender: genderSchema,
})

export type UpdateMyInfoFormValues = z.infer<typeof updateMyInfoFormSchema>

/**
 * 숫자만 입력받아 YYYY-MM-DD 형태로 자동 포맷
 * 예: 20260101 -> 2026-01-01
 */
export const formatBirthdayInput = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 8)

  if (numbers.length <= 4) {
    return numbers
  }

  if (numbers.length <= 6) {
    return `${numbers.slice(0, 4)}-${numbers.slice(4)}`
  }

  return `${numbers.slice(0, 4)}-${numbers.slice(4, 6)}-${numbers.slice(6, 8)}`
}
