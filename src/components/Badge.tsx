import { cn } from '../utils/cn'

type BadgeVariant = 'default' | 'ramadan' | 'general' | 'emergency' | 'success'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-primary)] text-white',
  ramadan: 'bg-amber-100 text-amber-800',
  general: 'bg-gray-200 text-gray-800',
  emergency: 'bg-red-100 text-red-800',
  success: 'bg-green-100 text-green-800',
}

export function Badge({ variant = 'default', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
