import Check from '@/assets/icons/quiz/check-gray.svg?react'
import { OPTION_META } from '@/constants/exam/quiz'
import { cn } from '@/lib/utils'
import type { AnswerValue } from '@/types/answer-type/answer'

type OXQuestionProps = {
  options: string[]
  value: AnswerValue
  onChange: (answer: AnswerValue) => void
}

function OXQuestion({ options, value, onChange }: OXQuestionProps) {
  return (
    <fieldset className="mt-4">
      <legend className="sr-only">OX 선택</legend>

      <ul className="space-y-5">
        {options.map((option) => {
          const meta = OPTION_META[option as keyof typeof OPTION_META]

          if (!meta) {
            return null
          }

          const isSelected = value === option
          const Icon = meta.Icon

          return (
            <li key={option}>
              <label
                className={cn(
                  'flex h-12 w-77 cursor-pointer items-center justify-between rounded-[4px] px-7 py-6',
                  isSelected ? 'bg-[#EEE8FA]' : 'bg-[#F2F3F5]'
                )}
              >
                <input
                  type="radio"
                  name="ox-question"
                  value={option}
                  checked={isSelected}
                  onChange={() => onChange(option)}
                  className="sr-only"
                />

                <div className="flex items-center gap-4">
                  <Icon
                    className={cn(
                      'h-5 w-5 shrink-0',
                      isSelected ? meta.activeColor : 'text-ui-gray-disabled'
                    )}
                  />
                  <span className="text-ui-gray-800 leading-[140%] font-normal">
                    {meta.label}
                  </span>
                </div>

                <Check
                  className={cn(
                    'h-4 w-4 shrink-0',
                    isSelected
                      ? 'text-primary-default'
                      : 'text-ui-gray-disabled'
                  )}
                />
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default OXQuestion
