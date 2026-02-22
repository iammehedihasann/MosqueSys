import { Calendar, Clock } from 'lucide-react'
import { cn } from '../utils/cn'
import type { Event } from '../types'

interface EventCardProps {
  event: Event
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]',
        className
      )}
    >
      <h3 className="font-semibold text-[var(--color-text)]">{event.name}</h3>
      {event.nameBn && <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">{event.nameBn}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {event.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {event.time}
        </span>
      </div>
      {event.location && <p className="mt-2 text-sm text-[var(--color-text-muted)]">{event.location}</p>}
    </div>
  )
}
