import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'

type OrderingResultProps = {
  question: ResultQuestion
}

function OrderingResult({ question }: OrderingResultProps) {
  const options = question.options ?? []
  const userOrder = Array.isArray(question.user_answer)
    ? question.user_answer
    : []
  const correctOrder = Array.isArray(question.correct_answer)
    ? question.correct_answer
    : []

  const optionItems = options.map((option, index) => ({
    label: String.fromCharCode(65 + index),
    text: option,
  }))

  const getLabelByText = (text: string) => {
    const index = options.findIndex((option) => option === text)

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
              <div className="bg-primary-100 text-primary-default flex h-8 w-8 items-center justify-center rounded-[4px] text-center text-[18px] leading-[140%] font-normal tracking-[-0.03em]">
                {item.label}
              </div>
              <span className="text-ui-gray-primary text-[16px] leading-[140%] font-normal tracking-[-0.03em]">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2.5">
        {correctOrder.map((_, index) => {
          const userValue =
            typeof userOrder[index] === 'string' ? userOrder[index] : ''
          const userLabel = userValue ? getLabelByText(userValue) : ''
          const isCorrect = userOrder[index] === correctOrder[index]

          return (
            <div
              key={index}
              className={cn(
                'flex h-15 w-15 items-center justify-center rounded-[4px]',
                isCorrect
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-500'
              )}
            >
              <span className="text-2xl font-semibold">{userLabel}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OrderingResult
