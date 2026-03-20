import CheckActive from '@/assets/icons/quiz/check-active.svg?react'
import CheckDefault from '@/assets/icons/quiz/check-default.svg?react'
import type { AnswerValue } from '@/types/answer-type/answer'

type MultipleChoiceQuestionProps = {
  options: string[]
  value: AnswerValue
  onChange: (answer: AnswerValue) => void
}

function MultipleChoiceQuestion({
  options,
  value,
  onChange,
}: MultipleChoiceQuestionProps) {
  const selectedOptions = Array.isArray(value) ? value : []

  const handleToggleOption = (option: string) => {
    const nextSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((item) => item !== option)
      : [...selectedOptions, option]

    onChange(nextSelectedOptions)
  }

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">복수 선택 보기 선택</legend>

      <ul className="space-y-4">
        {options.map((option) => {
          const isSelected = selectedOptions.includes(option)

          return (
            <li key={option}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  value={option}
                  checked={isSelected}
                  onChange={() => handleToggleOption(option)}
                  className="sr-only"
                />

                {isSelected ? (
                  <CheckActive className="h-6 w-6 shrink-0" />
                ) : (
                  <CheckDefault className="h-6 w-6 shrink-0" />
                )}

                <span className="text-ui-gray-800 text-base">{option}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default MultipleChoiceQuestion
