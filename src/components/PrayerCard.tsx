import { cn } from '../utils/cn'

export interface PrayerRow {
  id: string
  name: string
  nameBn?: string
  adhan: string
  jamaat?: string
  note?: string
  muted?: boolean
}

export interface PrayerCardProps {
  row: PrayerRow
  isNext?: boolean
  isCurrent?: boolean
}

export function PrayerCard({ row, isNext, isCurrent }: PrayerCardProps) {
  return (
    <tr
      className={cn(
        'transition-colors',
        isNext ? 'bg-emerald-50/80 hover:bg-emerald-50' : 'hover:bg-emerald-50/60',
        isCurrent ? 'bg-amber-50/70 hover:bg-amber-50' : null,
        row.muted && 'opacity-60'
      )}
    >
      <td className="px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 font-bold text-slate-900">
          {row.nameBn ? (
            <>
              {row.nameBn} <span className="font-semibold text-slate-500">({row.name})</span>
            </>
          ) : (
            row.name
          )}
        </div>
          {isNext ? (
            <span className="shrink-0 rounded-full border border-emerald-200 bg-emerald-100 px-2 py-0.5 text-[11px] font-extrabold text-emerald-950">
              Next
            </span>
          ) : isCurrent ? (
            <span className="shrink-0 rounded-full border border-amber-200 bg-amber-100 px-2 py-0.5 text-[11px] font-extrabold text-amber-950">
              Now
            </span>
          ) : null}
        </div>
        {row.note ? <div className="mt-0.5 text-xs font-semibold text-slate-500">{row.note}</div> : null}
      </td>

      <td className="hidden px-4 py-3 font-semibold text-slate-900 sm:table-cell">{row.adhan}</td>
      <td className="hidden px-4 py-3 font-semibold text-slate-900 sm:table-cell">{row.jamaat ?? '—'}</td>

      <td className="px-4 py-3 sm:hidden">
        <div className="text-xs font-semibold text-slate-500">আযান</div>
        <div className="font-semibold text-slate-900">{row.adhan}</div>
        <div className="mt-2 text-xs font-semibold text-slate-500">জামাত</div>
        <div className="font-semibold text-slate-900">{row.jamaat ?? '—'}</div>
      </td>
    </tr>
  )
}
