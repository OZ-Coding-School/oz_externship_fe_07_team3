import * as React from 'react'
import { cn } from '@/lib/utils'

export function Field({
  children,
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn('group flex w-full flex-col gap-2.5', className)}
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
        'group-data-[invalid=true]:text-other-red',
        className
      )}
      {...props}
    />
  )
}

type FieldHelperTextProps = {
  status?: 'default' | 'danger' | 'success' | 'disabled'
  children: React.ReactNode
  className?: string
}

export function FieldHelperText({
  status,
  children,
  className,
}: FieldHelperTextProps) {
  return (
    <p
      className={cn(
        'text-[12px] leading-[140%] tracking-[-0.03em]',
        status === 'danger' && 'text-other-red',
        status === 'success' && 'text-other-green',
        (status === 'default' || status === 'disabled') && 'text-grey-9',
        className
      )}
    >
      {status === 'danger' ? `* ${children}` : children}
    </p>
  )
}
