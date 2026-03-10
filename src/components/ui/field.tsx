import * as React from 'react'
import { cn } from '@/lib/utils'

export function Field({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('group flex w-full flex-col gap-[10px]', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function FieldLabel({
  className,
  ...props
}: React.ComponentProps<'label'>) {
  return (
    <label
      className={cn(
        'text-grey-6 text-[14px] font-bold transition-colors',
        'group-data-[invalid=true]:text-other-red', // 에러 시 라벨도 빨간색으로!
        className
      )}
      {...props}
    />
  )
}
