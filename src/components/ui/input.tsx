import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Check, Eye, EyeOff } from 'lucide-react'

const inputVariants = cva(
  [
    'flex h-[48px] w-full rounded-[4px] border bg-grey-1 px-[16px] py-[10px] transition-all',
    'font-["Pretendard"] text-[16px] leading-[140%] tracking-[-0.03em]',
    'placeholder:text-grey-9 focus:outline-none disabled:cursor-not-allowed',
    '[&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#121212]',
  ].join(' '),
  {
    variants: {
      status: {
        default: 'border-grey-9 focus:border-btn-fill-default',
        danger: 'border-other-red text-grey-6 focus:border-other-red',
        success: 'border-other-green text-grey-6 focus:border-other-green',
        disabled: 'border-grey-9 bg-grey-7 text-grey-9',
      },
    },
    defaultVariants: {
      status: 'default',
    },
  }
)

export type InputProps = Omit<React.ComponentProps<'input'>, 'size'> &
  VariantProps<typeof inputVariants>

const Input = ({ className, status, type, disabled, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false)

  const isPassword = type === 'password'
  const currentStatus = disabled ? 'disabled' : status

  const renderRightElement = () => {
    if (currentStatus === 'success') {
      return <Check size={20} className="text-other-green" />
    }

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

  const rightElement = renderRightElement()

  return (
    <div className="flex w-full flex-col">
      <div className="relative flex items-center">
        <input
          type={isPassword && showPassword ? 'text' : type}
          disabled={disabled}
          className={cn(
            inputVariants({ status: currentStatus }),
            rightElement && 'pr-[48px]',
            className
          )}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-[16px] flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input
