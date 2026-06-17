import { Clock } from 'lucide-react'
import { cn } from '../utils/cn'

export interface PrayerStatusInfo {
  label: string
  name: string
  nameBn?: string
  timeLabel: string
  subLabel?: string
  subLines?: string[]
}

export interface NextPrayerProps {
  current: PrayerStatusInfo | null
  next: PrayerStatusInfo | null
  className?: string
}
export function NextPrayer({ current, next, className }: NextPrayerProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 xl:grid-cols-[0.9fr_1.1fr]",
        className
      )}
      aria-label="Prayer status"
    >
      {/* Current Prayer */}
      <div className="group relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-5">
        <div className="absolute top-0 left-0 h-1 w-full bg-amber-400" />

        <div className="flex h-full flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-700">
              {current?.label ?? "CURRENT"}
            </p>

            <h3 className="mt-3 text-2xl font-black text-slate-900">
              {current?.nameBn ?? "লোড হচ্ছে"}
            </h3>

            {current?.name && (
              <p className="mt-1 text-sm font-medium text-slate-500">
                {current.name}
              </p>
            )}
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-amber-200 bg-white p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100">
              <Clock className="h-5 w-5 text-amber-700" />
            </div>

            <div>
              <div className="text-xl font-black text-slate-900">
                {current?.timeLabel ?? "—"}
              </div>

              {current?.subLines?.length ? (
                <div className="mt-1 text-xs text-slate-500">
                  {current.subLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              ) : (
                <div className="mt-1 text-xs text-slate-500">
                  {current?.subLabel}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Next Prayer */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 p-[1px]">
        <div className="h-full rounded-[22px] bg-gradient-to-br from-emerald-900 to-emerald-800 p-6 text-white">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.25em] text-amber-200">
                {next?.label ?? "NEXT"}
              </div>

              <h2 className="mt-4 text-3xl font-black">
                {next?.nameBn ?? "লোড হচ্ছে"}
              </h2>

              {next?.name && (
                <p className="mt-2 text-white/70">
                  {next.name}
                </p>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                  <Clock className="h-5 w-5 text-amber-200" />
                </div>

                <div>
                  <div className="text-sm text-white/70">
                    সময়
                  </div>

                  <div className="text-2xl font-black">
                    {next?.timeLabel ?? "—"}
                  </div>
                </div>
              </div>

              {next?.subLines?.length ? (
                <div className="text-right text-xs text-white/80">
                  {next.subLines.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
              ) : (
                <div className="text-right text-xs text-white/80">
                  {next?.subLabel}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}