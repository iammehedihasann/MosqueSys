// src/components/donation/CashDonationNote.tsx
import { Banknote } from "lucide-react";

export function CashDonationNote({ className = "" }: { className?: string }) {
  return (
    <section
      aria-labelledby="cash-donation-heading"
      className={`rounded-lg border border-blue-200 bg-blue-50 p-5 ${className}`}
    >
      <h3
        id="cash-donation-heading"
        className="mb-2 flex items-center gap-2 text-2xl text-blue-900"
      >
        <Banknote aria-hidden="true" className="h-6 w-6" />
        নগদ দান
      </h3>
      <p className="text-lg text-gray-700">
        সরাসরি মসজিদে এসে দান বক্সে দান করতে পারবেন অথবা কমিটির যেকোনো সদস্যের
        কাছে হস্তান্তর করতে পারবেন।{" "}
        <span className="text-xl font-bold text-green-900">
          রসিদ নিতে ভুলবেন না।
        </span>
      </p>
    </section>
  );
}
