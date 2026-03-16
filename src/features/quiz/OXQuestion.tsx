import { useState } from 'react'
import { cn } from '@/lib/utils'
import IconO from '@/assets/icons/quiz/icon-o-gray.svg?react'
import IconX from '@/assets/icons/quiz/icon-x-gray.svg?react'
import Check from '@/assets/icons/quiz/check-gray.svg?react'

type OXQuestionProps = {
  options: string[]
}

const OPTION_META = {
  O: {
    Icon: IconO,
    activeColor: 'text-other-green',
    label: '맞아요',
  },
  X: {
    Icon: IconX,
    activeColor: 'text-other-red',
    label: '아니에요',
  },
} as const

function OXQuestion({ options }: OXQuestionProps) {
  const [selectedOption, setSelectedOption] = useState<string>('')

  return (
    <fieldset className="mt-4">
      <legend className="sr-only">OX 선택</legend>

      <ul className="space-y-5">
        {options.map((option) => {
          const meta = OPTION_META[option as keyof typeof OPTION_META]

          if (!meta) return null

          const isSelected = selectedOption === option
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
                  onChange={() => setSelectedOption(option)}
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
