import { Link } from 'react-router-dom'
import { HandHeart } from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import { CharityCampaignCard } from '../components/CharityCampaignCard'
import charityData from '../data/charityCampaigns.json'
import type { CharityCampaign } from '../types'

const toBnDigits = (value: number | string) => {
  const map = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return value
    .toString()
    .replace(/\d/g, (digit) => map[Number(digit)])
}

export function Charity() {
  const campaigns = charityData.campaigns as CharityCampaign[]

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">দাতব্য কার্যক্রম</p>
              <h1 className="mt-2 text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                চলমান দাতব্য ক্যাম্পেইনসমূহ
              </h1>
              <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                আপনার সহায়তায় কমিউনিটির দরিদ্র পরিবার উপকৃত হবে।
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 text-center">
              <HandHeart className="mx-auto h-8 w-8 text-[var(--color-primary)]" />
              <p className="mt-2 text-sm text-[var(--color-text-muted)]">মোট ক্যাম্পেইন</p>
              <p className="text-2xl font-semibold text-[var(--color-text)]">{toBnDigits(campaigns.length)}</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <SectionTitle
              title="ক্যাম্পেইনের তালিকা"
              subtitle="ক্যাম্পেইনের বিস্তারিত জানতে কার্ডে ক্লিক করুন"
              className="mb-0"
            />
            <Link
              to="/donation"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
            >
              দান পেজ দেখুন
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign) => (
              <CharityCampaignCard key={campaign.id} campaign={campaign} detailPath={`/charity/${campaign.id}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
