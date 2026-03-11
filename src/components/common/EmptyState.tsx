import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type EmptyStateProps = {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-5 text-center',
        className
      )}
    >
      {icon && <div>{icon}</div>}

      <div className="flex flex-col gap-1 text-base font-medium text-gray-400">
        <p>{title}</p>
        {description && <p>{description}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  )
}
