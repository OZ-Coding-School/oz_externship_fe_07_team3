import { useState } from 'react'

import FindIdModal, {
  type FindIdHandlers,
} from '@/features/auth/login/FindIdModal'

/**
 * 아이디 찾기 모달 테스트용 컴포넌트
 *
 * mock 성공 조건: 이름 "홍길동" + 휴대전화 "01012345678" + 인증번호 "123456"
 * mock 실패 조건: 위 정보 외 다른 값 입력 시 에러 메시지 표시
 *
 * API 연동 후에는 LoginPage의 handlers를 실제 API 호출로 교체합니다.
 */

const MOCK_USER = {
  name: '홍길동',
  phone: '01012345678',
  maskedEmail: 'ozcoding@g****.com',
}

const mockHandlers: FindIdHandlers = {
  onSendCode: ({ name, phone, setFindErrorMessage, setIsCodeSent }) => {
    if (name.trim() !== MOCK_USER.name || phone.trim() !== MOCK_USER.phone) {
      setFindErrorMessage(
        '입력한 이름과 휴대폰 번호로 등록된\n이메일이 존재하지 않습니다.'
      )
      setIsCodeSent(false)
      return
    }

    setFindErrorMessage('')
    setIsCodeSent(true)
  },

  onVerifyCode: ({ code, setCodeErrorMessage, setIsCodeVerified }) => {
    if (code.trim() !== '123456') {
      setCodeErrorMessage('인증번호가 일치하지 않습니다.')
      setIsCodeVerified(false)
      return
    }

    setCodeErrorMessage('')
    setIsCodeVerified(true)
  },

  onFindId: ({ setFindErrorMessage, setMaskedEmail, setStep }) => {
    setFindErrorMessage('')
    setMaskedEmail(MOCK_USER.maskedEmail)
    setStep('success')
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
