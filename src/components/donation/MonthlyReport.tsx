// src/components/donation/MonthlyReport.tsx
import { DonationSummaryCard } from "@/components/shared/DonationSummaryCard";
import { DonationChart } from "@/components/donation/DonationChart";
import { Table } from "@/components/ui/Table";
import {
  calculateDonationReport,
  formatDonationMoney,
  type DonationReportMonth,
} from "@/utils/donationReport";

type Report = ReturnType<typeof calculateDonationReport>;

interface Props {
  report: Report;
  currency: string;
}

function TotalCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-xl border border-[#E3ECE6] bg-white p-4">
      <dt className="text-sm font-medium text-gray-700">{label}</dt>
      <dd className="mt-1 text-xl font-semibold tabular-nums text-[#0F3D33]">
        {value}
      </dd>
      <dd className="mt-1 text-xs text-gray-600">{note}</dd>
    </div>
  );
}

export function MonthlyReport({ report, currency }: Props) {
  const { latest, months } = report;
  const bn = (n: number) => n.toLocaleString("bn-BD");

  const columns = [
    { key: "month" as const, header: "মাস / Month" },
    {
      key: "collected" as const,
      header: "সংগৃহীত",
      render: (row: DonationReportMonth) =>
        formatDonationMoney(row.collected ?? row.collectedStatus, currency),
    },
    {
      key: "expense" as const,
      header: "ব্যয়",
      render: (row: DonationReportMonth) =>
        formatDonationMoney(row.expense ?? row.expenseStatus, currency),
    },
    {
      key: "net" as const,
      header: "নিট (আয় − ব্যয়)",
      render: (row: DonationReportMonth) =>
        formatDonationMoney(row.net, currency),
    },
    {
      key: "closingBalance" as const,
      header: "মাসশেষের ব্যালেন্স",
      render: (row: DonationReportMonth) =>
        formatDonationMoney(row.closingBalance, currency),
    },
  ];

  return (
    <div>
      <DonationSummaryCard
        summary={report.summary}
        reportMonth={latest?.month}
        monthNet={latest?.net}
        showCta={true}
        className="mb-6"
      />
      {latest && (
        <>
          <dl className="mb-4 grid gap-3 sm:grid-cols-2">
            <TotalCard
              label="নথিভুক্ত মোট আয়"
              value={formatDonationMoney(report.incomeTotal, currency)}
              note={`${bn(months.length)} মাসের মধ্যে ${bn(report.incomeCount)} মাসের হিসাব`}
            />
            <TotalCard
              label="নথিভুক্ত মোট ব্যয়"
              value={formatDonationMoney(report.expenseTotal, currency)}
              note={`${bn(months.length)} মাসের মধ্যে ${bn(report.expenseCount)} মাসের হিসাব`}
            />
          </dl>
          <DonationChart months={months} currency={currency} className="mb-6" />
          <Table<DonationReportMonth>
            columns={columns}
            data={[...months].reverse()}
            keyExtractor={(row) => row.month}
            className="rounded-xl border-[var(--color-border)]"
          />
          <p className="mt-3 text-sm text-gray-600">
            ড্যাশ (—) দিয়ে অনুপলব্ধ অঙ্ক দেখানো হয়েছে। মাসের আয় ও ব্যয় দুটিই পাওয়া
            গেলে নিট হিসাব করা হয়। আগের মাসের সমাপনী ব্যালেন্স জানা থাকলে তার সঙ্গে
            নিট যোগ করে মাসশেষের ব্যালেন্স হিসাব করা হয়।
          </p>
        </>
      )}
    </div>
  );
}
