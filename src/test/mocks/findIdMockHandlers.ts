import type { FindIdHandlers } from '@/hooks/useFindId'

const MOCK_USER = {
  name: '홍길동',
  phone: '01012345678',
  maskedEmail: 'ozcoding@g****.com',
}

export const findIdMockHandlers: FindIdHandlers = {
  onSendCode: async ({ name, phone }) => {
    if (name.trim() !== MOCK_USER.name || phone.trim() !== MOCK_USER.phone) {
      throw new Error(
        '입력한 이름과 휴대폰 번호로 등록된\n이메일이 존재하지 않습니다.'
      )
    }
  },

  onVerifyCode: async ({ code }) => {
    if (code.trim() !== '123456') {
      throw new Error('인증번호가 일치하지 않습니다.')
    }
  },

  onFindId: async ({ name, phone }) => {
    if (name.trim() !== MOCK_USER.name || phone.trim() !== MOCK_USER.phone) {
      throw new Error(
        '입력한 이름과 휴대폰 번호로 등록된\n이메일이 존재하지 않습니다.'
      )
    }
    return { maskedEmail: MOCK_USER.maskedEmail }
  },
}
