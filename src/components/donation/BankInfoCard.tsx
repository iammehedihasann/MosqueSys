// src/components/donation/BankInfoCard.tsx
import { Building2 } from "lucide-react";

/* Move these into donation.json later if the details change often. */
const BANK_INFO = [
  ["ব্যাংক", "সিটি ব্যাংক বাংলাদেশ লিমিটেড"],
  ["একাউন্ট নাম", "সাগরদী বাইতুল মামুর জামে মসজিদ"],
  ["একাউন্ট নাম্বার", "২৩০৪৭৮০৭****"],
  ["শাখা", "মাদবদী, নরসিংদী"],
] as const;

export function BankInfoCard({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="bank-info-heading"
      className={`rounded-lg border-l-4 border-accent bg-white p-5 shadow-[var(--shadow-card)] ${className}`}
    >
      <h3
        id="bank-info-heading"
        className="mb-4 flex items-center gap-2 text-xl text-gray-900"
      >
        <Building2 aria-hidden="true" className="h-6 w-6 text-accent" />
        ব্যাংক তথ্য
      </h3>
      <dl className="space-y-3 text-gray-700">
        {BANK_INFO.map(([label, value]) => (
          <div
            key={label}
            className="flex flex-wrap gap-x-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0"
          >
            <dt className="font-semibold">{label}:</dt>
            <dd className="break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
