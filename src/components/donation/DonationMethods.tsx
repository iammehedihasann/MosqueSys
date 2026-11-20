// src/components/donation/DonationMethods.tsx
import { DonationPaymentCard } from "./DonationPaymentCard";
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
      <div className="donation-payment-grid">
        {methods.map((method) => (
          <DonationPaymentCard
            key={method.id}
            method={method}
          />
        ))}
      </div>
      <div className="donation-bank-grid">
        <BankInfoCard />
        <CashDonationNote />
      </div>
    </div>
  );
}
