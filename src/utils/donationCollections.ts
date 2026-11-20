import type { DonationMonthlyRow } from "@/types";

export const donationsUpdatedEvent = "mosquesys:donations-updated";
export const savedDonationCollectionsKey = "mosquesys.saved-donations.v1";
const savedCollectionsKey = savedDonationCollectionsKey;

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
];

export function monthLabel(monthKey: string) {
  const match = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(monthKey);
  if (!match) return "";
  return `${banglaMonths[Number(match[2]) - 1]} ${match[1]}`;
}

export function monthKeyFromLabel(label: string) {
  const normalized = label
    .trim()
    .replace(/[০-৯]/g, (digit) => String("০১২৩৪৫৬৭৮৯".indexOf(digit)))
    .replace("ফেব্রুয়ারি", "ফেব্রুয়ারি")
    .replace("জানুয়ারি", "জানুয়ারি");
  const [monthName, year] = normalized.split(/\s+/);
  const monthIndex = banglaMonths.indexOf(monthName);
  return monthIndex >= 0 && /^\d{4}$/.test(year)
    ? `${year}-${String(monthIndex + 1).padStart(2, "0")}`
    : null;
}

export function loadDonationCollectionOverrides(): Record<string, number> {
  try {
    if (typeof window === "undefined") return {};
    const value = JSON.parse(window.localStorage.getItem(savedCollectionsKey) ?? "{}");
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};

    return Object.fromEntries(
      Object.entries(value).filter(
        ([key, amount]) =>
          /^\d{4}-(0[1-9]|1[0-2])$/.test(key) &&
          typeof amount === "number" &&
          Number.isFinite(amount) &&
          amount >= 0,
      ) as [string, number][],
    );
  } catch {
    return {};
  }
}

export function applyDonationCollectionOverrides(
  rows: readonly DonationMonthlyRow[],
): DonationMonthlyRow[] {
  const overrides = loadDonationCollectionOverrides();
  const result = rows.map((row) => {
    const key = monthKeyFromLabel(row.month);
    if (!key) return { ...row };
    return overrides[key] === undefined
      ? { ...row }
      : { ...row, collected: overrides[key] };
  });

  return result.sort((a, b) => {
    const aKey = monthKeyFromLabel(a.month) ?? "";
    const bKey = monthKeyFromLabel(b.month) ?? "";
    return bKey.localeCompare(aKey);
  });
}

export function saveDonationCollection(monthKey: string, amount: number) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(monthKey)) {
    throw new Error("সঠিক মাস নির্বাচন করুন।");
  }
  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error("সঠিক আয়ের পরিমাণ লিখুন।");
  }

  const overrides = loadDonationCollectionOverrides();
  overrides[monthKey] = amount;
  window.localStorage.setItem(savedCollectionsKey, JSON.stringify(overrides));
  window.dispatchEvent(new Event(donationsUpdatedEvent));
}
