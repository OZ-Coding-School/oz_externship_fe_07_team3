import { useState } from 'react'

import FindIdModal from '@/features/auth/find-id/FindIdModal'
import { findIdMockHandlers } from '@/test/mocks/findIdMockHandlers'

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
        }}
        handlers={findIdMockHandlers}
      />
    </div>
  )
}

export default TestFindIdModal
