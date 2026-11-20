import { HeartHandshake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import data from "@/data/charityCampaigns.json";
export function DonationCampaignPanel() {
  const campaign = data.campaigns[0];
  const percent = campaign.goalAmount > 0 ? Math.max(0, Math.min(100, campaign.raisedAmount / campaign.goalAmount * 100)) : 0;
  const money = (value: number) => value.toLocaleString("bn-BD");
  return <section className="donation-panel donation-campaign">
    <h2><HeartHandshake />সেবামূলক কার্যক্রম</h2>
    <h3>{campaign.titleBn}</h3>
    <p className="donation-caption">সংরক্ষিত ক্যাম্পেইনের তথ্য</p>
    <div className="donation-progress-row"><progress value={percent} max={100} aria-label="সংগৃহীত অনুদানের শতাংশ" /><strong>{money(Math.round(percent))}% সম্পন্ন</strong></div>
    <div className="donation-campaign-amounts"><span>প্রয়োজন: ৳ {money(campaign.goalAmount)}</span><span>সংগৃহীত: ৳ {money(campaign.raisedAmount)}</span></div>
    <Link className="donation-action" to={`/charity/${campaign.id}`}>বিস্তারিত ও সহযোগিতা <ArrowRight size={14} /></Link>
  </section>;
}
