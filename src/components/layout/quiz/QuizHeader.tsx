import ArrowIcon from '@/assets/icons/quiz/arrow-left.svg?react'
import WarningGrayIcon from '@/assets/icons/quiz/warning-box-gray.svg?react'
import WarningRedIcon from '@/assets/icons/quiz/warning-box-red.svg?react'
import WarningYellowIcon from '@/assets/icons/quiz/warning-box-yellow.svg?react'
import type { QuizHeaderProps } from '@/types/quizpage-type/quizHeader'

export default function QuizHeader({
  variant,
  title,
  subText,
  timeText,
  onBack,
  cheatingCount = 0,
}: QuizHeaderProps) {
  const warningIcons = [0, 1, 2].map((index) => {
    if (cheatingCount >= 3 && index === 2) {
      return <WarningRedIcon key={index} />
    }

    if (index < Math.min(cheatingCount, 2)) {
      return <WarningYellowIcon key={index} />
    }

    return <WarningGrayIcon key={index} />
  })

  return (
    <header className="border-grey-9 sticky top-0 z-50 flex h-32 items-center justify-between border-b bg-gray-100 px-90">
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
            <div className="flex gap-2">{warningIcons}</div>
          </div>
        </div>
      )}
    </header>
  )
}
