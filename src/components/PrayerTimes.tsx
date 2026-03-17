import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapPin, RefreshCcw } from 'lucide-react'
import prayerTimesSchedule from '../data/prayerTimes.json'
import { getTimingsByCity } from '../services/prayerApi'
import { sanitizeAladhanTime } from '../utils/aladhan'
import { cn } from '../utils/cn'
import { dateWithHHMM, formatCountdownHMS, formatTimeLabel, getNextPrayer } from '../utils/prayerUtils'
import { NextPrayer } from './NextPrayer'
import { PrayerCard, type PrayerRow } from './PrayerCard'

type DailyKey = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha'

const DAILY_PRAYERS: Array<{ id: PrayerRow['id']; key: DailyKey; name: string; nameBn: string }> = [
  { id: 'fajr', key: 'Fajr', name: 'Fajr', nameBn: 'ফজর' },
  { id: 'dhuhr', key: 'Dhuhr', name: 'Dhuhr', nameBn: 'যোহর' },
  { id: 'asr', key: 'Asr', name: 'Asr', nameBn: 'আসর' },
  { id: 'maghrib', key: 'Maghrib', name: 'Maghrib', nameBn: 'মাগরিব' },
  { id: 'isha', key: 'Isha', name: 'Isha', nameBn: 'ইশা' },
]

type ExtraKey = 'Imsak' | 'Sunrise' | 'Sunset' | 'Midnight' | 'Lastthird'
const EXTRAS: Array<{ id: string; key: ExtraKey; name: string; nameBn: string }> = [
  { id: 'imsak', key: 'Imsak', name: 'Imsak', nameBn: 'ইমসাক' },
  { id: 'sunrise', key: 'Sunrise', name: 'Sunrise', nameBn: 'সূর্যোদয়' },
  { id: 'sunset', key: 'Sunset', name: 'Sunset', nameBn: 'সূর্যাস্ত' },
  { id: 'midnight', key: 'Midnight', name: 'Midnight', nameBn: 'মধ্যরাত' },
  { id: 'tahajjud', key: 'Lastthird', name: 'Tahajjud (Last third)', nameBn: 'তাহাজ্জুদ (শেষ তৃতীয়াংশ)' },
]

export interface PrayerTimesProps {
  city?: string
  country?: string
  method?: number
  className?: string
  showHeader?: boolean
}

