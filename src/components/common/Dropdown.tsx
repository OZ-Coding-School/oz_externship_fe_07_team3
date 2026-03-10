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

// 항목 변경시 입력
const OPTIONS = [
  'Select 01',
  'Select 02',
  'Select 03',
  'Select 04',
  '기타(직접입력)',
]

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [text, setText] = useState('')

  const handleSelect = (item: string) => {
    setSelectedItem(item)
    setIsOpen(false)
  }

  // 텍스트에리어 선택시 보이게
  const isOtherSelected = selectedItem === '기타(직접입력)'

  return (
    <div>
      <section>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger>
            <div>
              <DropdownButton
                isOpen={isOpen}
                value={selectedItem}
                placeholder="해당되는 항목을 선택해 주세요."
              />
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              {OPTIONS.map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={cn(
                    'text-gray-primary cursor-pointer',
                    selectedItem === item &&
                      'text-primary-default font-semibold'
                  )}
                >
                  {item}
                  {selectedItem === item && (
                    <CheckIcon className="text-primary-default h-4 w-4 shrink-0" />
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {isOtherSelected && (
          <div className="mt-1 w-72">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="탈퇴 사유를 입력해주세요."
              maxLength={100}
              className={cn(
                'text-gray-primary h-32 w-72 resize-none rounded-md border bg-gray-100 p-4 outline-none',
                'border-gray-250 placeholder:text-gray-disabled',
                'focus:border-gray-500'
              )}
            />
            <p className="mt-1 text-right text-sm text-gray-400">
              {text.length}/100
            </p>
          </div>
        )}
      </section>
    </div>
  )
}

export default Dropdown
