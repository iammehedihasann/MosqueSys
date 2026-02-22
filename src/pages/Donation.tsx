// import { SectionTitle } from '../components/SectionTitle'
import {
  PiggyBank,
  User,
  Lightbulb,
  Building2,
  HandCoins,
  TriangleAlert,
} from "lucide-react";
import { DonationMethodCard } from "../components/DonationMethodCard";
import { DonationSummaryCard } from "../components/DonationSummaryCard";
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import donationData from "../data/donation.json";
import type { DonationMethod, DonationMonthlyRow } from "../types";

const monthlyColumns = [
  { key: "month" as const, header: "মাস / Month" },
  {
    key: "collected" as const,
    header: "সংগৃহীত",
    render: (row: DonationMonthlyRow) =>
      `${row.collected.toLocaleString("en-BD")} ${donationData.summary.currency}`,
  },
  {
    key: "expense" as const,
    header: "ব্যয়",
    render: (row: DonationMonthlyRow) =>
      `${row.expense.toLocaleString("en-BD")} ${donationData.summary.currency}`,
  },
  {
    key: "balance" as const,
    header: "ব্যালেন্স",
    render: (row: DonationMonthlyRow) =>
      `${row.balance.toLocaleString("en-BD")} ${donationData.summary.currency}`,
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  "Monthly Fund": <PiggyBank className="h-7 w-7 text-accent" />,
  "Imam Salary": <User className="h-7 w-7 text-lime-700" />,
  "Electricity Bill": <Lightbulb className="h-7 w-7 text-yellow-400" />,
  Development: <Building2 className="h-7 w-7 text-slate-700" />,
  "Zakat/Fitra": <HandCoins className="h-7 w-7 text-green-500" />,
  "Emergency Fund": <TriangleAlert className="h-7 w-7 text-red-600" />,
};

export function Donation() {
  const methods = donationData.methods as DonationMethod[];
  const categories = donationData.categories;
  const monthlyReport = donationData.monthlyReport as DonationMonthlyRow[];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl text-primary mb-4">দান করুন</h1>
        <p className="text-base md:text-lg text-gray-600 mb-2">Donation</p>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
          "যে ব্যক্তি আল্লাহর পথে ব্যয় করে, তাকে সাতশত গুণ পর্যন্ত বৃদ্ধি করা
          হয়" - সূরা বাকারা (২:২৬১)
        </p>
      </div>

      {/* Section 1: Donation Methods */}
      <section className="mb-12 ">
        <h2 className="mb-2 text-lg font-semibold text-[var(--color-text)]">
          দানের মাধ্যম / Donation Methods
        </h2>
        <p className="mb-4 text-sm text-[var(--color-text-muted)]">
          bKash, Nagad, ব্যাংক বা নগদ—যেকোনো উপায়ে দান করতে পারেন। নম্বর কপি
          করে ব্যবহার করুন।
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
          {methods.map((method) => (
            <DonationMethodCard
              key={method.id}
              method={method}
              className="mt-6 bg-white rounded-lg shadow-sm p-6 border-l-4 border-l-accent"
            />
          ))}
        </div>
        <div className="mt-6 bg-white rounded-lg shadow-lg p-4 border-l-4 border-accent">
          <h3 className="text-xl text-gray-900 mb-4">ব্যাংক তথ্য</h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>ব্যাংক:</strong> সিটি ব্যাংক বাংলাদেশ লিমিটেড
            </p>
            <p>
              <strong>একাউন্ট নাম:</strong> সাগরদী বাইতুল মামুর জামে মসজিদ
            </p>
            <p>
              <strong>একাউন্ট নাম্বার:</strong> ২৩০৪৭৮০৭১৩০০১{" "}
            </p>
            <p>
              <strong>শাখা:</strong> মাদবদী, নরসিংদী
            </p>
          </div>
        </div>
        {/* Cash Donation Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg text-blue-900 mb-2">নগদ দান</h3>
          <p className="text-gray-700">
            সরাসরি মসজিদে এসে দান বক্সে দান করতে পারবেন অথবা কমিটির যেকোনো
            সদস্যের কাছে হস্তান্তর করতে পারবেন। রসিদ নিতে ভুলবেন না।
          </p>
        </div>
      </section>

      {/* Section 2: Donation Categories */}
      <section className="mb-12">
        <h2 className="mb-2 text-2xl font-semibold text-[var(--color-text)]' ">
          দানের খাত <br></br> Donation Categories
        </h2>
        <p className="mb-4 text-sm text-text-muted"></p>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 ">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className=" border-t-2 border-green-600 flex items-center gap-4 rounded-xl   bg-white p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
            >
              <div>
                {categoryIcons[cat.name] || (
                  <PiggyBank className="h-7 w-7 text-accent" />
                )}
              </div>
              <div>
                {cat.nameBn && (
                  <p className="font-medium text-xl text-[var(--color-text)] ">
                    {cat.nameBn}
                  </p>
                )}
                <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                  {cat.name}
                </p>

                {cat.description && (
                  <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
                    {cat.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Monthly Report */}
      <section className="mb-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-text">
              মাসিক রিপোর্ট / Monthly Report
            </h2>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="min-h-11"
            onClick={() => alert("PDF ডাউনলোড ফিচারটি আসছে!")}
          >
            PDF ডাউনলোড
          </Button>
        </div>
        <DonationSummaryCard
          summary={donationData.summary}
          showCta={true}
          className="mb-6 "
        />
        <Table<DonationMonthlyRow>
          columns={monthlyColumns}
          data={monthlyReport}
          keyExtractor={(row) => row.month}
          className="overflow-hidden rounded-xl border-[var(--color-border)]"
        />
      </section>
    </div>
  );
}
