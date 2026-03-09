import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center whitespace-nowrap',
    'font-medium transition-colors',
    'outline-none',
    'disabled:pointer-events-none',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        fill: [
          'bg-btn-fill-default text-grey-1',
          'hover:bg-btn-fill-hover',
          'active:bg-btn-fill-active',
          'disabled:bg-grey-2 disabled:text-grey-4',
        ].join(' '),

        ghost: [
          'bg-[var(--grey-3)] text-grey-6',
          'hover:bg-grey-4',
          'active:bg-grey-5 active:text-grey-1',
          'disabled:bg-grey-2 disabled:text-grey-4',
        ].join(' '),

        outline: [
          'border border-btn-fill-default bg-btn-outline-enabled-bg text-btn-fill-default',
          'hover:bg-main-4',
          'active:bg-btn-outline-enabled-bg',
          'disabled:border-grey-10 disabled:bg-grey-7 disabled:text-grey-8',
        ].join(' '),

        sidebarTab: [
          'relative justify-start font-semibold',
          'bg-grey-1 text-grey-4',
          'hover:bg-btn-outline-enabled-bg hover:text-btn-fill-default',
          'disabled:bg-grey-7 disabled:text-grey-9',
        ].join(' '),
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
        className: [
          'text-main-6',
          'before:absolute',
          'before:left-0',
          'before:top-1/2',
          'before:h-6',
          'before:w-[3px]',
          'before:-translate-y-1/2',
          'before:rounded-full',
          'before:bg-main-6',
        ].join(' '),
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
