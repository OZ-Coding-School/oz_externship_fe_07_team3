import { useState } from 'react'

import FindPasswordModal from '@/features/auth/find-password/FindPasswordModal'

const TestFindPasswordModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded border p-2"
      >
        비밀번호 찾기 모달 (테스트)
      </button>

      <FindPasswordModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

export default TestFindPasswordModal
