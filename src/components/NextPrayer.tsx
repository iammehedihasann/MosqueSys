import { Clock } from 'lucide-react'
import { cn } from '../utils/cn'

export interface PrayerStatusInfo {
  label: string
  name: string
  nameBn?: string
  timeLabel: string
  subLabel?: string
}

export interface NextPrayerProps {
  current: PrayerStatusInfo | null
  next: PrayerStatusInfo | null
  className?: string
}

export function NextPrayer({ current, next, className }: NextPrayerProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-3 md:grid-cols-2', className)} aria-label="Prayer status">
      <div className="rounded-3xl border border-amber-200 bg-amber-50/70 p-4 text-amber-950 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-extrabold tracking-wide text-amber-900/80">{current?.label ?? 'CURRENT'}</p>
            {current ? (
              <p className="mt-1 truncate text-lg font-black">
                {current.nameBn ? (
                  <>
                    {current.nameBn}{' '}
                    <span className="font-semibold text-amber-900/60">({current.name})</span>
                  </>
                ) : (
                  current.name
                )}
              </p>
            ) : (
              <p className="mt-1 text-lg font-black">Loading…</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-amber-200 bg-white px-3 py-2">
            <Clock className="h-4 w-4 text-amber-800" />
            <div className="text-right leading-tight">
              <div className="text-sm font-extrabold">{current?.timeLabel ?? '—'}</div>
              <div className="text-[11px] font-semibold text-amber-900/70">{current?.subLabel ?? ''}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 p-4 text-white sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-extrabold tracking-wide text-amber-200/90">{next?.label ?? 'NEXT'}</p>
            {next ? (
              <p className="mt-1 truncate text-lg font-black">
                {next.nameBn ? (
                  <>
                    {next.nameBn}{' '}
                    <span className="font-semibold text-white/70">({next.name})</span>
                  </>
                ) : (
                  next.name
                )}
              </p>
            ) : (
              <p className="mt-1 text-lg font-black">Loading…</p>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2">
            <Clock className="h-4 w-4 text-amber-200" />
            <div className="text-right leading-tight">
              <div className="text-sm font-extrabold">{next?.timeLabel ?? '—'}</div>
              <div className="text-[11px] font-mono font-semibold text-white/80">{next?.subLabel ?? ''}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

