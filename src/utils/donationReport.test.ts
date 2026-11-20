import { describe, expect, it } from "vitest";
import { calculateDonationReport } from "./donationReport";

const summary = {
  monthCollected: "",
  monthExpense: "",
  currentBalance: "",
  currency: "টাকা",
  lastUpdated: "2026-12-01",
};

const monthlyReport = [
  { month: "জুলাই ২০২৬", collected: 10 },
  { month: "আগস্ট ২০২৬", collected: 20 },
  { month: "সেপ্টেম্বর ২০২৬", collected: 30 },
  { month: "অক্টোবর ২০২৬", collected: 40 },
  { month: "নভেম্বর ২০২৬", collected: 50 },
  { month: "ডিসেম্বর ২০২৬", collected: 60 },
];

describe("donation report retention", () => {
  it("limits the visible income report to the current five Dhaka calendar months", () => {
    const report = calculateDonationReport(
      summary,
      monthlyReport,
      new Date("2026-12-01T00:00:00+06:00"),
    );

    expect(report.months.map(({ month }) => month)).toEqual([
      "আগস্ট ২০২৬",
      "সেপ্টেম্বর ২০২৬",
      "অক্টোবর ২০২৬",
      "নভেম্বর ২০২৬",
      "ডিসেম্বর ২০২৬",
    ]);
    expect(report.incomeTotal).toBe(200);
    expect(report.expenseTotal).toBeNull();
    expect(report.yearlyNet).toBeNull();
  });

  it("moves the window forward at month start, even before that month has data", () => {
    const report = calculateDonationReport(
      summary,
      monthlyReport,
      new Date("2027-01-01T00:00:00+06:00"),
    );

    expect(report.months.map(({ month }) => month)).toEqual([
      "সেপ্টেম্বর ২০২৬",
      "অক্টোবর ২০২৬",
      "নভেম্বর ২০২৬",
      "ডিসেম্বর ২০২৬",
    ]);
    expect(report.incomeTotal).toBe(180);
  });

  it("shows five income months while totaling a full year's recorded costs", () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const yearOfRecords = monthNames.map((name) => ({
      month: `${name} 2026`,
      collected: 100,
      expense: 25,
    }));
    const decemberExpense = {
      id: "dec-1",
      date: "2026-12-10",
      category: "repair" as const,
      description: "Repair",
      payee: "Contractor",
      amount: 50,
    };

    const report = calculateDonationReport(
      summary,
      yearOfRecords,
      new Date("2026-12-15T12:00:00+06:00"),
      [decemberExpense],
    );

    expect(report.months).toHaveLength(5);
    expect(report.incomeTotal).toBe(1200);
    expect(report.expenseTotal).toBe(325);
    expect(report.yearlyNet).toBe(875);
  });
});
