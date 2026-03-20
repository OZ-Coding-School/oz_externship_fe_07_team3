import RadioActive from '@/assets/icons/quiz/radio-active-purple.svg?react'
import RadioInactive from '@/assets/icons/quiz/radio-inactive-gray.svg?react'
import type { AnswerValue } from '@/types/answer-type/answer'

type SingleChoiceQuestionProps = {
  options: string[]
  value: AnswerValue
  onChange: (answer: AnswerValue) => void
}

function SingleChoiceQuestion({
  options,
  value,
  onChange,
}: SingleChoiceQuestionProps) {
  return (
    <fieldset className="mt-4">
      <legend className="sr-only">객관식 보기 선택</legend>

      <ul className="space-y-4">
        {options.map((option) => {
          const isSelected = value === option

          return (
            <li key={option}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="single-choice"
                  value={option}
                  checked={isSelected}
                  onChange={() => onChange(option)}
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
