import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { cn } from '../utils/cn'
import type { Notice, NoticeCategory } from '../types'

interface NoticeCardProps {
  notice: Notice
  className?: string
}

const categoryVariant: Record<NoticeCategory, 'ramadan' | 'general' | 'emergency'> = {
  ramadan: 'ramadan',
  general: 'general',
  emergency: 'emergency',
  all: 'general',
}

export function NoticeCard({ notice, className }: NoticeCardProps) {
  const variant = categoryVariant[notice.category] ?? 'general'
  return (
    <Link
      to={`/notices#${notice.id}`}
      className={cn(
        'block rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2',
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant={variant}>{notice.category}</Badge>
        <span className="text-sm text-[var(--color-text-muted)]">{notice.date}</span>
      </div>
      <h3 className="mt-3 font-semibold text-[var(--color-text)]">{notice.title}</h3>
      <p className="mt-2 text-sm text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">{notice.excerpt}</p>
      <span className="mt-3 inline-block text-sm font-medium text-[var(--color-primary)]">আরও পড়ুন →</span>
    </Link>
  )
}
