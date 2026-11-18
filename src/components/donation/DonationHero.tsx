// src/components/donation/DonationHero.tsx
import { ChevronDown, ClipboardList, HandCoins, Receipt } from "lucide-react";
import type { AccountsTab } from "./AccountsSection";

interface Props {
  onGive: () => void;
  onOpenAccounts: (tab: AccountsTab) => void;
}

const ring =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";
const pill = `inline-flex min-h-11 items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-100 ${ring}`;

export function DonationHero({ onGive, onOpenAccounts }: Props) {
  return (
    <header className="mb-8 text-center md:mb-10">
      <h1 className="mb-4 text-3xl text-primary md:text-4xl">দান করুন</h1>

      <figure className="mx-auto max-w-2xl rounded-2xl border border-emerald-100 bg-emerald-50/60 px-5 py-4">
        <blockquote className="text-lg text-gray-700 sm:text-xl">
          “যে ব্যক্তি আল্লাহর পথে ব্যয় করে, তাকে সাতশত গুণ পর্যন্ত বৃদ্ধি করা হয়”
        </blockquote>
        <figcaption className="mt-2 text-sm font-medium text-emerald-800">
          — সূরা বাকারা (২:২৬১)
        </figcaption>
      </figure>

      {/* Two clear paths: give money / see where it went */}
      <div className="mx-auto mt-6 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
        <button
          type="button"
          onClick={onGive}
          className={`group flex items-center gap-4 rounded-2xl bg-emerald-700 p-5 text-white shadow-[var(--shadow-card)] transition-colors hover:bg-emerald-800 ${ring}`}
        >
          <span
            aria-hidden="true"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15"
          >
            <HandCoins className="h-6 w-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-xl font-bold">দান করতে চাই</span>
            <span className="mt-0.5 block text-sm text-emerald-100">
              bKash, Nagad, ব্যাংক বা নগদে
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className="h-5 w-5 shrink-0 transition-transform group-hover:translate-y-0.5"
          />
        </button>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-700"
            >
              <Receipt className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-xl font-bold text-gray-900">
                টাকা কোথায় খরচ হলো?
              </p>
              <p className="mt-0.5 text-sm text-gray-600">
                আয়-ব্যয়ের হিসাব দেখুন
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={pill}
              onClick={() => onOpenAccounts("expense")}
            >
              <Receipt aria-hidden="true" className="h-4 w-4" />
              খরচের বিবরণ
            </button>
            <button
              type="button"
              className={pill}
              onClick={() => onOpenAccounts("report")}
            >
              <ClipboardList aria-hidden="true" className="h-4 w-4" />
              মাসিক রিপোর্ট
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
