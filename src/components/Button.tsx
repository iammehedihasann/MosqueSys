import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
  to?: string
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] focus-visible:ring-[var(--color-primary)]',
  secondary: 'bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-text-muted)] hover:bg-gray-200',
  outline: 'border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
  ghost: 'text-[var(--color-text)] hover:bg-gray-200',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-sm min-h-[44px]',
  md: 'py-3 px-6 text-base min-h-[48px]',
  lg: 'py-4 px-8 text-lg min-h-[52px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', asChild, to, children, className, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-[var(--radius-button)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50'
    const combined = cn(base, variantStyles[variant], sizeStyles[size], className)

    if (asChild && to) {
      return (
        <Link to={to} className={combined}>
          {children}
        </Link>
      )
    }

    return (
      <button ref={ref} className={combined} {...props}>
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'
