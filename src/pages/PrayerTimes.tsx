import { SectionTitle } from '../components/SectionTitle'
import { Table } from '../components/Table'
import prayerTimesData from '../data/prayerTimes.json'
import type { PrayerTime } from '../types'
import { Info, Clock, Calendar } from 'lucide-react'

const columns = [
  { key: 'name' as const, header: 'নামাজ / Prayer', render: (row: PrayerTime) => `${row.name}${row.nameBn ? ` (${row.nameBn})` : ''}` },
  { key: 'azan' as const, header: 'আযান / Azan' },
  { key: 'iqamah' as const, header: 'ইকামত / Iqamah' },
]

export function PrayerTimes() {
  const times = prayerTimesData.times as PrayerTime[]
  const lastUpdated = prayerTimesData.lastUpdated
    ? new Date(prayerTimesData.lastUpdated as string).toLocaleDateString('en-BD', {
        dateStyle: 'medium',
      })
    : '—'

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <SectionTitle
        title="নামাজের সময়সূচী / Prayer Times"
        subtitle="আজকের নামাজের সময়। সময় পরিবর্তন হতে পারে—মসজিদে নিশ্চিত করুন।"
      />

      {/* Time table */}
      <Table<PrayerTime>
        columns={columns}
        data={times}
        keyExtractor={(row) => row.id}
        highlightRow={(row) => row.isJumuah === true}
        className="overflow-hidden rounded-xl border-[var(--color-border)]"
      />
      <p className="mt-3 flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
        <Calendar className="h-4 w-4 shrink-0" />
        সর্বশেষ আপডেট: {lastUpdated}
      </p>

      {/* Bangla instructions & info */}
      <section className="mt-10 space-y-6" aria-labelledby="prayer-instructions-heading">
        <h2 id="prayer-instructions-heading" className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text)]">
          <Info className="h-5 w-5 text-[var(--color-primary)]" />
          নামাজ ও সময় সংক্রান্ত নির্দেশনা
        </h2>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-[var(--color-primary)]">আযান ও ইকামত কী?</h3>
            <p className="mt-2 text-sm text-[var(--color-text)] leading-relaxed">
              <strong>আযান</strong> হলো নামাজের সময় জানানোর ঘোষণা। এই সময় নামাজ পড়ার জন্য প্রস্তুতি নিন।
              <strong> ইকামত</strong> হলো জামাতে নামাজ শুরু হওয়ার সময়—ইকামতের পর জামাত শুরু হয়, তাই ইকামতের আগে মসজিদে উপস্থিত হওয়া উত্তম।
            </p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)]">
            <h3 className="font-semibold text-[var(--color-primary)]">সময়মতো নামাজের গুরুত্ব</h3>
            <p className="mt-2 text-sm text-[var(--color-text)] leading-relaxed">
              প্রতিটি ওয়াক্ত নামাজ তার নির্ধারিত সময়ে পড়া মুস্তাহাব। ফজর সূর্য ওঠার আগে, যোহর দুপুরে, আসর বিকেলে, মাগরিব সূর্য ডোবার পর এবং ইশা রাতে পড়া হয়। জুমুআর দিন জোহরের পরিবর্তে জুমুআর নামাজ পড়া হয়।
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-amber-800">
            <Clock className="h-5 w-5" />
            মসজিদে প্রবেশের আদব
          </h3>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-amber-900/90">
            <li>প্রবেশের আগে পা ধুয়ে, পবিত্র হয়ে আসুন।</li>
            <li>মোবাইল সাইলেন্ট বা বন্ধ রাখুন।</li>
            <li>ইকামত শুরু হলে দ্রুত সারিতে শরিক হন।</li>
            <li>নামাজরত ব্যক্তির সামনে দিয়ে হাঁটবেন না।</li>
            <li>জুমুআর দিন আগেভাগে আসলে ভালো।</li>
          </ul>
        </div>
      </section>
    </div>
  )
}
