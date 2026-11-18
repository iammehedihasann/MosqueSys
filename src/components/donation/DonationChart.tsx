import { lazy, Suspense } from "react";
import { cn } from "@/utils/cn";
import { formatDonationMoney, type DonationReportMonth } from "@/utils/donationReport";

const DonationChartCanvas = lazy(() => import("./DonationChartCanvas"));

export function DonationChart({
  months,
  currency,
  className,
}: {
  months: readonly DonationReportMonth[];
  currency: string;
  className?: string;
}) {
  const hasAmounts = months.some((month) => month.collected !== null || month.expense !== null);
  const hasMissingAmounts = months.some((month) => month.collected === null || month.expense === null);

  return (
    <figure className={cn("min-w-0 rounded-2xl border border-[#E3ECE6] bg-white p-4 sm:p-5", className)}>
      <figcaption>
        <h3 className="text-lg font-semibold">মাসিক আয় ও ব্যয়</h3>
        {hasAmounts && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#14231F]">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2.5 rounded-sm bg-[#1E5B4C]" />
              আয়
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="size-2.5 rounded-sm bg-[#B5892D]" />
              ব্যয়
            </span>
            <span>{currency}</span>
          </div>
        )}
      </figcaption>
      {hasAmounts ? (
        <>
          <div className="mt-3">
            <Suspense fallback={<p role="status" className="py-6 text-sm text-gray-600">চার্ট লোড হচ্ছে…</p>}>
              <DonationChartCanvas months={months} currency={currency} />
            </Suspense>
          </div>
          {hasMissingAmounts && (
            <p className="mt-2 text-xs text-gray-600">কিছু মাসের আয় বা ব্যয়ের অঙ্ক এখনও প্রকাশিত হয়নি।</p>
          )}
          <ul className="sr-only">
            {months.map((month) => (
              <li key={month.month}>
                {month.month}, আয় {formatDonationMoney(month.collected ?? month.collectedStatus, currency)},
                ব্যয় {formatDonationMoney(month.expense ?? month.expenseStatus, currency)}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="mt-3 text-sm text-gray-600">মাসিক আয় ও ব্যয়ের অঙ্ক এখনও প্রকাশিত হয়নি।</p>
      )}
    </figure>
  );
}
