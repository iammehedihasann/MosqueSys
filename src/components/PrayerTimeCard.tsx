import { cn } from '../utils/cn'
import type { PrayerTime } from '../types'

interface PrayerTimeCardProps {
  prayer: PrayerTime
  isNext?: boolean
  className?: string
}

export function PrayerTimeCard({ prayer, isNext, className }: PrayerTimeCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-white p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]',
        prayer.isJumuah && 'border-2 border-[var(--color-accent)] bg-amber-50/50',
        isNext && 'ring-2 ring-[var(--color-primary)]',
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-[var(--color-text)]">
            {prayer.name}
            {prayer.nameBn && <span className="ml-1 text-[var(--color-text-muted)]">({prayer.nameBn})</span>}
          </p>
          {prayer.isJumuah && (
            <span className="mt-1 inline-block rounded bg-[var(--color-accent)]/20 px-2 py-0.5 text-xs font-medium text-amber-800">
              জুমুআ
            </span>
          )}
        </div>
        <div className="text-right text-sm">
          <p><span className="text-[var(--color-text-muted)]">আযান:</span> {prayer.azan}</p>
          <p><span className="text-[var(--color-text-muted)]">ইকামত:</span> {prayer.iqamah}</p>
        </div>
      </div>
    </div>
  )
}
