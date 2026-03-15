import { Link } from "react-router-dom";
import type { CommunityPlace } from "../types";
import type { ActivityEvent } from "../components/madrasah/MadrasahComponents";

import {
  ContactCard,
  CoursesTags,
  DescriptionCard,
  EventsCard,
  FacilitiesCard,
  // MadrasahHeader,
  OperatingHoursCard,
  PhotoGallery,
  StaffCard,
} from "../components/madrasah/MadrasahComponents";

import { MadrasahHero } from "../components/madrasah/MadrasahHero";
import { MadrasahStats } from "../components/madrasah/MadrasahStats";
import { DepartmentsSection } from "../components/madrasah/DepartmentsSection";
import { DonationDetailsSection } from "../components/madrasah/DonationDetailsSection";
import { LocationMap } from "../components/madrasah/LocationMap";
import { EducationSystemSection } from "../components/madrasah/EducationSystemSection";
import { NoticeBoard } from "../components/madrasah/NoticeBoard";
import { TestimonialsSection } from "../components/madrasah/TestimonialsSection";

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
    <div className="min-h-screen bg-slate-50 text-slate-800 py-6 md:py-10 selection:bg-emerald-100 selection:text-emerald-900 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 1. Light Glassmorphism Back Navigation */}
        <div className="sticky top-16 z-40 mb-6 flex items-center justify-between rounded-2xl bg-white/90 px-5 py-3 shadow-sm ring-1 ring-slate-200 backdrop-blur-md transition-all">
          <Link
            to="/community"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-50 hover:text-emerald-800"
          >
            ← পূর্ববর্তী পৃষ্ঠা
          </Link>
          <p className="hidden text-sm font-medium text-slate-500 sm:block">
            আধুনিক ইসলামিক শিক্ষার তথ্যসমৃদ্ধ প্রোফাইল
          </p>
        </div>

        {/* 2. Hero Section - Seamless Integration */}
        <section className="relative z-0 mb-8 overflow-hidden rounded-[2.5rem] bg-white shadow-sm ring-1 ring-slate-100">
          <MadrasahHero
            name={place.nameBn ?? place.name}
            images={place.images}
          />
        </section>

        {/* 3. Info Header - Floating White Card Layout */}
        {/* <header className="relative z-10 -mt-16 sm:-mt-20 mx-4 sm:mx-8 mb-10 grid grid-cols-1 gap-4 md:grid-cols-12 rounded-[2rem] bg-white p-4 sm:p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100">
          <div className="md:col-span-5 lg:col-span-6 flex flex-col justify-center border-b border-slate-100 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-6">
            <MadrasahHeader
              nameBn={place.nameBn ?? place.name}
              typeBn={place.typeBn ?? "মাদরাসা"}
            />
          </div>
          
          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3 md:pl-4">
            <div className="rounded-2xl bg-slate-50 p-4 flex flex-col justify-center transition-colors hover:bg-emerald-50/50">
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                ধরন
              </p>
              <p className="font-semibold text-sm text-slate-800">
                {place.category === "madrasa" ? "মাদরাসা" : place.category}
              </p>
            </div>

            {place.hoursBn && (
              <div className="rounded-2xl bg-slate-50 p-4 flex flex-col justify-center transition-colors hover:bg-emerald-50/50">
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                  সময়সূচি
                </p>
                <p className="font-semibold text-sm text-slate-800 line-clamp-2">{place.hoursBn}</p>
              </div>
            )}

            {place.contact && (
              <div className="col-span-2 sm:col-span-1 rounded-2xl bg-slate-50 p-4 flex flex-col justify-center transition-colors hover:bg-emerald-50/50">
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-emerald-600 mb-1">
                  যোগাযোগ
                </p>
                <p className="font-semibold text-sm text-slate-800">{place.contact}</p>
              </div>
            )}
          </div>
        </header> */}

        {/* 4. Statistics & Departments */}
        <section className="mb-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div className="h-full rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
             <MadrasahStats />
          </div>
          <div className="h-full rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
             <DepartmentsSection />
          </div>
        </section>

        {/* 5. Main Layout Split (Main Content + Sticky Sidebar) */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          
          {/* MAIN CONTENT AREA (Spans 8 columns) */}
          <main className="flex flex-col gap-6 lg:col-span-8">
            {place.descriptionBn && (
              <section className="scroll-mt-24 rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
                <DescriptionCard text={place.descriptionBn} />
              </section>
            )}

            {place.facilitiesBn && place.facilitiesBn.length > 0 && (
              <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
                <FacilitiesCard facilities={place.facilitiesBn} />
              </section>
            )}

            <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
              <EducationSystemSection />
            </section>

            {staffMembers.length > 0 && (
              <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
                <StaffCard staff={staffMembers} />
              </section>
            )}

            {place.images && place.images.length > 0 && (
              <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
                <PhotoGallery imagesList={place.images} />
              </section>
            )}

            {events.length > 0 && (
              <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
                <EventsCard events={events} />
              </section>
            )}

            <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
              <NoticeBoard />
            </section>

            <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
              <TestimonialsSection />
            </section>

            {/* Donation Section */}
            <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100 pb-2">
              <DonationDetailsSection />
            </section>
          </main>

          {/* SIDEBAR AREA (Spans 4 columns) - Made Sticky */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6 pb-10 h-fit">
            <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
              <ContactCard
                addressBn={place.addressBn}
                phone={place.contact}
                mapUrl={place.mapUrl}
                mapPreviewImage={place.mapPreviewImage}
              />
            </section>

            <section className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100">
              <LocationMap mapUrl={place.mapUrl} />
            </section>

            {place.hoursBn && (
              <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
                <OperatingHoursCard hoursBn={place.hoursBn} />
              </section>
            )}

            {courses.length > 0 && (
              <section className="rounded-3xl bg-white p-1 shadow-sm ring-1 ring-slate-100">
                <CoursesTags courses={courses} />
              </section>
            )}
          </aside>
          
        </div>
      </div>
    </div>
  );
}