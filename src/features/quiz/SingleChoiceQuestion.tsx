import { useState } from 'react'
import RadioActive from '@/assets/icons/quiz/radio-active-purple.svg?react'
import RadioInactive from '@/assets/icons/quiz/radio-inactive-gray.svg?react'

type SingleChoiceQuestionProps = {
  options: string[]
}

function SingleChoiceQuestion({ options }: SingleChoiceQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string>('')

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">객관식 보기 선택</legend>

      <ul className="space-y-4">
        {options.map((option) => {
          const isSelected = selectedOption === option

          return (
            <li key={option}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="single-choice"
                  value={option}
                  checked={isSelected}
                  onChange={() => setSelectedOption(option)}
                  className="sr-only"
                />

                {isSelected ? (
                  <RadioActive className="h-6 w-6 shrink-0" />
                ) : (
                  <RadioInactive className="h-6 w-6 shrink-0" />
                )}

                <span className="text-ui-gray-800">{option}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </fieldset>
  )
}

export default SingleChoiceQuestion
