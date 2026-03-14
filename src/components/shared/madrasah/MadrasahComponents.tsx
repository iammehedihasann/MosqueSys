import { Link } from "react-router-dom";
import { Clock, MapPin, Phone } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cn } from "@/utils/cn";
import { images } from "@/assets/image";

export interface StaffMember {
  id: string;
  nameBn: string;
  roleBn: string;
  subjectBn?: string;
  experienceBn?: string;
  phone?: string;
  photo?: string;
}

export interface ActivityEvent {
  id: string;
  titleBn: string;
  dateBn: string;
  descriptionBn: string;
}

interface MadrasahHeaderProps {
  nameBn: string;
  typeBn: string;
  className?: string;
}

export function MadrasahHeader({ nameBn, typeBn, className }: MadrasahHeaderProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <h1 className="text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
        {nameBn}
      </h1>
      <Badge variant="success">{typeBn}</Badge>
    </div>
  );
}

interface DescriptionCardProps {
  text: string;
  className?: string;
}

export function DescriptionCard({ text, className }: DescriptionCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-white p-5",
        className,
      )}
    >
      <SectionTitle title="সংক্ষিপ্ত পরিচিতি" className="mb-3" />
      <div className="max-h-44 overflow-auto text-base text-[var(--color-text-muted)] leading-relaxed">
        {text}
      </div>
    </div>
  );
}

interface ContactCardProps {
  addressBn: string;
  phone?: string;
  mapUrl?: string;
  mapPreviewImage?: string;
  className?: string;
}

export function ContactCard({
  addressBn,
  phone,
  mapUrl,
  mapPreviewImage,
  className,
}: ContactCardProps) {
  const previewKey = mapPreviewImage as keyof typeof images;
  const previewSrc =
    mapPreviewImage && images[previewKey]
      ? images[previewKey]
      : mapPreviewImage;

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-white p-5",
        className,
      )}
    >
      <SectionTitle title="ঠিকানা ও যোগাযোগ" className="mb-3" />
      <p className="flex items-start gap-2 text-base text-[var(--color-text-muted)]">
        <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
        <span>{addressBn}</span>
      </p>
      {previewSrc && (
        <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]">
          <img
            src={previewSrc}
            alt="মানচিত্র"
            className="h-36 w-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {phone && (
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md bg-[var(--color-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)] sm:w-auto"
          >
            যোগাযোগ করুন
          </a>
        )}
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-primary)] hover:bg-[var(--color-bg)] sm:w-auto"
          >
            স্থান দেখুন
          </a>
        )}
        <Link
          to="/contact"
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-md border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-text)] hover:bg-[var(--color-bg)] sm:w-auto"
        >
          যোগাযোগ ফর্ম
        </Link>
      </div>
    </div>
  );
}

interface OperatingHoursCardProps {
  hoursBn: string;
  className?: string;
}

export function OperatingHoursCard({
  hoursBn,
  className,
}: OperatingHoursCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-white p-5",
        className,
      )}
    >
      <SectionTitle title="কার্যসময়" className="mb-3" />
      <p className="flex items-start gap-2 text-base text-[var(--color-text-muted)]">
        <Clock className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
        <span>{hoursBn}</span>
      </p>
    </div>
  );
}

interface CoursesTagsProps {
  courses: string[];
  className?: string;
}

export function CoursesTags({ courses, className }: CoursesTagsProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-white p-5",
        className,
      )}
    >
      <SectionTitle title="বিষয়সমূহ" className="mb-3" />
      <div className="flex gap-2 overflow-x-auto pb-2">
        {courses.map((course) => (
          <span
            key={course}
            className="whitespace-nowrap rounded-full border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1 text-sm text-[var(--color-text)]"
          >
            {course}
          </span>
        ))}
      </div>
    </div>
  );
}

interface StaffCardProps {
  staff: StaffMember[];
  className?: string;
}

