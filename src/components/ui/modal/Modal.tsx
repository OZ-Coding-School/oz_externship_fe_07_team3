import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useModalScroll } from '@/hooks/useModalScroll'

/**
 * X버튼이 있는 모달 컴포넌트 (배경 클릭으로 닫히지 않음)
 * @param isOpen - 모달 열림 여부
 * @param onClose - 닫기 핸들러
 * @param children - 모달 내부 콘텐츠
 * @param width - 모달 너비 (Tailwind 클래스)
 * @param shadow - 그림자 여부 (기본값: true)
 * @example
 * <Modal isOpen={isOpen} onClose={handleClose} width="w-[396px]">
 *   <div>내용</div>
 * </Modal>
 */

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  width?: string
  shadow?: boolean
}

export default function Modal({
  isOpen,
  onClose,
  children,
  width,
  shadow = true,
}: ModalProps) {
  useModalScroll(isOpen)

  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-root') ?? document.body

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
    >
      <div
        className={`relative overflow-hidden rounded-[12px] bg-white ${shadow ? 'shadow-[0_4px_16px_rgba(160,160,160,0.25)]' : ''} ${width}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end px-[24px] pt-[20px]">
          <button
            onClick={onClose}
            className="text-ui-gray-400 hover:text-ui-gray-600 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    modalRoot
  )
}
