import { Link } from 'react-router-dom'
import type { CommunityPlace } from '../types'
import type { ActivityEvent } from '../components/madrasah/MadrasahComponents'
import {
  ContactCard,
  CoursesTags,
  DescriptionCard,
  EventsCard,
  FacilitiesCard,
  MadrasahHeader,
  OperatingHoursCard,
  PhotoGallery,
  StaffCard
} from '../components/madrasah/MadrasahComponents'

interface MadrasahDetailsProps {
  place: CommunityPlace
}

export function MadrasahDetails({ place }: MadrasahDetailsProps) {
  const courses = place.coursesBn ?? []
  const staffMembers = (place.staff ?? []) as Parameters<typeof StaffCard>[0]['staff']
  const events = (place.eventsBn ?? []) as ActivityEvent[]

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Sticky Back Navigation */}
        <div className="sticky top-14 z-10 mb-6 rounded-xl bg-[var(--color-bg)]/90 py-2 backdrop-blur sm:top-16 md:top-20">
          <Link
            to="/community"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-gray-50 hover:text-[var(--color-primary)]/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/50"
          >
            ← পূর্ববর্তী পৃষ্ঠা
          </Link>
        </div>

        {/* Header Section */}
        <header className="rounded-2xl border border-[var(--color-border)] bg-white p-5 shadow-sm sm:p-6 md:p-8">
          <MadrasahHeader
            nameBn={place.nameBn ?? place.name}
            typeBn={place.typeBn ?? 'মাদরাসা'}
          />
        </header>

        {/* Content & Sidebar Grid Layout */}
        <div className="mt-6 grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-8">
          
          {/* Main Content Column (Takes up 2/3 of the space on desktop) */}
          <main className="flex flex-col gap-6 lg:col-span-2">
            {place.descriptionBn && (
              <section>
                <DescriptionCard text={place.descriptionBn} />
              </section>
            )}

            {place.facilitiesBn && place.facilitiesBn.length > 0 && (
              <section>
                <FacilitiesCard facilities={place.facilitiesBn} />
              </section>
            )}

            {staffMembers.length > 0 && (
              <section>
                <StaffCard staff={staffMembers} />
              </section>
            )}

            {place.images && place.images.length > 0 && (
              <section>
                <PhotoGallery imagesList={place.images} />
              </section>
            )}

            {events.length > 0 && (
              <section>
                <EventsCard events={events} />
              </section>
            )}
          </main>

          {/* Sidebar Column (Takes up 1/3 of the space on desktop) */}
          <aside className="flex flex-col gap-6 lg:col-span-1">
            <section>
              <ContactCard
                addressBn={place.addressBn}
                phone={place.contact}
                mapUrl={place.mapUrl}
                mapPreviewImage={place.mapPreviewImage}
              />
            </section>

            {place.hoursBn && (
              <section>
                <OperatingHoursCard hoursBn={place.hoursBn} />
              </section>
            )}

            {courses.length > 0 && (
              <section>
                <CoursesTags courses={courses} />
              </section>
            )}
          </aside>

        </div>
      </div>
    </div>
  )
}