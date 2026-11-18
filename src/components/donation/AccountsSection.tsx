// src/components/donation/AccountsSection.tsx
import type { KeyboardEvent } from "react";
import { ClipboardList, Receipt, type LucideIcon } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ExpenseSection } from "@/components/donation/ExpenseSection";
import { MonthlyReport } from "@/components/donation/MonthlyReport";
import type { calculateDonationReport } from "@/utils/donationReport";

export type AccountsTab = "report" | "expense";

interface Props {
  tab: AccountsTab;
  onTabChange: (tab: AccountsTab) => void;
  report: ReturnType<typeof calculateDonationReport>;
  currency: string;
}

const TABS: { id: AccountsTab; label: string; Icon: LucideIcon }[] = [
  { id: "report", label: "মাসিক রিপোর্ট", Icon: ClipboardList },
  { id: "expense", label: "খরচের বিবরণ", Icon: Receipt },
];

export function AccountsSection({ tab, onTabChange, report, currency }: Props) {
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const i = TABS.findIndex((t) => t.id === tab);
    const step = e.key === "ArrowRight" ? 1 : TABS.length - 1;
    const next = TABS[(i + step) % TABS.length].id;
    onTabChange(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <div>
      <SectionTitle
        title="আয়-ব্যয়ের হিসাব"
        subtitle="দানের টাকা কোথা থেকে এলো আর কোথায় খরচ হলো—সব হিসাব এখানে।"
      />

      <div
        role="tablist"
        aria-label="হিসাবের ধরন"
        className="mt-6 flex w-full gap-1 rounded-2xl bg-gray-100 p-1 sm:inline-flex sm:w-auto"
      >
        {TABS.map(({ id, label, Icon }) => {
          const on = tab === id;
          return (
            <button
              key={id}
              id={`tab-${id}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`panel-${id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => onTabChange(id)}
              onKeyDown={onKeyDown}
              className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:flex-none sm:text-base ${
                on
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="mt-6"
      >
        {tab === "report" ? (
          <MonthlyReport report={report} currency={currency} />
        ) : (
          <ExpenseSection />
        )}
      </div>
    </div>
  );
}
