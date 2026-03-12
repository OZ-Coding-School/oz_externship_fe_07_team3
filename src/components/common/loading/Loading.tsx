import { DELAYS } from '@/constants/loadingAnimationDelay'
import { cn } from '@/lib/utils'

/**
 * Loading 컴포넌트
 */
export default function Loading() {
  return (
    <div className="flex gap-2">
      {DELAYS.map((delay, index) => (
        <span
          key={`${delay}-${index}`}
          className={cn(
            'bg-primary-default h-2 w-2 animate-[jump_0.7s_ease-in-out_infinite] rounded-full',
            delay
          )}
        />
      ))}
    </div>
  )
}
