// src/pages/Donation.tsx
import { useSearchParams } from "react-router-dom";
import donationData from "@/data/donation.json";
import type { DonationMethod } from "@/types";
import { calculateDonationReport } from "@/utils/donationReport";
import { loadExpenses } from "@/utils/expenses";
import { scrollToSection } from "@/utils/scroll";
import { DonationHero } from "@/components/donation/DonationHero";
import { SectionNav, type NavItem } from "@/components/donation/SectionNav";
import { DonationMethods } from "@/components/donation/DonationMethods";
import { DonationCategories } from "@/components/donation/DonationCategories";
import {
  AccountsSection,
  type AccountsTab,
} from "@/components/donation/AccountsSection";
import { GiveCtaBand } from "@/components/donation/GiveCtaBand";

const currency = donationData.summary.currency.trim();

const NAV_ITEMS: NavItem[] = [
  { id: "give", label: "দান করুন" },
  { id: "categories", label: "দানের খাত" },
  { id: "accounts", label: "আয়-ব্যয়ের হিসাব" },
];

export function Donation() {
  const [params, setParams] = useSearchParams();
  const methods = donationData.methods as DonationMethod[];
  const report = calculateDonationReport(
    donationData.summary,
    donationData.monthlyReport,
    new Date(),
    loadExpenses(),
  );

  // The tab lives in the URL (?tab=expense) so links can be shared.
  const tab: AccountsTab = params.get("tab") === "expense" ? "expense" : "report";
  const changeTab = (next: AccountsTab) =>
    setParams(
      (prev) => {
        const p = new URLSearchParams(prev);
        p.set("tab", next);
        return p;
      },
      { replace: true },
    );
  const openAccounts = (next: AccountsTab) => {
    changeTab(next);
    requestAnimationFrame(() => scrollToSection("accounts"));
  };
  const goGive = () => scrollToSection("give");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <DonationHero onGive={goGive} onOpenAccounts={openAccounts} />
      <SectionNav items={NAV_ITEMS} />

      <div className="space-y-14">
        <section id="give" className="scroll-mt-20">
          <DonationMethods methods={methods} />
        </section>

        <section id="categories" className="scroll-mt-20">
          <DonationCategories categories={donationData.categories} />
        </section>

        <section id="accounts" className="scroll-mt-20">
          <AccountsSection
            tab={tab}
            onTabChange={changeTab}
            report={report}
            currency={currency}
          />
        </section>

        <GiveCtaBand onGive={goGive} />
      </div>
    </div>
  );
}
