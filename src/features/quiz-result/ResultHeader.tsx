import ArrowIcon from '@/assets/icons/quiz/arrow-left.svg?react'

type ResultHeaderProps = {
  title: string
  questionCount: number
  cheatingCount: number
  elapsedTime: number
  correctAnswerCount: number
  totalScore: number
  onBack: () => void
}

function ResultHeader({
  title,
  questionCount,
  cheatingCount,
  elapsedTime,
  totalScore,
  correctAnswerCount,
  onBack,
}: ResultHeaderProps) {
  const metaItems = [
    `총 문항 수: ${questionCount}`,
    `부정행위: ${cheatingCount}회`,
    `응시시간: ${elapsedTime}분`,
    `응시 결과 점수: ${totalScore}점/${correctAnswerCount}점`,
  ]

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
          <div className="mt-1 flex items-center whitespace-nowrap text-gray-600">
            {metaItems.map((item, index) => (
              <span key={item} className="flex items-center">
                {index > 0 && <span>ㆍ</span>}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default ResultHeader
