import { z } from 'zod'

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^\w\s]).{6,15}$/

export const changePasswordSchema = z
  .object({
    old_password: z.string().trim().min(1, '기존 비밀번호를 입력해주세요.'),
    new_password: z
      .string()
      .trim()
      .min(1, '새 비밀번호를 입력해주세요.')
      .regex(
        passwordRegex,
        '영문, 숫자, 특수문자를 포함한 6~15자로 입력해주세요.'
      ),
    confirmPassword: z
      .string()
      .trim()
      .min(1, '새 비밀번호를 한 번 더 입력해주세요.'),
  })
  .refine((data) => data.new_password === data.confirmPassword, {
    message: '비밀번호와 비밀번호 확인값이 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>
