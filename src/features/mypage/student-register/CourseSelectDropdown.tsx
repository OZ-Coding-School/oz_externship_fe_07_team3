import { useState } from 'react'
import CheckIcon from '@/assets/icons/check.svg?react'
import {
  DropdownButton,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { CourseOption } from '@/types/api-response/course'

type CourseSelectDropdownProps = {
  options: CourseOption[]
  value: number | null
  placeholder: string
  disabled?: boolean
  onChange: (option: CourseOption) => void
}

/**
 * 수강생 등록 모달에서 사용하는 드롭다운 컴포넌트
 */
export default function CourseSelectDropdown({
  options,
  value,
  placeholder,
  disabled = false,
  onChange,
}: CourseSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((option) => option.id === value)

  const handleSelect = (option: CourseOption) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className={cn(disabled && 'pointer-events-none opacity-60')}>
      <DropdownMenu open={disabled ? false : isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <div>
            <DropdownButton
              isOpen={isOpen}
              value={selectedOption?.name}
              placeholder={placeholder}
              className="w-full"
            />
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="z-1100 w-87">
          <DropdownMenuGroup>
            {options.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => handleSelect(item)}
                className={cn(
                  'text-gray-primary cursor-pointer justify-between',
                  selectedOption?.id === item.id &&
                    'text-primary-default font-semibold'
                )}
              >
                <span>{item.name}</span>
                {selectedOption?.id === item.id && (
                  <CheckIcon className="text-primary-default h-4 w-4 shrink-0" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
