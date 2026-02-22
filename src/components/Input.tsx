import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full min-h-[48px] rounded-[var(--radius-button)] border border-gray-300 px-4 py-2 text-base',
            'focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none',
            error && 'border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
