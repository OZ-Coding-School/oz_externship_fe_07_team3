import { type ReactNode } from 'react'
import Button from '@/components/ui/button'

export type ModalType = 'recover' | 'delete' | 'question'

interface ModalLayoutProps {
  type: ModalType
  onClose: () => void
  onConfirm: () => void
  icon?: ReactNode
}

export const ModalLayout = ({
  type,
  onClose,
  onConfirm,
  icon,
}: ModalLayoutProps) => {
  const textBase = "font-['Pretendard'] leading-[140%] tracking-[-0.03em]"

  const isRecover = type === 'recover'
  const isDelete = type === 'delete'
  const isQuestion = type === 'question'

  return (
    <div className="relative flex w-full flex-col font-['Pretendard']">
      {/* X 버튼 (recover만) */}
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

      {/* 계정 복구 */}
      {isRecover && (
        <div className="flex flex-col items-center p-[32px_28px_24px] text-center">
          <div className="mb-[40px] flex w-full flex-col items-center gap-[16px]">
            {icon && <div>{icon}</div>}
            <h2
              className={`${textBase} text-gray-primary text-[20px] font-bold`}
            >
              해당 계정은 탈퇴된 상태예요
            </h2>
            <p className={`${textBase} text-[14px] font-normal text-gray-600`}>
              2025년 6월 20일 이후, 계정 정보는 완전히 삭제돼요.
              <br />
              계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
            </p>
          </div>
          <Button
            className="!bg-primary-default !h-[52px] !w-full !rounded-[8px] font-bold !text-white hover:opacity-90"
            onClick={onConfirm}
          >
            계정 다시 사용하기
          </Button>
        </div>
      )}

      {/* 삭제 */}
      {isDelete && (
        <div className="flex flex-col items-center p-[28px]">
          <div className="mb-[40px] w-full text-left">
            <p className={`${textBase} text-[16px] text-gray-700`}>
              게시글을 정말로 삭제하시겠습니까?
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
              삭제
            </Button>
          </div>
        </div>
      )}

      {/* 질문 완료 */}
      {isQuestion && (
        <div className="flex flex-col items-center p-[28px]">
          <div className="mb-[40px] w-full text-left">
            <p className={`${textBase} text-[16px] text-gray-700`}>
              질문이 등록되었습니다.
            </p>
          </div>
          <div className="flex w-full justify-end">
            <Button
              className="!bg-primary-default !h-[40px] !w-[76px] !rounded-full font-bold !text-white"
              onClick={onConfirm}
            >
              확인
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
