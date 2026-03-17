import { Link } from "react-router-dom";
import type { CommunityPlace } from "@/types";
import type { ActivityEvent } from "@/components/shared/madrasah/MadrasahComponents";
import {
  ContactCard,
  CoursesTags,
  DescriptionCard,
  EventsCard,
  FacilitiesCard,
  OperatingHoursCard,
  PhotoGallery,
  StaffCard,
} from "@/components/shared/madrasah/MadrasahComponents";
import { DepartmentsSection } from "@/components/shared/madrasah/DepartmentsSection";
import { DonationDetailsSection } from "@/components/shared/madrasah/DonationDetailsSection";
import { EducationSystemSection } from "@/components/shared/madrasah/EducationSystemSection";
import { LocationMap } from "@/components/shared/madrasah/LocationMap";
import { MadrasahHero } from "@/components/shared/madrasah/MadrasahHero";
import { MadrasahStats } from "@/components/shared/madrasah/MadrasahStats";
import { NoticeBoard } from "@/components/shared/madrasah/NoticeBoard";
import { TestimonialsSection } from "@/components/shared/madrasah/TestimonialsSection";

interface MadrasahDetailsProps {
  place: CommunityPlace;
}

export function MadrasahDetails({ place }: MadrasahDetailsProps) {
  const courses = place.coursesBn ?? [];
  const staffMembers = (place.staff ?? []) as Parameters<
    typeof StaffCard
  >[0]["staff"];
  const events = (place.eventsBn ?? []) as ActivityEvent[];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-6 md:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="sticky top-16 z-40 mb-6 flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-white/90 px-5 py-3 backdrop-blur">
          <Link
            to="/community"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-bg)] px-4 py-2 text-sm font-semibold text-[var(--color-primary)] hover:bg-white"
          >
            ← পূর্ববর্তী পৃষ্ঠা
          </Link>
          <p className="hidden text-sm font-medium text-[var(--color-text-muted)] sm:block">
            আধুনিক ইসলামিক শিক্ষা প্রতিষ্ঠানের প্রোফাইল
          </p>
        </div>

        <section className="mb-8">
          <MadrasahHero name={place.nameBn ?? place.name} images={place.images} />
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
            <MadrasahStats />
          </div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
            <DepartmentsSection />
          </div>
        </section>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <main className="flex flex-col gap-6 lg:col-span-8">
            {place.descriptionBn && (
              <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
                <DescriptionCard text={place.descriptionBn} />
              </section>
            )}

            {place.facilitiesBn && place.facilitiesBn.length > 0 && (
              <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
                <FacilitiesCard facilities={place.facilitiesBn} />
              </section>
            )}

            <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
              <EducationSystemSection />
            </section>

            {staffMembers.length > 0 && (
              <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
                <StaffCard staff={staffMembers} />
              </section>
            )}

            {place.images && place.images.length > 0 && (
              <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
                <PhotoGallery imagesList={place.images} />
              </section>
            )}

            {events.length > 0 && (
              <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
                <EventsCard events={events} />
              </section>
            )}

            <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
              <NoticeBoard />
            </section>

            <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
              <TestimonialsSection />
            </section>

            <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
              <DonationDetailsSection />
            </section>
          </main>

          <aside className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6 pb-10">
            <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
              <ContactCard
                addressBn={place.addressBn}
                phone={place.contact}
                email={place.email}
                mapUrl={place.mapUrl}
                mapPreviewImage={place.mapPreviewImage}
              />
            </section>

            <section className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white">
              <LocationMap mapUrl={place.mapUrl} />
            </section>

            {place.hoursBn && (
              <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
                <OperatingHoursCard hoursBn={place.hoursBn} />
              </section>
            )}

            {courses.length > 0 && (
              <section className="rounded-3xl border border-[var(--color-border)] bg-white p-4">
                <CoursesTags courses={courses} />
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

