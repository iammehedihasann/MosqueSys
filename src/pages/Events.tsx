import { Link } from 'react-router-dom'
import { ArrowRight, CalendarClock } from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import { EventCard } from '../components/EventCard'
import eventsData from '../data/events.json'
import type { Event } from '../types'

const toBnDigits = (value: string | number) => {
  const map = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return value
    .toString()
    .replace(/\d/g, (digit) => map[Number(digit)])
}

const formatDateBn = (date: string) => {
  const parts = date.split('-')
  if (parts.length !== 3) return toBnDigits(date)
  const [year, month, day] = parts
  return `${toBnDigits(day)}-${toBnDigits(month)}-${toBnDigits(year)}`
}

const formatTimeBn = (time: string) => {
  const [clock, suffix] = time.split(' ')
  const lower = (suffix ?? '').toLowerCase()
  const period = lower === 'am' ? 'সকাল' : lower === 'pm' ? 'বিকাল' : ''
  return period ? `${period} ${toBnDigits(clock)}` : toBnDigits(time)
}

const locationMap: Record<string, string> = {
  'Masjid Premises': 'মসজিদ প্রাঙ্গণ',
  'Masjid Ground': 'মসজিদ মাঠ',
  'Main Hall': 'মূল হল'
}

export function Events() {
  const events = (eventsData.events as Event[]).map((event) => ({
    ...event,
    name: event.nameBn ?? event.name,
    nameBn: undefined,
    date: formatDateBn(event.date),
    time: formatTimeBn(event.time),
    location: event.location ? (locationMap[event.location] ?? event.location) : undefined
  }))

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">কমিউনিটি অনুষ্ঠান</p>
              <h1 className="mt-2 text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                আসন্ন ধর্মীয় ও সামাজিক অনুষ্ঠানসমূহ
              </h1>
              <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                সময়সূচি দেখে আপনার অংশগ্রহণ পরিকল্পনা করুন।
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 text-center">
              <CalendarClock className="mx-auto h-8 w-8 text-[var(--color-primary)]" />
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">মোট অনুষ্ঠান</p>
              <p className="text-2xl font-semibold text-[var(--color-text)]">{toBnDigits(events.length)}</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionTitle
              title="অনুষ্ঠানের তালিকা"
              subtitle="প্রতিটি অনুষ্ঠানের বিস্তারিত তথ্য দেখতে কার্ডে ক্লিক করুন"
              className="mb-0"
            />
            <Link
              to="/community"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              কমিউনিটি তথ্য <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} detailPath={`/events/${event.id}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
