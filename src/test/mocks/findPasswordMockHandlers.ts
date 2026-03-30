import type { FindPasswordHandlers } from '@/hooks/useFindPassword'

export const findPasswordMockHandlers: FindPasswordHandlers = {
  onSendCode: async ({ email }) => {
    if (email.trim() !== 'test@test.com') {
      throw new Error('등록된 이메일이 아닙니다.')
    }
  },

  onVerifyCode: async ({ code }) => {
    if (code.trim() !== '123456') {
      throw new Error('인증번호가 일치하지 않습니다.')
    }

    return {
      email_token: 'email@email',
    }
  },

  onResetPassword: async ({ newPassword }) => {
    if (newPassword.trim() === 'Fail123!') {
      throw new Error('비밀번호 변경에 실패했습니다.')
    }
  },
}
