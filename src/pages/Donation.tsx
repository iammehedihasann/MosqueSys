// src/pages/Donation.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import donationData from "@/data/donation.json";
import type { DonationMethod } from "@/types";
import { scrollToSection } from "@/utils/scroll";
import { DonationHero } from "@/components/donation/DonationHero";
import { DonationNavigation } from "@/components/donation/DonationNavigation";
import { DonationMethods } from "@/components/donation/DonationMethods";
import { DonationCategories } from "@/components/donation/DonationCategories";
import { DonationPrayerPanel } from "@/components/donation/DonationPrayerPanel";
import { DonationCampaignPanel } from "@/components/donation/DonationCampaignPanel";
import { DonationUpdates } from "@/components/donation/DonationUpdates";
import "@/components/donation/donationPage.css";

export function Donation() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const methods = donationData.methods as DonationMethod[];

  useEffect(() => {
    const tab = params.get("tab");
    if (tab !== "expense" && tab !== "report") return;
    const nextParams = new URLSearchParams(params);
    nextParams.delete("tab");
    const query = nextParams.toString();
    const destination = tab === "expense" ? "/expenses" : "/monthly-report";
    navigate(`${destination}${query ? `?${query}` : ""}`, { replace: true });
  }, [navigate, params]);

  const goGive = () => scrollToSection("give");

  return (
    <div className="donation-page">
      <DonationHero onGive={goGive} />
      <div className="donation-container">
      <DonationNavigation />
      <div className="donation-main-grid">
        <section id="give" className="donation-panel scroll-mt-24">
          <DonationMethods methods={methods} />
        </section>
        <aside className="donation-sidebar"><DonationPrayerPanel /><DonationCampaignPanel /></aside>
      </div>
        <section id="categories" className="donation-panel donation-categories scroll-mt-24">
          <DonationCategories categories={donationData.categories} />
        </section>
        <DonationUpdates />
      </div>
    </div>
  );
}
