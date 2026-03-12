import { Link } from 'react-router-dom'
import { ArrowRight, Building2, Heart, Shield } from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import { CommunityPlaceCard } from '../components/CommunityPlaceCard'
import { EmergencyContactCard } from '../components/EmergencyContactCard'
import { EventCard } from '../components/EventCard'
import communityPlacesData from '../data/communityPlaces.json'
import emergencyContactsData from '../data/emergencyContacts.json'
import eventsData from '../data/events.json'
import type { CommunityPlace, EmergencyContact, Event } from '../types'

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

export function Community() {
  const places = communityPlacesData.places as CommunityPlace[]
  const contacts = emergencyContactsData.contacts as EmergencyContact[]
  const events = (eventsData.events as Event[]).map((event) => ({
    ...event,
    name: event.nameBn ?? event.name,
    nameBn: undefined,
    date: formatDateBn(event.date),
    time: formatTimeBn(event.time),
    location: event.location ? (locationMap[event.location] ?? event.location) : undefined
  }))

  const quickContacts = contacts.slice(0, 3)

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[var(--color-primary)]">কমিউনিটি তথ্য কেন্দ্র</p>
              <h1 className="mt-2 text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                মসজিদকে কেন্দ্র করে গ্রামের গুরুত্বপূর্ণ তথ্য একসাথে
              </h1>
              <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                শিক্ষা প্রতিষ্ঠান, সামাজিক সেবা, জরুরি যোগাযোগ ও আসন্ন কার্যক্রমের হালনাগাদ তথ্য এখানে পাওয়া যাবে।
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/emergency"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
                >
                  জরুরি যোগাযোগ দেখুন <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-text)] hover:bg-gray-50"
                >
                  স্থানীয় সেবাসমূহ
                </Link>
              </div>
            </div>
            <div className="grid w-full gap-4 sm:grid-cols-3 lg:max-w-md">
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-center">
                <p className="text-xs text-[var(--color-text-muted)]">প্রতিষ্ঠান</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--color-text)]">{toBnDigits(places.length)}</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-center">
                <p className="text-xs text-[var(--color-text-muted)]">জরুরি যোগাযোগ</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--color-text)]">{toBnDigits(contacts.length)}</p>
              </div>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-center">
                <p className="text-xs text-[var(--color-text-muted)]">আসন্ন অনুষ্ঠান</p>
                <p className="mt-1 text-2xl font-semibold text-[var(--color-text)]">{toBnDigits(events.length)}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Places */}
        <section className="mt-12">
          <SectionTitle
            title="কমিউনিটি প্রতিষ্ঠানসমূহ"
            subtitle="গ্রামের শিক্ষা, স্বাস্থ্য ও সামাজিক প্রতিষ্ঠানের পরিচিতি"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {places.map((place) => (
              <CommunityPlaceCard key={place.id} place={place} detailPath={`/community/places/${place.id}`} />
            ))}
          </div>
        </section>

        {/* Emergency Quick Access */}
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionTitle
              title="জরুরি যোগাযোগ দ্রুত সহায়তা"
              subtitle="জরুরি মুহূর্তে দ্রুত যোগাযোগের জন্য প্রধান নম্বরগুলো"
              className="mb-0"
            />
            <Link
              to="/emergency"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              সব জরুরি নম্বর দেখুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {quickContacts.map((contact) => (
              <EmergencyContactCard key={contact.id} contact={contact} detailPath={`/emergency/${contact.id}`} />
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionTitle
              title="আসন্ন কমিউনিটি অনুষ্ঠান"
              subtitle="ধর্মীয় ও সামাজিক অনুষ্ঠানের সময়সূচি"
              className="mb-0"
            />
            <Link
              to="/notices"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              ঘোষণাসমূহ দেখুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} detailPath={`/events/${event.id}`} />
            ))}
          </div>
        </section>

        {/* Community Support */}
        <section className="mt-12 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-700">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)]">স্থানীয় সেবা নির্দেশনা</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">জন্ম নিবন্ধন, সনদ, কৃষি সহায়তা ও সরকারি সেবার তথ্য।</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)]">দাতব্য ও স্বেচ্ছাসেবা</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">দরিদ্র সহায়তা, রক্তদান ও দুর্যোগ সহযোগিতার তথ্য।</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--color-text)]">নিরাপত্তা নির্দেশনা</h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">প্রাকৃতিক দুর্যোগে করণীয় ও জরুরি নির্দেশনা।</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
