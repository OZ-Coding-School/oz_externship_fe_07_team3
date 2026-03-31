import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'

type OrderingResultProps = {
  question: ResultQuestion
}

function OrderingResult({ question }: OrderingResultProps) {
  const options = question.options ?? []

  const userOrder = Array.isArray(question.submitted_answer)
    ? question.submitted_answer
    : []

  const correctOrder = Array.isArray(question.answer) ? question.answer : []

  // A, B, C, D 라벨 생성
  const optionItems = options.map((option, index) => ({
    label: String.fromCharCode(65 + index),
    text: option,
  }))

  // 라벨 → 값 변환
  const getValueByLabel = (label: string) => {
    if (!/^[A-Z]$/.test(label)) {
      return label
    }

    const index = label.charCodeAt(0) - 65
    return options[index] ?? ''
  }

  // 값 → 라벨 변환
  const getLabelByValue = (value: string) => {
    if (/^[A-Z]$/.test(value)) {
      return value
    }

    const index = options.findIndex((option) => option === value)

    if (index === -1) {
      return ''
    }

    return String.fromCharCode(65 + index)
  }

  return (
    <div>
      <div className="my-5 w-162 rounded-[4px] bg-gray-100 px-4 py-5">
        <ul className="flex flex-col gap-5">
          {optionItems.map((item) => (
            <li key={item.label} className="flex items-center gap-4">
              <div className="bg-primary-100 text-primary-default flex h-8 w-8 items-center justify-center rounded-[4px] text-[18px]">
                {item.label}
              </div>
              <span className="text-ui-gray-primary text-[16px]">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 사용자 답안 표시 */}
      <div className="flex gap-2.5">
        {correctOrder.map((_, index) => {
          const rawUserValue =
            typeof userOrder[index] === 'string' ? userOrder[index] : ''

          // 라벨이면 값으로 변환
          const userValue = rawUserValue ? getValueByLabel(rawUserValue) : ''

          const isAnswered = Boolean(userValue)

          // 값 기준 비교
          const isCorrect = isAnswered && userValue === correctOrder[index]

          // 다시 라벨로 변환해서 UI 표시
          const userLabel = userValue ? getLabelByValue(userValue) : ''

          return (
            <div
              key={index}
              className={cn(
                'flex h-15 w-15 items-center justify-center rounded-[4px]',
                {
                  'bg-green-100 text-green-600': isCorrect,
                  'bg-red-100 text-red-500': isAnswered && !isCorrect,
                  'text-ui-gray-disabled bg-gray-100': !isAnswered,
                }
              )}
            >
              <span className="text-2xl font-semibold">{userLabel || '-'}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderingResult
