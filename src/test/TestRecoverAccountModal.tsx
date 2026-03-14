import { useState } from 'react'

import RecoverAccountModal from '@/features/auth/login/RecoverAccountModal'

const TestRecoverAccountModal = () => {
  const [isRecoverAccountModalOpen, setIsRecoverAccountModalOpen] =
    useState(false)

  return (
    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => setIsRecoverAccountModalOpen(true)}
        className="rounded border p-2"
      >
        회원탈퇴 복구 모달
      </button>

      <RecoverAccountModal
        isOpen={isRecoverAccountModalOpen}
        onClose={() => setIsRecoverAccountModalOpen(false)}
      />
    </div>
  )
}

export default TestRecoverAccountModal
