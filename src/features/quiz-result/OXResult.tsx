import Check from '@/assets/icons/quiz/check-gray.svg?react'
import { OPTION_META } from '@/constants/exam/quiz'
import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'

type OXResultProps = {
  question: ResultQuestion
}

function OXResult({ question }: OXResultProps) {
  const selectedValue =
    typeof question.user_answer === 'string' ? question.user_answer : null

  const correctValue =
    typeof question.correct_answer === 'string' ? question.correct_answer : null

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">OX 결과</legend>

      <ul className="space-y-5">
        {question.options?.map((option) => {
          const meta = OPTION_META[option as keyof typeof OPTION_META]

          if (!meta) {
            return null
          }

          const isSelected = selectedValue === option
          const isCorrect = correctValue === option
          const isWrongSelected = isSelected && !isCorrect
          const Icon = meta.Icon

          return (
            <li key={option}>
              <div
                className={cn(
                  'flex h-12 w-77 items-center justify-between rounded-[4px] px-7 py-6',
                  {
                    'bg-green-50': isCorrect,
                    'bg-red-50': isWrongSelected,
                    'bg-[#EEE8FA]': isSelected && isCorrect,
                    'bg-[#F2F3F5]': !isCorrect && !isWrongSelected,
                  }
                )}
              >
                <div className="flex items-center gap-4">
                  <Icon
                    className={cn('h-5 w-5 shrink-0', {
                      'text-green-600': isCorrect,
                      'text-red-500': isWrongSelected,
                      'text-ui-gray-disabled': !isCorrect && !isWrongSelected,
                    })}
                  />
                  <span
                    className={cn('leading-[140%]', {
                      'font-semibold text-green-600': isCorrect,
                      'font-semibold text-red-500': isWrongSelected,
                      'text-ui-gray-800 font-normal':
                        !isCorrect && !isWrongSelected,
                    })}
                  >
                    {meta.label}
                  </span>
                </div>

                <Check
                  className={cn('h-4 w-4 shrink-0', {
                    'text-green-600': isCorrect,
                    'text-red-500': isWrongSelected,
                    'text-ui-gray-disabled': !isSelected,
                    'text-ui-gray-800': isSelected && !isCorrect,
                  })}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default OXResult
