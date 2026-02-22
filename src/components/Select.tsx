import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: SelectOption[]
  error?: string
  className?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, className, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="mb-1 block text-sm font-medium text-[var(--color-text)]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            'w-full min-h-[48px] rounded-[var(--radius-button)] border border-gray-300 px-4 py-2 text-base bg-white',
            'focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20 focus:outline-none',
            error && 'border-red-500',
            className
          )}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    )
  }
)
Select.displayName = 'Select'
