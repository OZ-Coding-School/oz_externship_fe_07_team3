import ArrowIcon from '@/assets/icons/quiz/arrow-left.svg?react'
import WarningIcon from '@/assets/icons/quiz/warning-icon.svg?react'
import type { QuizHeaderProps } from '@/types/quizpage-type/quizHeader'

export default function QuizHeader({
  variant,
  title,
  subText,
  timeText,
  onBack,
}: QuizHeaderProps) {
  return (
    <header className="border-grey-9 fixed z-50 flex h-32 w-full items-center justify-between border-b bg-gray-100 px-90">
      <div className="flex items-start">
        <button
          className="mr-3"
          type="button"
          onClick={onBack}
          aria-label="뒤로가기"
        >
          <ArrowIcon />
        </button>
        <div>
          <h1 className="font-semibold">{title}</h1>
          {subText && <p className="text-gray-600">{subText}</p>}
        </div>
      </div>
      {variant === 'inProgress' && (
        <div className="flex gap-6">
          <div className="text-primary-default bg-grey-1 border-grey-7 flex h-[45px] w-[169px] items-center justify-center gap-2 rounded-full border font-semibold">
            {timeText && <span>{timeText}</span>}
          </div>
          <div className="bg-grey-1 border-grey-7 flex h-[45px] w-[169px] items-center justify-center gap-[14px] rounded-full border font-semibold text-gray-700">
            <p>부정행위</p>
            <div className="flex gap-2">
              <WarningIcon />
              <WarningIcon />
              <WarningIcon />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