export function StaffCard({ staff, className }: StaffCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-white p-5",
        className,
      )}
    >
      <SectionTitle title="শিক্ষক ও স্টাফ" className="mb-4" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {staff.map((member) => {
          const photoKey = member.photo as keyof typeof images;
          const photoSrc =
            member.photo && images[photoKey]
              ? images[photoKey]
              : member.photo;

          return (
            <div
              key={member.id}
              className="flex items-start gap-3 rounded-xl  bg-[var(--color-bg)] p-3"
            >
              <div className="h-12 w-12 overflow-hidden rounded-full border border-[var(--color-border)] bg-white">
                {photoSrc ? (
                  <img
                    src={photoSrc}
                    alt={member.nameBn}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-[var(--color-text-muted)]">
                    ছবি
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {member.nameBn}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  ভূমিকা: {member.roleBn}
                </p>
                {member.subjectBn && (
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    বিষয়: {member.subjectBn}
                  </p>
                )}
                {member.experienceBn && (
                  <p className="mt-1 text-xs text-[var(--color-text-muted)]">
                    অভিজ্ঞতা: {member.experienceBn}
                  </p>
                )}
                {member.phone && (
                  <a
                    href={`tel:${member.phone.replace(/\s/g, "")}`}
                    className="mt-1 inline-flex items-center gap-1 text-xs text-[var(--color-primary)] hover:underline"
                  >
                    <Phone className="h-3 w-3" /> {member.phone}
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface FacilitiesCardProps {
  facilities: string[];
  className?: string;
}

export function FacilitiesCard({
  facilities,
  className,
}: FacilitiesCardProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-slate-100 bg-white p-6 shadow-sm ring-1 ring-slate-900/5 transition-shadow hover:shadow-md",
        className,
      )}
    >
      <SectionTitle
        title="সুবিধাসমূহ"
        className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800"
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((facility) => (
          <div
            key={facility}
            className="group flex items-center gap-3 rounded-2xl border border-transparent bg-slate-50/50 px-4 py-3 text-sm font-medium text-slate-700 transition-all hover:border-emerald-100 hover:bg-emerald-50/30 hover:text-emerald-900"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200 group-hover:bg-emerald-500 group-hover:ring-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 transition-colors group-hover:bg-white" />
            </span>
            <span className="leading-tight">{facility}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

interface PhotoGalleryProps {
  imagesList: string[];
  className?: string;
}

export function PhotoGallery({ imagesList, className }: PhotoGalleryProps) {
  const resolvedImages = imagesList.map((img) => {
    const key = img as keyof typeof images;
    return images[key] ?? img;
  });

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-white p-5",
        className,
      )}
    >
      <SectionTitle title="ছবির গ্যালারি" className="mb-4" />
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
        {resolvedImages.map((img, index) => (
          <div
            key={`${img}-${index}`}
            className="min-w-[180px] sm:min-w-[220px] snap-start overflow-hidden rounded-xl border border-[var(--color-border)] bg-white"
          >
            <img
              src={img}
              alt="মাদরাসা ছবি"
              className="h-40 w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface EventsCardProps {
  events: ActivityEvent[];
  className?: string;
}

export function EventsCard({ events, className }: EventsCardProps) {
  const visibleEvents = events.slice(0, 4);
  const extraCount = events.length - visibleEvents.length;

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--color-border)] bg-white p-5",
        className,
      )}
    >
      <SectionTitle title="অনুষ্ঠান ও কার্যক্রম" className="mb-4" />
      <div className="space-y-3">
        {visibleEvents.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-3"
          >
            <p className="text-sm font-semibold text-[var(--color-text)]">
              {event.titleBn}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {event.dateBn}
            </p>
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {event.descriptionBn}
            </p>
          </div>
        ))}
      </div>
      {extraCount > 0 && (
        <p className="mt-3 text-xs text-[var(--color-text-muted)]">
          আরও {extraCount}টি অনুষ্ঠান রয়েছে।
        </p>
      )}
    </div>
  );
}

