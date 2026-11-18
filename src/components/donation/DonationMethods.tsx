// src/components/donation/DonationMethods.tsx
import { DonationMethodCard } from "@/components/shared/DonationMethodCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import type { DonationMethod } from "@/types";
import { BankInfoCard } from "./BankInfoCard";
import { CashDonationNote } from "./CashDonationNote";

export function DonationMethods({ methods }: { methods: DonationMethod[] }) {
  return (
    <div id="donation-methods" className="scroll-mt-24">
      <SectionTitle
        title="দানের মাধ্যম"
        subtitle="bKash, Nagad, ব্যাংক বা নগদ—যেকোনো উপায়ে দান করতে পারেন। নম্বর কপি করে ব্যবহার করুন।"
      />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {methods.map((method) => (
          <DonationMethodCard
            key={method.id}
            method={method}
            className="h-full rounded-lg border-l-4 border-l-accent bg-white p-6 shadow-sm"
          />
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BankInfoCard />
        <CashDonationNote />
      </div>
    </div>
  );
}
