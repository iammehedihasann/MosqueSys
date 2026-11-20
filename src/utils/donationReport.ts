import type { DonationMonthlyRow, DonationSummary } from "@/types";
import type { Expense } from "@/utils/expenses";

const formatter = new Intl.NumberFormat("en-BD", { maximumFractionDigits: 2 });
const REPORT_HISTORY_WINDOW = 12;
const REPORT_DISPLAY_WINDOW = 5;
const REPORT_TIME_ZONE = "Asia/Dhaka";
const banglaDigits = "০১২৩৪৫৬৭৮৯";
const banglaMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
].map((month) => month.normalize());

const englishMonths = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function normalizeDigits(value: string) {
  return value.replace(/[০-৯]/g, (digit) =>
    String(banglaDigits.indexOf(digit)),
  );
}

export function monthPeriod(label: string) {
  const value = normalizeDigits(label.trim()).normalize().toLowerCase();
  const iso = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(value);
  if (iso) return Number(iso[1]) * 12 + Number(iso[2]) - 1;

  const parts = /^(\S+)\s+(\d{4})$/.exec(value);
  if (!parts) return null;

  const banglaIndex = banglaMonths.indexOf(parts[1]);
  const index =
    banglaIndex >= 0 ? banglaIndex : englishMonths.indexOf(parts[1]);
  return index >= 0 ? Number(parts[2]) * 12 + index : null;
}

type ReportAmount = DonationMonthlyRow["collected"];

function amountInPoisha(value: ReportAmount) {
  if (value == null) return null;
  if (typeof value === "string") {
    const normalized = normalizeDigits(value.trim())
      .replace(/^৳\s*/, "")
      .replace(/^−/, "-");
    const amountPattern =
      /^[+-]?(?:\d+|\d{1,3}(?:,\d{3})+|\d{1,2}(?:,\d{2})*,\d{3})(?:\.\d{1,2})?$/;
    if (!amountPattern.test(normalized)) return null;
    value = Number(normalized.replace(/,/g, ""));
  }

  const poisha = Math.round(value * 100);
  return Number.isSafeInteger(poisha) ? poisha || 0 : null;
}

function toTaka(amount: number | null) {
  return amount === null ? null : amount / 100;
}

function amountStatus(value: ReportAmount) {
  const status = typeof value === "string" ? value.trim() : "";
  return /^[—–-]*$/.test(status) ? null : status;
}

export function formatDonationMoney(value: ReportAmount, currency = "") {
  const poisha = amountInPoisha(value);
  if (poisha === null) return amountStatus(value) ?? "—";
  return [formatter.format(poisha / 100), currency.trim()]
    .filter(Boolean)
    .join(" ");
}