export function PrayerTimes({
  city = 'Dhaka',
  country = 'Bangladesh',
  method = 1,
  className,
  showHeader = true,
}: PrayerTimesProps) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [now, setNow] = useState(() => new Date())

  const controllerRef = useRef<AbortController | null>(null)
  const [state, setState] = useState<{
    prayers: Array<PrayerRow & { dateTime: Date }>
    extraRows: PrayerRow[]
    jumuah?: PrayerRow
    readableDate?: string
    hijriDate?: string
    timezone?: string
    methodName?: string
    fetchedAt: Date
    dayKey: string
  } | null>(null)

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(interval)
  }, [])

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    try {
      const res = await getTimingsByCity(
        { city, country, method },
        { signal: controller.signal, cacheTtlMs: 3 * 60 * 1000 }
      )

      const base = new Date()
      const timings = res.timings

      const scheduleById = new Map<string, { azan?: string; iqamah?: string }>()
      for (const t of prayerTimesSchedule.times as Array<{ id: string; azan?: string; iqamah?: string }>) {
        if (!t?.id) continue
        scheduleById.set(t.id, { azan: t.azan, iqamah: t.iqamah })
      }

      const timingToLabel = (key: string) => {
        const value = timings[key]
        if (!value) return null
        const hhmm = sanitizeAladhanTime(value)
        const dt = dateWithHHMM(hhmm, base)
        if (!dt) return null
        return { hhmm, dt, label: formatTimeLabel(dt) }
      }

      const prayers: Array<PrayerRow & { dateTime: Date }> = DAILY_PRAYERS.map((p) => {
        const t = timingToLabel(p.key)
        return {
          id: p.id,
          name: p.name,
          nameBn: p.nameBn,
          adhan: t?.label ?? '—',
          jamaat: scheduleById.get(p.id)?.iqamah,
          dateTime: t?.dt ?? new Date(base),
        }
      })

      const extraRows: PrayerRow[] = EXTRAS.map((x) => {
        const t = timingToLabel(x.key)
        return {
          id: x.id,
          name: x.name,
          nameBn: x.nameBn,
          adhan: t?.label ?? '—',
        }
      }).filter((r) => r.adhan !== '—')

      const isFriday = base.getDay() === 5
      const jumuahSchedule = scheduleById.get('jumuah')
      const jumuah: PrayerRow | undefined = jumuahSchedule
        ? {
            id: 'jumuah',
            name: "Jumu'ah",
            nameBn: 'জুমুআ',
            adhan: jumuahSchedule.azan ?? '—',
            jamaat: jumuahSchedule.iqamah,
            note: 'শুধু শুক্রবার',
            muted: !isFriday,
          }
        : undefined

      const yyyy = base.getFullYear()
      const mm = String(base.getMonth() + 1).padStart(2, '0')
      const dd = String(base.getDate()).padStart(2, '0')

      setState({
        prayers,
        extraRows,
        jumuah,
        readableDate: res.date?.readable,
        hijriDate: res.date?.hijri?.date,
        timezone: res.meta?.timezone,
        methodName: res.meta?.method?.name,
        fetchedAt: new Date(),
        dayKey: `${yyyy}-${mm}-${dd}`,
      })
    } catch (e) {
      if ((e as { name?: string }).name === 'AbortError') return
      setError(e instanceof Error ? e.message : 'Failed to load prayer times')
      setState(null)
    } finally {
      setLoading(false)
    }
  }, [city, country, method])

  useEffect(() => {
    void load()
    return () => controllerRef.current?.abort()
  }, [load])

  useEffect(() => {
    if (!state || loading) return
    const yyyy = now.getFullYear()
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const dd = String(now.getDate()).padStart(2, '0')
    const key = `${yyyy}-${mm}-${dd}`
    if (key !== state.dayKey) void load()
  }, [loading, now, state, load])

  const next = useMemo(() => {
    if (!state?.prayers?.length) return null
    return getNextPrayer(state.prayers, now)
  }, [state?.prayers, now])

  const currentPrayer = useMemo(() => {
    if (!state?.prayers?.length) return null
    // "Current" means the last prayer that already started today.
    const sorted = [...state.prayers].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
    const lastStarted = [...sorted].reverse().find((p) => p.dateTime.getTime() <= now.getTime())
    return lastStarted ?? null
  }, [state?.prayers, now])

  const nextInfo = useMemo(() => {
    if (!next) return null
    return {
      label: 'NEXT PRAYER',
      name: next.prayer.name,
      nameBn: next.prayer.nameBn,
      timeLabel: formatTimeLabel(next.at),
      subLabel: `in ${formatCountdownHMS(next.at.getTime() - now.getTime())}`,
    }
  }, [next, now])

  const currentInfo = useMemo(() => {
    if (!state?.prayers?.length) return null
    if (!currentPrayer) {
      return {
        label: 'CURRENT STATUS',
        name: 'Before Fajr',
        nameBn: 'ফজরের আগে',
        timeLabel: '—',
        subLabel: 'Waiting',
      }
    }
    return {
      label: 'CURRENT PRAYER',
      name: currentPrayer.name,
      nameBn: currentPrayer.nameBn,
      timeLabel: formatTimeLabel(currentPrayer.dateTime),
      subLabel: 'Active now',
    }
  }, [currentPrayer, state?.prayers?.length])

  return (
    <section className={cn('rounded-[2.5rem] border border-emerald-200/60 bg-white p-6 sm:p-8', className)} aria-label="Prayer times">
      {showHeader ? (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Prayer Times</h2>
            <p className="mt-1 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-4 w-4 text-emerald-800" />
                {city}, {country}
              </span>
              {state?.readableDate ? <span className="mx-2 text-slate-300">|</span> : null}
              {state?.readableDate ? <span>{state.readableDate}</span> : null}
              {state?.hijriDate ? <span className="ml-2 text-slate-500">({state.hijriDate} Hijri)</span> : null}
            </p>
          </div>

          <button
            type="button"
            onClick={() => void load()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/60 px-4 py-2 text-sm font-bold text-emerald-950 transition-colors hover:bg-emerald-100/70 active:scale-[0.99]"
          >
            <RefreshCcw className={cn('h-4 w-4', loading && 'animate-spin')} />
            Refresh
          </button>
        </div>
      ) : null}

      <div className={cn('mt-6', !showHeader && 'mt-0')}>
        <NextPrayer current={currentInfo} next={nextInfo} />

        <div className="mt-4 overflow-hidden rounded-3xl border border-emerald-200/60 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-amber-100">
              <tr>
                <th scope="col" className="px-4 py-3 font-extrabold tracking-wide">
                  নাম / Name
                </th>
                <th scope="col" className="hidden px-4 py-3 font-extrabold tracking-wide sm:table-cell">
                  আযান
                </th>
                <th scope="col" className="hidden px-4 py-3 font-extrabold tracking-wide sm:table-cell">
                  জামাত
                </th>
                <th scope="col" className="px-4 py-3 font-extrabold tracking-wide sm:hidden">
                  সময়
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-emerald-100">
              <tr className="bg-emerald-50/50">
                <td colSpan={4} className="px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-emerald-950/70">
                  Prayers
                </td>
              </tr>

              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3">
                      <div className="h-4 w-44 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                    </td>
                    <td className="px-4 py-3 sm:hidden">
                      <div className="h-10 w-28 animate-pulse rounded bg-slate-200" />
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-sm font-semibold text-rose-900">
                    {error}
                  </td>
                </tr>
              ) : (
                <>
                  {state?.prayers.map((row) => (
                    <PrayerCard
                      key={row.id}
                      row={row}
                      isCurrent={currentPrayer?.id === row.id}
                      isNext={next?.prayer.id === row.id}
                    />
                  ))}
                  {state?.jumuah ? <PrayerCard row={state.jumuah} /> : null}

                  {state?.extraRows?.length ? (
                    <tr className="bg-emerald-50/50">
                      <td colSpan={4} className="px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-emerald-950/70">
                        Other Times
                      </td>
                    </tr>
                  ) : null}

                  {state?.extraRows?.map((row) => (
                    <PrayerCard key={row.id} row={row} />
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          Source: Aladhan API{state?.timezone ? ` (${state.timezone})` : ''}
          {state?.methodName ? ` • ${state.methodName}` : ''}
          {' • Jamaat: Mosque schedule'}
          {state?.fetchedAt ? ` • Updated ${state.fetchedAt.toLocaleTimeString('en-BD', { timeStyle: 'short' })}` : ''}
        </p>
      </div>
    </section>
  )
}
