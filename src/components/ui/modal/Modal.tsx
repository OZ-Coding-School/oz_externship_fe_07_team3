import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Button from '@/components/ui/button'

// 1. 컨벤션에 따라 interface 대신 type 선언 사용
export type ModalType = 'recover' | 'delete' | 'question'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void // 확인 버튼 액션
  title: string // 밖에서 주입받는 제목 (기존 ModalLayout의 h2/p 텍스트)
  description?: string // 밖에서 주입받는 본문 (recover 타입 전용)
  type: ModalType // 분기 처리를 위한 타입
  icon?: ReactNode // 아이콘 (recover 타입 등)
  confirmText?: string // 확인 버튼 문구 커스텀 (삭제/확인 등)
  width?: string
}

export const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  type,
  icon,
  confirmText = '확인',
  width = 'w-[428px]',
}: ModalProps) => {
  // 2. 스크롤 방지 로직
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const modalRoot = document.getElementById('modal-root') ?? document.body

  // 3. 텍스트 베이스 스타일
  const textBase = "font-['Pretendard'] leading-[140%] tracking-[-0.03em]"
  const isRecover = type === 'recover'
  const isDelete = type === 'delete'
  const isQuestion = type === 'question'

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      // 4. 배경 스타일(선명한 bg-black/50, blur 없음)
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        // 5. 컨테이너 스타일(rounded, shadow)
        className={`relative h-auto overflow-hidden rounded-[16px] bg-white shadow-[0px_4px_16px_rgba(160,160,160,0.25)] ${width}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex w-full flex-col font-['Pretendard']">
          {/* 6. X 버튼 로직 (recover 타입만) */}
          {isRecover && (
            <div className="absolute top-[20px] right-[24px] z-10">
              <button
                onClick={onClose}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
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
          )}
          {/* 7. [계정 복구 레이아웃] 수치 및 스타일 (whitespace-pre-wrap으로 줄바꿈 허용) */}
          {isRecover && (
            <div className="flex flex-col items-center p-[32px_28px_24px] text-center">
              <div className="mb-[40px] flex w-full flex-col items-center gap-[16px]">
                {icon && <div>{icon}</div>}
                <h2
                  className={`${textBase} text-gray-primary text-[20px] font-bold`}
                >
                  {title}
                </h2>
                {description && (
                  <p
                    className={`${textBase} text-[14px] font-normal whitespace-pre-wrap text-gray-600`}
                  >
                    {description}
                  </p>
                )}
              </div>
              <Button
                className="!bg-primary-default !h-[52px] !w-full !rounded-[8px] font-bold !text-white hover:opacity-90"
                onClick={onConfirm}
              >
                {confirmText}
              </Button>
            </div>
          )}
          {/* 8. [삭제 레이아웃] 수치(p-28, text-16) 및 버튼 스타일 */}
          {isDelete && (
            <div className="flex flex-col items-center p-[28px]">
              <div className="mb-[40px] w-full text-left">
                <p className={`${textBase} text-[16px] text-gray-700`}>
                  {title}
                </p>
              </div>
              <div className="flex w-full justify-end gap-[12px]">
                <Button
                  className="!bg-primary-100 !text-primary-600 hover:bg-primary-200 !h-[40px] !w-[76px] !rounded-full font-bold"
                  onClick={onClose}
                >
                  취소
                </Button>
                <Button
                  className="!bg-primary-default !h-[40px] !w-[76px] !rounded-full font-bold !text-white"
                  onClick={onConfirm}
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          )}
          {/* 9. [질문 완료 레이아웃] 수치(p-28, text-16) 유지 */}
          {isQuestion && (
            <div className="flex flex-col items-center p-[28px]">
              <div className="mb-[40px] w-full text-left">
                <p className={`${textBase} text-[16px] text-gray-700`}>
                  {title}
                </p>
              </div>
              <div className="flex w-full justify-end">
                <Button
                  className="!bg-primary-default !h-[40px] !w-[76px] !rounded-full font-bold !text-white"
                  onClick={onConfirm}
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    modalRoot
  )
}
