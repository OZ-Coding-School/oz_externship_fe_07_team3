import type { ChangePasswordFormValues } from '@/schemas/changePasswordSchema'

type PasswordFieldConfig = {
  id: string
  label: string
  name: keyof ChangePasswordFormValues
  placeholder: string
}

export const PASSWORD_CHANGE_FIELDS: PasswordFieldConfig[] = [
  {
    id: 'old_password',
    label: '기존 비밀번호',
    name: 'old_password',
    placeholder: '기존 비밀번호를 입력해주세요.',
  },
  {
    id: 'new_password',
    label: '새 비밀번호',
    name: 'new_password',
    placeholder: '새 비밀번호를 입력해주세요.',
  },
  {
    id: 'confirmPassword',
    label: '새 비밀번호 확인',
    name: 'confirmPassword',
    placeholder: '새 비밀번호를 한 번 더 입력해주세요.',
  },
]
