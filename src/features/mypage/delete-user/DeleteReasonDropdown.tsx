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
import { DELETE_REASON_OPTIONS } from '@/constants/deleteUserReasonOptions'
import { cn } from '@/lib/utils'
import type { DeleteUserReason } from '@/types'

type DeleteReasonDropdownProps = {
  value: DeleteUserReason | null
  onChange: (reason: DeleteUserReason) => void
}

/**
 * 회원 탈퇴 드롭다운
 */
export default function DeleteReasonDropdown({
  value,
  onChange,
}: DeleteReasonDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = DELETE_REASON_OPTIONS.find(
    (option) => option.value === value
  )

  const handleSelect = (reason: DeleteUserReason) => {
    onChange(reason)
    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div>
          <DropdownButton
            isOpen={isOpen}
            value={selectedOption?.label}
            placeholder="해당되는 항목을 선택해 주세요."
            className="mb-0 h-12 w-72 cursor-pointer rounded-lg px-4 py-2.5"
          />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="z-1100 w-72 rounded-lg py-1.25 text-sm"
      >
        <DropdownMenuGroup>
          {DELETE_REASON_OPTIONS.map((option) => {
            const isSelected = value === option.value

            return (
              <DropdownMenuItem
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  'text-ui-gray-primary flex h-12 w-full cursor-pointer items-center justify-between px-4 text-sm',
                  isSelected && 'text-primary-default font-semibold'
                )}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <CheckIcon className="text-primary-default h-4 w-4 shrink-0" />
                )}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
