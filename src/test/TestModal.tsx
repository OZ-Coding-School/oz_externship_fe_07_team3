import { useState } from 'react'
import { Modal } from '@/components/ui/modal/Modal'
import RecoveryIconSvg from '@/assets/icons/RecoveryIcon.svg?react'

export default function TestModal() {
  const [modalType, setModalType] = useState<
    'recover' | 'delete' | 'question' | null
  >(null)

  const handleClose = () => setModalType(null)
  const handleConfirm = () => {
    alert('확인')
    setModalType(null)
  }

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

      {/* 통합된 Modal 사용: 기존 ModalLayout에 있던 고정 텍스트를 props로 전달 */}
      {modalType && (
        <Modal
          isOpen={!!modalType}
          type={modalType}
          onClose={handleClose}
          onConfirm={handleConfirm}
          // 각 타입에 맞는 텍스트 주입
          title={
            modalType === 'recover'
              ? '해당 계정은 탈퇴된 상태예요'
              : modalType === 'delete'
                ? '게시글을 정말로 삭제하시겠습니까?'
                : '질문이 등록되었습니다.'
          }
          description={
            modalType === 'recover'
              ? `2025년 6월 20일 이후, 계정 정보는 완전히 삭제돼요.\n계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.`
              : undefined
          }
          confirmText={
            modalType === 'recover'
              ? '계정 다시 사용하기'
              : modalType === 'delete'
                ? '삭제'
                : '확인'
          }
          icon={
            modalType === 'recover' ? (
              <RecoveryIconSvg className="h-[40px] w-[40px]" />
            ) : undefined
          }
        />
      )}
    </div>
  )
}
