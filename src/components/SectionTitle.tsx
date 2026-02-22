import { cn } from '../utils/cn'

interface SectionTitleProps {
  title: string
  subtitle?: string
  className?: string
}

export function SectionTitle({ title, subtitle, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-6', className)}>
      <h2 className="text-xl font-semibold tracking-tight text-[var(--color-text)] md:text-[22px]" style={{ fontFamily: 'var(--font-display)' }}>
        {title}
      </h2>
      {subtitle && <p className="mt-1.5 text-sm text-[var(--color-text-muted)] leading-relaxed md:text-base">{subtitle}</p>}
    </div>
  )
}
