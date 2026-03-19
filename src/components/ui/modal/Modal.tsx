import { useModalScroll } from '@/hooks/useModalScroll'
import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  width?: string
  shadow?: boolean
  dimmed?: boolean
  closeButtonWrapperClassName?: string
}

export default function Modal({
  isOpen,
  onClose,
  children,
  width,
  shadow = true,
  dimmed = true,
  closeButtonWrapperClassName,
}: ModalProps) {
  useModalScroll(isOpen)

  if (!isOpen) {
    return null
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed inset-0 z-[1000] grid place-items-center p-4',
        dimmed ? 'bg-ui-gray-primary/60' : 'bg-transparent'
      )}
    >
      <div
        className={cn(
          'relative max-h-[calc(100dvh-32px)] w-full overflow-y-auto rounded-[12px] bg-white',
          shadow && 'shadow-[0_4px_16px_rgba(160,160,160,0.25)]',
          width ?? 'max-w-[396px]'
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={cn(
            'flex justify-end px-[24px] pt-[20px]',
            closeButtonWrapperClassName
          )}
        >
          <button
            type="button"
            onClick={onClose}
            className="text-ui-gray-400 hover:text-ui-gray-600 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body
  )
}
