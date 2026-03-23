import CheckActive from '@/assets/icons/quiz/check-active.svg?react'
import CheckDefault from '@/assets/icons/quiz/check-default.svg?react'
import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'

type MultipleChoiceResultProps = {
  question: ResultQuestion
}

function MultipleChoiceResult({ question }: MultipleChoiceResultProps) {
  const selectedOptions = Array.isArray(question.user_answer)
    ? question.user_answer
    : []

  const correctOptions = Array.isArray(question.correct_answer)
    ? question.correct_answer
    : []

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">복수 선택 결과</legend>

      <ul className="space-y-4">
        {question.options?.map((option) => {
          const isSelected = selectedOptions.includes(option)
          const isCorrect = correctOptions.includes(option)
          const isWrongSelected = isSelected && !isCorrect

          return (
            <li key={option}>
              <div className="flex items-center gap-3">
                {isSelected ? (
                  <CheckActive className="h-6 w-6 shrink-0" />
                ) : (
                  <CheckDefault className="h-6 w-6 shrink-0" />
                )}

                <span
                  className={cn('text-base', {
                    'font-semibold text-green-600': isCorrect,
                    'font-semibold text-red-500': isWrongSelected,
                    'text-ui-gray-800': !isCorrect && !isWrongSelected,
                  })}
                >
                  {option}
                </span>
              </div>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default MultipleChoiceResult
