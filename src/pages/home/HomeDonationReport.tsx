import { useEffect, useState, type ReactNode } from "react";
import { DonationChart } from "@/components/donation/DonationChart";
import type { DonationMonthlyRow, DonationSummary } from "@/types";
import { calculateDonationReport, formatDonationMoney } from "@/utils/donationReport";
import {
  expensesUpdatedEvent,
  loadExpenseRecords,
  loadExpenses,
  type Expense,
} from "@/utils/expenses";
import {
  applyDonationCollectionOverrides,
  donationsUpdatedEvent,
} from "@/utils/donationCollections";

interface HomeDonationReportProps {
  summary: DonationSummary;
  monthlyReport?: DonationMonthlyRow[];
  introduction: ReactNode;
  reportLink: ReactNode;
  fallback: ReactNode;
}

export function HomeDonationReport({
  summary,
  monthlyReport,
  introduction,
  reportLink,
  fallback,
}: HomeDonationReportProps) {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());
  const [collections, setCollections] = useState<DonationMonthlyRow[]>(() =>
    applyDonationCollectionOverrides(monthlyReport ?? []),
  );
  const [expenseLoadError, setExpenseLoadError] = useState<string | null>(null);

  useEffect(() => {
    const refreshExpenses = () => {
      try {
        setExpenses(loadExpenseRecords());
        setExpenseLoadError(null);
      } catch (error) {
        setExpenses(loadExpenses());
        setExpenseLoadError(
          error instanceof Error ? error.message : "খরচের তথ্য লোড করা যায়নি।",
        );
      }
    };

    refreshExpenses();
    window.addEventListener(expensesUpdatedEvent, refreshExpenses);
    return () => window.removeEventListener(expensesUpdatedEvent, refreshExpenses);
  }, []);

  useEffect(() => {
    const refreshCollections = () =>
      setCollections(applyDonationCollectionOverrides(monthlyReport ?? []));
    refreshCollections();
    window.addEventListener(donationsUpdatedEvent, refreshCollections);
    return () => window.removeEventListener(donationsUpdatedEvent, refreshCollections);
  }, [monthlyReport]);

  const report = calculateDonationReport(
    summary,
    collections,
    new Date(),
    expenses,
  );
  const expenseError = expenseLoadError && (
    <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
      {expenseLoadError}
    </p>
  );
  const { latest, months } = report;
  if (!latest) {
    return (
      <>
        {expenseError}
        <div className="grid items-start gap-6 md:grid-cols-2">
          <div className="space-y-5">
            {introduction}
            {reportLink}
          </div>
          {fallback}
        </div>
      </>
    );
  }

  const { currency, monthCollected, monthExpense, currentBalance } = report.summary;

  return (
    <>
      {expenseError}
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-16">
        <div>
          {introduction}
          <p className="mt-2 text-sm font-medium text-(--home-green)">প্রতিবেদনের মাস: {latest.month}</p>
          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 text-(--home-green)">
            <div className="col-span-2">
              <dt className="text-sm font-medium">মাসশেষের ব্যালেন্স</dt>
              <dd className="mt-1 text-4xl leading-tight font-semibold tabular-nums [font-family:var(--font-display)] lg:text-5xl">
                {formatDonationMoney(currentBalance, currency)}
              </dd>
            </div>
            <div>
              <dt className="text-sm">এই মাসে সংগৃহীত</dt>
              <dd className="font-semibold tabular-nums">{formatDonationMoney(monthCollected, currency)}</dd>
            </div>
            <div>
              <dt className="text-sm">এই মাসে ব্যয়</dt>
              <dd className="font-semibold tabular-nums">{formatDonationMoney(monthExpense, currency)}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-sm">নিট (আয় − ব্যয়)</dt>
              <dd className="font-semibold tabular-nums">{formatDonationMoney(latest.net, currency)}</dd>
            </div>
          </dl>
          <div className="mt-5">{reportLink}</div>
        </div>

        <DonationChart months={months} currency={currency} />
      </div>
    </>
  );
}
