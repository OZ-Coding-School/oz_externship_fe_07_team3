import RadioActive from '@/assets/icons/quiz/radio-active-purple.svg?react'
import RadioInactive from '@/assets/icons/quiz/radio-inactive-gray.svg?react'
import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'

type SingleChoiceResultProps = {
  question: ResultQuestion
}

function SingleChoiceResult({ question }: SingleChoiceResultProps) {
  const submittedAnswers = question.submitted_answer ?? []
  const correctAnswers = question.answer ?? []

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">객관식 결과 보기</legend>

      <ul className="space-y-4">
        {question.options.map((option) => {
          const isSelected = submittedAnswers.includes(option)
          const isCorrectAnswer = correctAnswers.includes(option)
          const isWrongSelected = isSelected && !isCorrectAnswer

          return (
            <li key={option}>
              <div className="flex items-center gap-3">
                {isSelected ? (
                  <RadioActive className="h-6 w-6 shrink-0" />
                ) : (
                  <RadioInactive className="h-6 w-6 shrink-0" />
                )}

                <span
                  className={cn(
                    'text-ui-gray-800',
                    isCorrectAnswer && 'text-other-green',
                    isWrongSelected && 'text-other-red'
                  )}
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

export default SingleChoiceResult
