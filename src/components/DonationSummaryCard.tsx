import { Button } from './Button'
import { cn } from '../utils/cn'
import type { DonationSummary } from '../types'

interface DonationSummaryCardProps {
  summary: DonationSummary
  showCta?: boolean
  className?: string
}

function formatMoney(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-BD', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ` ${currency}`
}

export function DonationSummaryCard({ summary, showCta = true, className }: DonationSummaryCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border-2 border-[var(--color-primary)]/20 bg-white p-6 shadow-[var(--shadow-card)] ',
        className
      )}
    >
      <h3 className="text-lg font-semibold text-[var(--color-text)]">দান সংক্ষেপ / Donation Summary</h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">সর্বশেষ আপডেট: {summary.lastUpdated}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">এই মাসে সংগৃহীত</p>
          <p className="mt-1 text-xl font-bold text-[var(--color-primary)]">{formatMoney(summary.monthCollected, summary.currency)}</p>
        </div>
        <div className="rounded-lg bg-amber-50 p-4">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">এই মাসে ব্যয়</p>
          <p className="mt-1 text-xl font-bold text-amber-700">{formatMoney(summary.monthExpense, summary.currency)}</p>
        </div>
        <div className="rounded-lg bg-[var(--color-bg)] p-4">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">বর্তমান ব্যালেন্স</p>
          <p className="mt-1 text-xl font-bold text-[var(--color-text)]">{formatMoney(summary.currentBalance, summary.currency)}</p>
        </div>
      </div>
      {showCta && (
        <Button asChild to="/donation" variant="primary" size="md" className="mt-6">
          পূর্ণ রিপোর্ট দেখুন / See Full Report
        </Button>
      )}
    </div>
  )
}
