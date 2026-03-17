import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useModalScroll } from '@/hooks/useModalScroll'
import { cn } from '@/lib/utils'

/**
 * X버튼이 없는 팝업 컴포넌트 (배경 클릭으로 닫힘)
 * 모달(z-[1000]) 위에 중첩으로 뜰 수 있도록 z-[1001] 설정
 * @param isOpen - 팝업 열림 여부
 * @param onClose - 닫기 핸들러
 * @param children - 팝업 내부 콘텐츠
 * @param width - 팝업 너비 (Tailwind 클래스)
 * @param shadow - 그림자 여부 (기본값: true)
 * @param isNested - Modal 위에 중첩 여부, true일 때 배경 딤처리 제거 (기본값: false)
 * @example
 * <Popup isOpen={isOpen} onClose={handleClose} width="w-[428px]">
 *   <div>내용</div>
 * </Popup>
 */

type PopupProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  width?: string
  shadow?: boolean
  isNested?: boolean
}

export default function Popup({
  isOpen,
  onClose,
  children,
  width,
  shadow = true,
  isNested = false,
}: PopupProps) {
  useModalScroll(isOpen)

  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-root') ?? document.body

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed inset-0 z-[1001] flex items-center justify-center',
        !isNested && 'bg-ui-gray-primary/60'
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-[12px] bg-white',
          shadow && 'shadow-[0_4px_16px_rgba(160,160,160,0.25)]',
          width
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  )
}
