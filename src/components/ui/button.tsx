import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  cn(
    'inline-flex items-center justify-center',
    'font-medium',
    'cursor-pointer'
  ),
  {
    variants: {
      variant: {
        fill: cn(
          'bg-btn-fill-default text-grey-1',
          'hover:bg-btn-fill-hover',
          'active:bg-btn-fill-active',
          'disabled:bg-grey-2 disabled:text-grey-4'
        ),

        ghost: cn(
          'bg-grey-3 text-grey-6',
          'hover:bg-grey-4',
          'active:bg-grey-5 active:text-grey-1',
          'disabled:bg-grey-2 disabled:text-grey-4'
        ),

        outline: cn(
          'border border-btn-fill-default bg-btn-outline-enabled-bg text-btn-fill-default',
          'hover:bg-main-4',
          'active:bg-btn-outline-enabled-bg',
          'disabled:border-grey-10 disabled:bg-grey-7 disabled:text-grey-8'
        ),

        sidebarTab: cn(
          'relative justify-start font-semibold',
          'bg-grey-1 text-grey-4',
          'hover:bg-btn-outline-enabled-bg hover:text-btn-fill-default',
          'disabled:bg-grey-7 disabled:text-grey-9'
        ),

        notFound: cn('bg-grey-2 text-grey-5', 'hover:bg-grey-3'),
      },

      size: {
        sm: 'h-12 w-[112px] rounded-lg px-5 py-6 text-[16px]',
        md: 'h-12 w-[155px] rounded-lg px-5 py-6 text-[16px]',
        sidebarTab: 'h-8 w-[152px] rounded-lg p-5 text-[18px]',
        full: 'h-14 w-full rounded-lg p-8 text-[16px]',
      },

      active: {
        true: '',
        false: '',
      },
    },

    compoundVariants: [
      {
        variant: 'sidebarTab',
        active: true,
        className: cn(
          'text-main-6',
          'before:absolute',
          'before:left-0',
          'before:top-1/2',
          'before:h-6',
          'before:w-[3px]',
          'before:-translate-y-1/2',
          'before:rounded-full',
          'before:bg-main-6'
        ),
      },
    ],

    defaultVariants: {
      variant: 'fill',
      size: 'md',
      active: false,
    },
  }
)

export default function Button({
  className,
  variant,
  size,
  active,
  asChild = false,
  disabled,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-active={active}
      disabled={disabled}
      className={cn(buttonVariants({ variant, size, active }), className)}
      {...props}
    />
  )
}
