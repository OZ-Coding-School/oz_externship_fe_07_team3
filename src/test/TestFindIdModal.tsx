import { useState } from 'react'

import FindIdModal from '@/features/auth/find-id/FindIdModal'
import type { FindIdHandlers } from '@/features/auth/find-id/useFindId'

const MOCK_USER = {
  name: '홍길동',
  phone: '01012345678',
  maskedEmail: 'ozcoding@g****.com',
}

const mockHandlers: FindIdHandlers = {
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

const TestFindIdModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded border p-2"
      >
        아이디 찾기 모달 (테스트)
      </button>

      <FindIdModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onFindPassword={() => {
          setIsOpen(false)
          // TODO: 비밀번호 찾기 모달 구현 후 연결 예정
        }}
        handlers={mockHandlers}
      />
    </div>
  )
}

export default TestFindIdModal
