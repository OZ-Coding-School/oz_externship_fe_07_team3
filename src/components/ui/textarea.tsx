import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textareaVariants = cva(cn('resize-none rounded-lg outline-none'), {
  variants: {
    variant: {
      default:
        'border border-grey-3 bg-gray-100 text-grey-9 p-4 placeholder:text-grey-4',
      feedback:
        'border border-grey-3 bg-gray-100 text-grey-6 p-4 placeholder:text-grey-4',
      answer: 'bg-gray-100 text-danger-default p-4',
    },

    size: {
      sm: 'min-h-[134px] w-150 text-base',
      md: 'min-h-[160px] w-162 text-base',
    },
  },

  defaultVariants: {
    variant: 'feedback',
    size: 'md',
  },
})

type TextareaProps = React.ComponentProps<'textarea'> &
  VariantProps<typeof textareaVariants>

export default function Textarea({
  className,
  variant,
  size,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant}
      data-size={size}
      className={cn(textareaVariants({ variant, size }), className)}
      {...props}
    />
  )
}