export function calculateDonationReport(
  summary: DonationSummary,
  monthlyReport: readonly DonationMonthlyRow[] = [],
  now: Date = new Date(),
  expenses: readonly Expense[] = [],
) {
  const ordered = monthlyReport.map((row) => ({
    row,
    period: monthPeriod(row.month),
  }));
  if (ordered.every((item) => item.period !== null)) {
    ordered.sort((a, b) => (a.period ?? 0) - (b.period ?? 0));
  } else {
    // The published report lists newest months first.
    ordered.reverse();
  }

  const dateParts = new Intl.DateTimeFormat("en", {
    timeZone: REPORT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(now);
  const year = dateParts.find((part) => part.type === "year")?.value;
  const month = dateParts.find((part) => part.type === "month")?.value;
  const currentPeriod = year && month ? monthPeriod(`${year}-${month}`) : null;
  const allPeriodsKnown = ordered.every((item) => item.period !== null);
  const history =
    currentPeriod !== null && allPeriodsKnown
      ? ordered.filter(
          ({ period }) =>
            period !== null &&
            period >= currentPeriod - REPORT_HISTORY_WINDOW + 1 &&
            period <= currentPeriod,
        )
      : ordered.slice(-REPORT_HISTORY_WINDOW);

  const expensesByMonth = new Map<string, number>();
  for (const expense of expenses) {
    const key = expense.date.slice(0, 7);
    expensesByMonth.set(
      key,
      (expensesByMonth.get(key) ?? 0) + expense.amount,
    );
  }

  let previousClosing: number | null = null;
  let previousPeriod: number | null = null;

  const historyMonths = history.map(({ row, period }) => {
    const collected = amountInPoisha(row.collected);
    const key =
      period === null
        ? ""
        : `${Math.floor(period / 12)}-${String((period % 12) + 1).padStart(2, "0")}`;
    const expense = expensesByMonth.has(key)
      ? (expensesByMonth.get(key) ?? 0) * 100
      : amountInPoisha(row.expense);
    const net =
      collected !== null && expense !== null ? collected - expense : null;
    const openingBalance =
      period !== null && previousPeriod === period - 1 ? previousClosing : null;
    const closingBalance =
      amountInPoisha(row.balance) ??
      (openingBalance !== null && net !== null ? openingBalance + net : null);

    previousClosing = closingBalance;
    previousPeriod = period;

    return {
      month: row.month.trim(),
      collected: toTaka(collected),
      collectedStatus: collected === null ? amountStatus(row.collected) : null,
      expense: toTaka(expense),
      expenseStatus: expense === null ? amountStatus(row.expense) : null,
      net: toTaka(net),
      closingBalance: toTaka(closingBalance),
    };
  });

  const months =
    currentPeriod !== null && allPeriodsKnown
      ? historyMonths.filter((_, index) => {
          const period = history[index].period;
          return (
            period !== null &&
            period >= currentPeriod - REPORT_DISPLAY_WINDOW + 1 &&
            period <= currentPeriod
          );
        })
      : historyMonths.slice(-REPORT_DISPLAY_WINDOW);
  const incomeAmounts = historyMonths.flatMap((row) =>
    row.collected === null ? [] : [Math.round(row.collected * 100)],
  );
  const expensesByPeriod = new Map<number, number>();
  history.forEach(({ row, period }) => {
    if (period === null) return;
    const key = `${Math.floor(period / 12)}-${String((period % 12) + 1).padStart(2, "0")}`;
    const expense = expensesByMonth.has(key)
      ? (expensesByMonth.get(key) ?? 0) * 100
      : amountInPoisha(row.expense);
    if (expense !== null) expensesByPeriod.set(period, expense);
  });
  for (const [key, amount] of expensesByMonth) {
    const period = monthPeriod(key);
    if (
      period !== null &&
      currentPeriod !== null &&
      period >= currentPeriod - REPORT_HISTORY_WINDOW + 1 &&
      period <= currentPeriod
    ) {
      expensesByPeriod.set(period, amount * 100);
    }
  }
  const expenseAmounts = [...expensesByPeriod.values()];
  const completeYear =
    historyMonths.length === REPORT_HISTORY_WINDOW &&
    historyMonths.every((row) => row.collected !== null && row.expense !== null);
  const incomeTotalPoisha = incomeAmounts.reduce((sum, amount) => sum + amount, 0);
  const expenseTotalPoisha = expenseAmounts.reduce((sum, amount) => sum + amount, 0);
  const yearlyNetPoisha = completeYear
    ? historyMonths.reduce(
        (sum, row) =>
          sum + Math.round((row.net ?? 0) * 100),
        0,
      )
    : null;
  const latest = months.at(-1);
  return {
    months,
    latest,
    summary: latest
      ? {
          ...summary,
          monthCollected: latest.collected ?? latest.collectedStatus ?? "",
          monthExpense: latest.expense ?? latest.expenseStatus ?? "",
          currentBalance: latest.closingBalance ?? "",
        }
      : summary,
    incomeTotal: incomeAmounts.length ? toTaka(incomeTotalPoisha) : null,
    expenseTotal: expenseAmounts.length ? toTaka(expenseTotalPoisha) : null,
    yearlyNet: toTaka(yearlyNetPoisha),
    incomeCount: incomeAmounts.length,
    expenseCount: expenseAmounts.length,
  };
}

export type DonationReportMonth = ReturnType<
  typeof calculateDonationReport
>["months"][number];
