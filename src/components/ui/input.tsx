import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check, Eye, EyeOff } from 'lucide-react'

const inputVariants = cva(
  [
    'flex w-full h-[48px] rounded-[4px] border bg-grey-1 px-[16px] py-[10px] transition-all',
    'font-["Pretendard"] text-[16px] leading-[140%] tracking-[-0.03em]',
    'placeholder:text-grey-9 focus:outline-none disabled:cursor-not-allowed',
  ].join(' '),
  {
    variants: {
      status: {
        default: 'border-grey-9 focus:border-btn-fill-default',
        danger: 'border-other-red text-grey-6 focus:border-other-red',
        success: 'border-other-green text-grey-6 focus:border-other-green',
        disabled: 'bg-grey-7 border-grey-9 text-grey-9',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
)

export interface InputProps
  extends
    Omit<React.ComponentProps<'input'>, 'size'>,
    VariantProps<typeof inputVariants> {
  helperText?: string
}

export default function Input({
  className,
  status,
  helperText,
  type,
  disabled,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false)
  const isPassword = type === 'password'
  const currentStatus = disabled ? 'disabled' : status

  const renderRightElement = () => {
    if (currentStatus === 'success')
      return <Check size={20} className="text-other-green" />
    if (isPassword) {
      return (
        <button
          type="button"
          disabled={disabled}
          onClick={() => setShowPassword(!showPassword)}
          className="text-grey-9 hover:text-grey-6 transition-colors"
        >
          {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      )
    }
    return null
  }

  return (
    <div className="flex w-[288px] flex-col gap-[10px]">
      <div className="relative flex items-center">
        <input
          type={isPassword && showPassword ? 'text' : type}
          disabled={disabled}
          className={cn(
            inputVariants({ status: currentStatus }),
            (isPassword || status === 'success') && 'pr-[48px]',
            className
          )}
          {...props}
        />
        <div className="absolute right-[16px] flex items-center justify-center">
          {renderRightElement()}
        </div>
      </div>
      {helperText && currentStatus !== 'disabled' && (
        <p
          className={cn(
            'text-[12px] leading-[140%] font-normal tracking-[-0.03em]',
            currentStatus === 'danger' && 'text-other-red',
            currentStatus === 'success' && 'text-other-green',
            currentStatus === 'default' && 'text-grey-9'
          )}
        >
          {currentStatus === 'danger' ? `* ${helperText}` : helperText}
        </p>
      )}
    </div>
  )
}
