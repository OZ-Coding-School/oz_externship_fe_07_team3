import { useState } from 'react'
import CheckActive from '@/assets/icons/quiz/check-active.svg?react'
import CheckDefault from '@/assets/icons/quiz/check-default.svg?react'

type MultipleChoiceQuestionProps = {
  options: string[]
}

function MultipleChoiceQuestion({ options }: MultipleChoiceQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  const handleToggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    )
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
