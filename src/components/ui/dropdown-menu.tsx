import React from 'react'
import { DropdownMenu as DropdownMenuPrimitive } from 'radix-ui'
import ChevronDownIcon from '@/assets/icons/chevron-down.svg?react'

import { cn } from '@/lib/utils'

//커스텀 드롭다운 버튼
type DropdownButtonProps = {
  placeholder?: string
  className?: string
  isOpen?: boolean
  value?: string
}

function DropdownButton({
  placeholder = '해당되는 항목을 선택해주세요',
  className,
  isOpen = false,
  value,
}: DropdownButtonProps) {
  return (
    <div
      className={cn(
        'mb-1 flex w-72 items-center justify-between rounded-md border px-4 py-3 text-sm',
        value
          ? 'border-[#707070] bg-white text-[#121212]'
          : 'border-[#D9D9D9] bg-white text-left text-[#BDBDBD]',
        'hover:border-[#BDBDBD] hover:bg-[#FAFAFA] hover:text-black',
        isOpen && 'border-[#707070] bg-[#FAFAFA] text-[#121212]',
        className
      )}
    >
      <span>{value || placeholder}</span>
      <ChevronDownIcon />
    </div>
  )
}

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          'text-popover-foreground data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 z-50 max-h-(--radix-dropdown-menu-content-available-height) w-72 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border border-[#707070] bg-white p-1 shadow-md',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item>) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      className={cn(
        'relative flex h-12 w-full cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none',
        'data-[highlighted]:bg-[#EFE6FC] data-[highlighted]:text-black',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownButton, // 커스텀
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
}
