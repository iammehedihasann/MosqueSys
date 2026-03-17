export function dateWithHHMM(hhmm: string, base: Date): Date | null {
  const match = hhmm.match(/^(\d{1,2}):(\d{2})$/)
  if (!match) return null
  const h = Number(match[1])
  const m = Number(match[2])
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null

  const d = new Date(base)
  d.setHours(h, m, 0, 0)
  return d
}

export function formatTimeLabel(date: Date, locale: string = 'en-BD'): string {
  return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }).format(date)
}

export function formatCountdownHMS(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function getNextPrayer<T extends { id: string; name: string; dateTime: Date }>(
  prayers: T[],
  now: Date = new Date()
): { prayer: T; at: Date } | null {
  if (!prayers.length) return null

  const sorted = [...prayers].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
  const upcomingToday = sorted.find((p) => p.dateTime.getTime() > now.getTime())
  if (upcomingToday) return { prayer: upcomingToday, at: upcomingToday.dateTime }

  const fajr = sorted.find((p) => p.id === 'fajr')
  if (!fajr) return null
  const tomorrow = new Date(fajr.dateTime)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return { prayer: fajr, at: tomorrow }
}

