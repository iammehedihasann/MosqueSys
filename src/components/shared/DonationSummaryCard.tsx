import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import type { DonationSummary } from "@/types";
import { formatDonationMoney } from "@/utils/donationReport";
import { ArrowRight } from "lucide-react";

interface DonationSummaryCardProps {
  summary: DonationSummary;
  showCta?: boolean;
  className?: string;
  reportMonth?: string;
  monthNet?: number | null;
}

export function DonationSummaryCard({
  summary,
  showCta = true,
  className,
  reportMonth,
  monthNet,
}: DonationSummaryCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border-2 border-[var(--color-primary)]/20 bg-white p-6",
        className,
      )}
    >
      <h3 className="text-2xl font-semibold text-[var(--color-text)]">
        দান সংক্ষেপ
      </h3>
      <p className="mt-1 text-sm text-[var(--color-text-muted)]">
        {reportMonth ? `প্রতিবেদনের মাস: ${reportMonth}` : `সর্বশেষ আপডেট: ${summary.lastUpdated}`}
      </p>
      <div className={cn("mt-5 grid gap-4", reportMonth ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3")}>
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            এই মাসে সংগৃহীত
          </p>
          <p className="mt-1 text-xl font-bold text-[var(--color-primary)]">
            {formatDonationMoney(summary.monthCollected, summary.currency)}
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-4">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            এই মাসে ব্যয়
          </p>
          <p className="mt-1 text-xl font-bold text-amber-700">
            {formatDonationMoney(summary.monthExpense, summary.currency)}
          </p>
        </div>
        {reportMonth && (
          <div className="rounded-lg bg-[var(--color-bg)] p-4">
            <p className="text-sm font-medium text-[var(--color-text-muted)]">
              নিট (আয় − ব্যয়)
            </p>
            <p className="mt-1 text-xl font-bold text-[var(--color-text)]">
              {formatDonationMoney(monthNet ?? null, summary.currency)}
            </p>
          </div>
        )}
        <div className="rounded-lg bg-[var(--color-bg)] p-4">
          <p className="text-sm font-medium text-[var(--color-text-muted)]">
            {reportMonth ? "মাসশেষের ব্যালেন্স" : "বর্তমান ব্যালেন্স"}
          </p>
          <p className="mt-1 text-xl font-bold text-[var(--color-text)]">
            {formatDonationMoney(summary.currentBalance, summary.currency)}
          </p>
        </div>
      </div>
      {showCta && (
        <div className="mt-6">
          <Button asChild to="/donation" variant="primary">
            পূর্ণ রিপোর্ট দেখুন
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
