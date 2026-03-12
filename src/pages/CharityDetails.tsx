import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, Phone } from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import charityData from '../data/charityCampaigns.json'
import { images } from '../assets/image'
import type { CharityCampaign } from '../types'

const toBnDigits = (value: number | string) => {
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

export function CharityDetails() {
  const { id } = useParams()
  const campaigns = charityData.campaigns as CharityCampaign[]
  const campaign = campaigns.find((item) => item.id === id)

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-section)]">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">ক্যাম্পেইনের তথ্য পাওয়া যায়নি</h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">অনুগ্রহ করে আবার চেষ্টা করুন।</p>
            <Link
              to="/charity"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-[var(--color-primary)] px-4 text-sm font-semibold text-white"
            >
              ক্যাম্পেইনে ফিরুন
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const progress = Math.min(100, Math.round((campaign.raisedAmount / campaign.goalAmount) * 100))
  const imageKey = campaign.image as keyof typeof images
  const heroImage = campaign.image && images[imageKey] ? images[imageKey] : campaign.image
  const galleryImages = (campaign.images ?? []).map((img) => {
    const key = img as keyof typeof images
    return images[key] ?? img
  })

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/charity"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> দাতব্য ক্যাম্পেইন
        </Link>

        <section className="mt-4 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                {campaign.titleBn}
              </h1>
              <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                {campaign.descriptionBn}
              </p>
              <div className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                {campaign.beneficiaryBn && <p>উপকারভোগী: {campaign.beneficiaryBn}</p>}
                <p className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
                  <span>শেষ তারিখ: {formatDateBn(campaign.deadline)}</span>
                </p>
                {campaign.contact && (
                  <a
                    href={`tel:${campaign.contact.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                  >
                    <Phone className="h-4 w-4" /> {campaign.contact}
                  </a>
                )}
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <span>উঠেছে: {campaign.currency}{toBnDigits(campaign.raisedAmount)}</span>
                  <span>লক্ষ্য: {campaign.currency}{toBnDigits(campaign.goalAmount)}</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[var(--color-bg)]">
                  <div
                    className="h-2 rounded-full bg-[var(--color-primary)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[var(--color-text-muted)]">অগ্রগতি: {toBnDigits(progress)}%</p>
              </div>
            </div>
            <div className="w-full lg:max-w-md">
              {heroImage && (
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
                  <img src={heroImage} alt={campaign.titleBn} className="h-64 w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle title="কর্মসূচি" subtitle="এই ক্যাম্পেইনে যা করা হবে" />
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {(campaign.activitiesBn ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle title="সর্বশেষ আপডেট" subtitle="ক্যাম্পেইনের অগ্রগতির খবর" />
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {(campaign.updatesBn ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {galleryImages.length > 0 && (
          <section className="mt-10">
            <SectionTitle title="ক্যাম্পেইনের ছবি" subtitle="কার্যক্রমের কিছু দৃশ্য" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img, index) => (
                <div key={`${img}-${index}`} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
                  <img src={img} alt="ক্যাম্পেইন ছবি" className="h-40 w-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
