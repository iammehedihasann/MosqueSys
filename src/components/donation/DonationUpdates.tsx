import { Megaphone, ArrowRight, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import notices from "@/data/notices.json";
import donation from "@/data/donation.json";
import {
  applyDonationCollectionOverrides,
  donationsUpdatedEvent,
} from "@/utils/donationCollections";
import type { DonationMonthlyRow } from "@/types";
export function DonationUpdates() {
  const [monthlyReport, setMonthlyReport] = useState<DonationMonthlyRow[]>(() =>
    applyDonationCollectionOverrides(donation.monthlyReport),
  );
  useEffect(() => {
    const refreshCollections = () =>
      setMonthlyReport(applyDonationCollectionOverrides(donation.monthlyReport));
    window.addEventListener(donationsUpdatedEvent, refreshCollections);
    return () =>
      window.removeEventListener(donationsUpdatedEvent, refreshCollections);
  }, []);
  return <div className="donation-updates">
    <section className="donation-panel"><div className="donation-panel-heading"><h2><FileText />সাম্প্রতিক দানের হিসাব</h2><Link to="/monthly-report">সব দেখুন →</Link></div>
      <ul className="donation-report-list">{monthlyReport.slice(0, 3).map(row => <li key={row.month}><span>{row.month}</span><strong>৳ {Number(row.collected).toLocaleString("bn-BD")}</strong><Link to="/monthly-report" aria-label={`${row.month} এর রিপোর্ট দেখুন`}><ArrowRight size={16} /></Link></li>)}</ul>
    </section>
    <section className="donation-panel"><div className="donation-panel-heading"><h2><Megaphone />ঘোষণা ও আপডেট</h2><Link to="/notices">সব দেখুন →</Link></div>
      <div className="donation-notices">{notices.notices.slice(0, 2).map(notice => <Link to="/notices" key={notice.title}><Megaphone size={20} /><span><strong>{notice.title}</strong><small>{notice.date} · বিস্তারিত দেখুন →</small></span></Link>)}</div>
    </section>
  </div>;
}
