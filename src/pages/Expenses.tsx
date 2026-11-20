import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ExpenseSection } from "@/components/donation/ExpenseSection";

export function Expenses() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900 sm:text-4xl">
            খরচের হিসাব
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            খরচ যোগ, সম্পাদনা ও মাসভিত্তিক হিসাব দেখুন।
          </p>
        </div>
        <Link
          to="/donation"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          দান ও মাসিক রিপোর্ট
        </Link>
      </header>
      <ExpenseSection />
    </main>
  );
}
