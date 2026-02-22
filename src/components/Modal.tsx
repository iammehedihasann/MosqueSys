import { useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../utils/cn'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (isOpen) window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-lg max-h-[90vh] overflow-auto rounded-[var(--radius-card)] bg-white shadow-xl',
          className
        )}
      >
        {title && (
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h2 id="modal-title" className="text-lg font-semibold text-[var(--color-text)]">
              {title}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] p-0"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
