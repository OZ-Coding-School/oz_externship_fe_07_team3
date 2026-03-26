import { OPTION_META } from '@/constants/exam/quiz'
import { cn } from '@/lib/utils'
import type { ResultQuestion } from '@/types/result-type/answer'

type OXResultProps = {
  question: ResultQuestion
}

function OXResult({ question }: OXResultProps) {
  const correctValue =
    Array.isArray(question.answer) && typeof question.answer[0] === 'string'
      ? question.answer[0]
      : null

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">OX 결과</legend>

      <ul className="space-y-5">
        {question.options?.map((option) => {
          const meta = OPTION_META[option as keyof typeof OPTION_META]

          if (!meta) {
            return null
          }

          const isCorrectOption = correctValue === option
          const isO = option === 'O'
          const Icon = meta.Icon

          return (
            <li key={option}>
              <div
                className={cn(
                  'flex h-12 w-77 items-center rounded-[4px] px-7 py-6',
                  isCorrectOption
                    ? isO
                      ? 'bg-green-50'
                      : 'bg-red-50'
                    : 'bg-[#F2F3F5]'
                )}
              >
                <div className="flex items-center gap-4">
                  <Icon
                    className={cn(
                      'h-5 w-5 shrink-0',
                      isCorrectOption
                        ? meta.activeColor
                        : 'text-ui-gray-disabled'
                    )}
                  />
                  <span
                    className={cn(
                      'leading-[140%]',
                      isCorrectOption
                        ? `font-semibold ${meta.activeColor}`
                        : 'text-ui-gray-800 font-normal'
                    )}
                  >
                    {meta.label}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default OXResult
