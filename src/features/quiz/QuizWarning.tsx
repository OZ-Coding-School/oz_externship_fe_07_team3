import AlertIcon from '@/assets/icons/quiz/alert-circle.png'
import CloseIcon from '@/assets/icons/quiz/icon-x-gray.svg?react'

type QuizWarningProps = {
  isVisible: boolean
  onClose: () => void
}

function QuizWarning({ isVisible, onClose }: QuizWarningProps) {
  if (!isVisible) {
    return null
  }

  return (
    <div className="bg-primary-100 flex w-full min-w-180 items-start justify-between rounded-[8px] px-5 py-6 whitespace-nowrap">
      <div className="flex gap-3">
        <img className="h-6 w-6 shrink-0" src={AlertIcon} alt="경고 아이콘" />
        <div>
          <strong className="block text-base font-semibold">
            시험에만 집중해 주세요
          </strong>
          <p className="mt-1 text-sm leading-[140%] font-normal">
            탭이나 창을 이동하면 부정행위로 처리돼 시험이 중단될 수 있어요.
            안정적인 환경에서 시험을 이어가 주세요.
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="경고 닫기"
        onClick={onClose}
        className="ml-4 shrink-0 cursor-pointer"
      >
        <CloseIcon className="h-3 w-3 text-[#0F172A]" />
      </button>
    </div>
  )
}

export default QuizWarning
