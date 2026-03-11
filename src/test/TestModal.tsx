import { useState } from 'react'
import { Modal } from '@/components/ui/modal/Modal'
import { ModalLayout } from '@/components/ui/modal/ModalLayout'
import RecoveryIconSvg from '@/assets/icons/RecoveryIcon.svg?react'

export default function TestModal() {
  const [modalType, setModalType] = useState<
    'recover' | 'delete' | 'question' | null
  >(null)

  return (
    <div className="flex gap-4">
      <button
        onClick={() => setModalType('recover')}
        className="rounded border p-2"
      >
        계정복구
      </button>

      <button
        onClick={() => setModalType('delete')}
        className="rounded border p-2"
      >
        삭제확인
      </button>

      <button
        onClick={() => setModalType('question')}
        className="rounded border p-2"
      >
        질문팝업
      </button>

      <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>
        {modalType && (
          <ModalLayout
            type={modalType}
            onClose={() => setModalType(null)}
            onConfirm={() => {
              alert('확인')
              setModalType(null)
            }}
            icon={
              modalType === 'recover' ? (
                <RecoveryIconSvg className="h-[40px] w-[40px]" />
              ) : undefined
            }
          />
        )}
      </Modal>
    </div>
  )
}
