import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { images } from "@/assets/image";
import { cn } from "@/utils/cn";
import type { Event } from "@/types";

interface EventCardProps {
  event: Event;
  detailPath?: string;
  className?: string;
}

export function EventCard({ event, detailPath, className }: EventCardProps) {
  const imageKey = event.image as keyof typeof images;
  const imageSrc =
    event.image && images[imageKey] ? images[imageKey] : event.image;

  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]",
        className,
      )}
    >
      {imageSrc && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <img
            src={imageSrc}
            alt={event.name}
            className="h-40 w-full object-cover"
          />
        </div>
      )}
      <h3 className="font-semibold text-[var(--color-text)]">{event.name}</h3>
      {event.nameBn && (
        <p className="mt-0.5 text-sm text-[var(--color-text-muted)]">
          {event.nameBn}
        </p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {event.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {event.time}
        </span>
      </div>
      {event.location && (
        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          {event.location}
        </p>
      )}
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
    </div>
  );
}

