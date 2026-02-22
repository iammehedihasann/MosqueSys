import { Badge } from "./Badge";
import { cn } from "../utils/cn";
import type { CommitteeMember } from "../types";
import { images } from "../assets/image";
interface ProfileCardProps {
  member: CommitteeMember;
  className?: string;
}

export function ProfileCard({ member, className }: ProfileCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] text-center transition-shadow hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-2xl font-bold text-[var(--color-primary)]">
        <img
          src={images.anamul}
          alt={member.name}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {member.isChairman && <Badge variant="success">সভাপতি</Badge>}
        {member.isSecretary && <Badge variant="default">সাধারণ সম্পাদক</Badge>}
      </div>
      <h3 className="mt-2 font-semibold text-[var(--color-text)]">
        {member.name}
      </h3>
      <p className="text-sm text-[var(--color-text-muted)]">
        {member.designation}
      </p>
      {member.phone && (
        <a
          href={`tel:${member.phone}`}
          className="mt-2 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded"
        >
          {member.phone}
        </a>
      )}
    </div>
  );
}
