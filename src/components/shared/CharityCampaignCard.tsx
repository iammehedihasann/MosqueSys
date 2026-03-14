import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import type { CharityCampaign } from "@/types";

interface CharityCampaignCardProps {
  campaign: CharityCampaign;
  detailPath?: string;
  className?: string;
}

const toBnDigits = (value: number | string) => {
  const map = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return value
    .toString()
    .replace(/\d/g, (digit) => map[Number(digit)]);
};

export function CharityCampaignCard({
  campaign,
  detailPath,
  className,
}: CharityCampaignCardProps) {
  const progress = Math.min(
    100,
    Math.round((campaign.raisedAmount / campaign.goalAmount) * 100),
  );

  return (
    <article
      className={cn(
        "rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            {campaign.titleBn}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            {campaign.descriptionBn}
          </p>
        </div>
        <Badge variant="success">চলমান</Badge>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <span>
            উঠেছে: {campaign.currency}
            {toBnDigits(campaign.raisedAmount)}
          </span>
          <span>
            লক্ষ্য: {campaign.currency}
            {toBnDigits(campaign.goalAmount)}
          </span>
        </div>
        <div className="mt-2 h-2 w-full rounded-full bg-[var(--color-bg)]">
          <div
            className="h-2 rounded-full bg-[var(--color-primary)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-[var(--color-text-muted)]">
          অগ্রগতি: {toBnDigits(progress)}%
        </p>
      </div>

      {detailPath && (
        <div className="mt-4">
          <Link
            to={detailPath}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-bg)]"
          >
            বিস্তারিত দেখুন
          </Link>
        </div>
      )}
    </article>
  );
}

