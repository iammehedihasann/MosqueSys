import type { DonationMonthlyRow, DonationSummary } from "@/types";

const formatter = new Intl.NumberFormat("en-BD", { maximumFractionDigits: 2 });
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

  let previousClosing: number | null = null;
  let previousPeriod: number | null = null;
  let incomeTotal = 0;
  let expenseTotal = 0;
  let incomeCount = 0;
  let expenseCount = 0;

  const months = ordered.map(({ row, period }) => {
    const collected = amountInPoisha(row.collected);
    const expense = amountInPoisha(row.expense);
    const net =
      collected !== null && expense !== null ? collected - expense : null;
    const openingBalance =
      period !== null && previousPeriod === period - 1 ? previousClosing : null;
    const closingBalance =
      amountInPoisha(row.balance) ??
      (openingBalance !== null && net !== null ? openingBalance + net : null);

    previousClosing = closingBalance;
    previousPeriod = period;

    if (collected !== null) {
      incomeTotal += collected;
      incomeCount++;
    }
    if (expense !== null) {
      expenseTotal += expense;
      expenseCount++;
    }

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
    incomeTotal: incomeCount ? toTaka(incomeTotal) : null,
    expenseTotal: expenseCount ? toTaka(expenseTotal) : null,
    incomeCount,
    expenseCount,
  };
}

export type DonationReportMonth = ReturnType<
  typeof calculateDonationReport
>["months"][number];
