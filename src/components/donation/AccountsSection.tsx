import { SectionTitle } from "@/components/ui/SectionTitle";
import { MonthlyReport } from "@/components/donation/MonthlyReport";
import type { calculateDonationReport } from "@/utils/donationReport";

interface Props {
  report: ReturnType<typeof calculateDonationReport>;
  currency: string;
}

export function AccountsSection({ report, currency }: Props) {
  return (
    <div>
      <SectionTitle
        title="মাসিক আয়-ব্যয়ের রিপোর্ট"
        subtitle="মসজিদের মাসিক আয়, ব্যয় ও ব্যালেন্সের হিসাব।"
      />
      <div className="mt-6">
        <MonthlyReport report={report} currency={currency} />
      </div>
    </div>
  );
}
