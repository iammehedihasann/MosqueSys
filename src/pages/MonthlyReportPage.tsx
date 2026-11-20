import { useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AccountsSection } from "@/components/donation/AccountsSection";
import donationData from "@/data/donation.json";
import { calculateDonationReport } from "@/utils/donationReport";
import {
  expensesUpdatedEvent,
  loadExpenseRecords,
  loadExpenses,
  type Expense,
} from "@/utils/expenses";
import {
  applyDonationCollectionOverrides,
  donationsUpdatedEvent,
  monthLabel,
  monthKeyFromLabel,
  saveDonationCollection,
} from "@/utils/donationCollections";
import type { DonationMonthlyRow } from "@/types";

const currency = donationData.summary.currency.trim();

export function MonthlyReportPage() {
  const [expenses, setExpenses] = useState<Expense[]>(() => loadExpenses());
  const [expenseLoadError, setExpenseLoadError] = useState<string | null>(null);
  const [monthlyRows, setMonthlyRows] = useState<DonationMonthlyRow[]>(() =>
    applyDonationCollectionOverrides(donationData.monthlyReport),
  );
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;
  });
  const [collectionAmount, setCollectionAmount] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

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
      setMonthlyRows(applyDonationCollectionOverrides(donationData.monthlyReport));
    refreshCollections();
    window.addEventListener(donationsUpdatedEvent, refreshCollections);
    return () => window.removeEventListener(donationsUpdatedEvent, refreshCollections);
  }, []);

  useEffect(() => {
    const existing = monthlyRows.find(
      (row) => monthKeyFromLabel(row.month) === selectedMonth,
    );
    if (!existing) return;
    const value =
      typeof existing.collected === "number"
        ? String(existing.collected)
        : typeof existing.collected === "string"
          ? existing.collected
          : "";
    setCollectionAmount(value === "-" ? "" : value);
  }, [selectedMonth, monthlyRows]);

  const report = calculateDonationReport(
    donationData.summary,
    monthlyRows,
    new Date(),
    expenses,
  );

  const updateCollection = (event: FormEvent) => {
    event.preventDefault();
    try {
      const amount = Number(collectionAmount);
      saveDonationCollection(selectedMonth, amount);
      setSaveMessage(`${monthLabel(selectedMonth)} মাসের আয় আপডেট হয়েছে।`);
      setCollectionAmount(String(amount));
      window.setTimeout(() => setSaveMessage(""), 4000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : "আপডেট করা যায়নি।");
    }
  };

  const selectCollectionMonth = (monthKey: string) => {
    setSelectedMonth(monthKey);
    const existing = monthlyRows.find(
      (row) => monthKeyFromLabel(row.month) === monthKey,
    );
    setCollectionAmount(
      typeof existing?.collected === "number" ? String(existing.collected) : "",
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <nav aria-label="আয়-ব্যয়ের পৃষ্ঠা" className="mb-6 flex flex-wrap gap-3">
        <Link
          to="/donation"
          className="inline-flex min-h-11 items-center rounded-xl border border-emerald-200 bg-white px-4 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          দান করুন
        </Link>
        <Link
          to="/expenses"
          className="inline-flex min-h-11 items-center rounded-xl border border-emerald-200 bg-white px-4 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          খরচের হিসাব
        </Link>
      </nav>
      {expenseLoadError && (
        <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {expenseLoadError}
        </p>
      )}
      <form
        onSubmit={updateCollection}
        className="mb-6 grid gap-3 rounded-2xl border border-emerald-100 bg-white p-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end"
      >
        <label className="grid gap-1 text-sm font-semibold text-gray-700">
          মাস নির্বাচন
          <input
            type="month"
            value={selectedMonth}
            onChange={(event) => selectCollectionMonth(event.target.value)}
            className="min-h-11 rounded-xl border border-gray-300 px-3"
            required
          />
        </label>
        <label className="grid gap-1 text-sm font-semibold text-gray-700">
          মাসের সংগ্রহীত আয়
          <input
            type="number"
            min="0"
            step="0.01"
            value={collectionAmount}
            onChange={(event) => setCollectionAmount(event.target.value)}
            placeholder="পরিমাণ লিখুন"
            className="min-h-11 rounded-xl border border-gray-300 px-3"
            required
          />
        </label>
        <button
          type="submit"
          className="min-h-11 rounded-xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800"
        >
          আয় আপডেট করুন
        </button>
        {saveMessage && (
          <p role="status" className="text-sm text-emerald-700 sm:col-span-3">
            {saveMessage}
          </p>
        )}
      </form>
      <AccountsSection report={report} currency={currency} />
    </main>
  );
}
