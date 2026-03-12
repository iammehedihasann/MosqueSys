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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="sticky top-14 z-10 mb-4 rounded-xl bg-[var(--color-bg)]/90 py-2 backdrop-blur sm:top-16 md:top-20">
          <Link
            to="/community"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-[var(--color-border)] bg-white px-4 text-sm font-semibold text-[var(--color-primary)]"
          >
            ← পূর্ববর্তী পৃষ্ঠা
          </Link>
        </div>

        <section className="rounded-2xl border border-[var(--color-border)] bg-white p-5 sm:p-6 md:p-8">
          <MadrasahHeader
            nameBn={place.nameBn ?? place.name}
            typeBn={place.typeBn ?? 'মাদরাসা'}
          />
        </section>

        <section className="mt-6 grid gap-5 sm:gap-6 md:grid-cols-2">
          {place.descriptionBn && <DescriptionCard text={place.descriptionBn} />}
          <ContactCard
            addressBn={place.addressBn}
            phone={place.contact}
            mapUrl={place.mapUrl}
            mapPreviewImage={place.mapPreviewImage}
          />
          {place.hoursBn && <OperatingHoursCard hoursBn={place.hoursBn} />}
          {courses.length > 0 && <CoursesTags courses={courses} />}
        </section>

        {staffMembers.length > 0 && (
          <section className="mt-6">
            <StaffCard staff={staffMembers} />
          </section>
        )}

        {place.facilitiesBn && place.facilitiesBn.length > 0 && (
          <section className="mt-6">
            <FacilitiesCard facilities={place.facilitiesBn} />
          </section>
        )}

        {place.images && place.images.length > 0 && (
          <section className="mt-6">
            <PhotoGallery imagesList={place.images} />
          </section>
        )}

        {events.length > 0 && (
          <section className="mt-6">
            <EventsCard events={events} />
          </section>
        )}
      </div>
    </div>
  )
}
