import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, MapPin, Phone } from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import { Badge } from '../components/Badge'
import eventsData from '../data/events.json'
import { images } from '../assets/image'
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

export function EventDetails() {
  const { id } = useParams()
  const events = eventsData.events as Event[]
  const event = events.find((item) => item.id === id)

  if (!event) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-section)]">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">অনুষ্ঠানের তথ্য পাওয়া যায়নি</h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">অনুগ্রহ করে আবার চেষ্টা করুন।</p>
            <Link
              to="/events"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-[var(--color-primary)] px-4 text-sm font-semibold text-white"
            >
              অনুষ্ঠান তালিকায় ফিরুন
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const imageKey = event.image as keyof typeof images
  const heroImage = event.image && images[imageKey] ? images[imageKey] : event.image
  const galleryImages = (event.images ?? []).map((img) => {
    const key = img as keyof typeof images
    return images[key] ?? img
  })

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> অনুষ্ঠান তালিকা
        </Link>

        <section className="mt-4 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                  {event.nameBn ?? event.name}
                </h1>
                <Badge variant="success">আসন্ন</Badge>
              </div>
              {event.descriptionBn && (
                <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                  {event.descriptionBn}
                </p>
              )}
              <div className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                <p className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
                  <span>{formatDateBn(event.date)}</span>
                </p>
                <p className="flex items-start gap-2">
                  <Clock className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
                  <span>{formatTimeBn(event.time)}</span>
                </p>
                {event.location && (
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
                    <span>{locationMap[event.location] ?? event.location}</span>
                  </p>
                )}
                {event.organizerBn && <p>আয়োজক: {event.organizerBn}</p>}
                {event.contact && (
                  <a
                    href={`tel:${event.contact.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                  >
                    <Phone className="h-4 w-4" /> {event.contact}
                  </a>
                )}
              </div>
            </div>
            <div className="w-full lg:max-w-md">
              {heroImage && (
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
                  <img src={heroImage} alt={event.nameBn ?? event.name} className="h-64 w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <SectionTitle title="কার্যক্রমের তালিকা" subtitle="এই অনুষ্ঠানে যে অংশগুলো থাকবে" />
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {(event.agendaBn ?? []).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </section>

        {galleryImages.length > 0 && (
          <section className="mt-10">
            <SectionTitle title="অনুষ্ঠানের ছবি" subtitle="পূর্বের কার্যক্রমের কিছু দৃশ্য" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img, index) => (
                <div key={`${img}-${index}`} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
                  <img src={img} alt="অনুষ্ঠানের ছবি" className="h-40 w-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
