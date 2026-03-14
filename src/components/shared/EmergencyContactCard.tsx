import {
  AlertTriangle,
  Bolt,
  Droplet,
  Flame,
  Heart,
  Phone,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import type { EmergencyContact, EmergencyServiceType } from "@/types";

interface EmergencyContactCardProps {
  contact: EmergencyContact;
  detailPath?: string;
  className?: string;
}

const typeMeta: Record<
  EmergencyServiceType,
  {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    tone: string;
    badge: "emergency" | "general" | "success";
  }
> = {
  police: {
    label: "পুলিশ",
    icon: Shield,
    tone: "bg-indigo-50 text-indigo-700 border-indigo-100",
    badge: "emergency",
  },
  hospital: {
    label: "চিকিৎসা",
    icon: Heart,
    tone: "bg-rose-50 text-rose-700 border-rose-100",
    badge: "emergency",
  },
  fire: {
    label: "ফায়ার সার্ভিস",
    icon: Flame,
    tone: "bg-orange-50 text-orange-700 border-orange-100",
    badge: "emergency",
  },
  ambulance: {
    label: "অ্যাম্বুলেন্স",
    icon: Phone,
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100",
    badge: "emergency",
  },
  blood: {
    label: "রক্ত সহায়তা",
    icon: Droplet,
    tone: "bg-red-50 text-red-700 border-red-100",
    badge: "general",
  },
  electricity: {
    label: "বিদ্যুৎ",
    icon: Bolt,
    tone: "bg-yellow-50 text-yellow-700 border-yellow-100",
    badge: "general",
  },
  disaster: {
    label: "জরুরি সেবা",
    icon: AlertTriangle,
    tone: "bg-slate-50 text-slate-700 border-slate-100",
    badge: "emergency",
  },
  women: {
    label: "নারী সহায়তা",
    icon: Shield,
    tone: "bg-pink-50 text-pink-700 border-pink-100",
    badge: "emergency",
  },
};

export function EmergencyContactCard({
  contact,
  detailPath,
  className,
}: EmergencyContactCardProps) {
  const meta = typeMeta[contact.serviceType];
  const Icon = meta?.icon ?? Phone;
  const phones = [contact.phone, ...(contact.alternatePhones ?? [])].filter(
    Boolean,
  );

  return (
    <article
      className={cn(
        "rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl border",
            meta?.tone,
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-[var(--color-text)]">
              {contact.nameBn}
            </h3>
            {meta && <Badge variant={meta.badge}>{meta.label}</Badge>}
          </div>
          {contact.noteBn && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {contact.noteBn}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
        {contact.locationBn && <p>স্থান: {contact.locationBn}</p>}
        {contact.availabilityBn && <p>সময়: {contact.availabilityBn}</p>}
        {phones.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 text-xs text-[var(--color-primary)] hover:bg-white"
              >
                {phone}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {detailPath && (
          <Link
            to={detailPath}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-bg)]"
          >
            বিস্তারিত দেখুন
          </Link>
        )}
        {phones[0] && (
          <a
            href={`tel:${phones[0].replace(/\s/g, "")}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[var(--color-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
          >
            এখনই কল করুন
          </a>
        )}
      </div>
    </article>
  );
}

