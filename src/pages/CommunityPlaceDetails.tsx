import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, MapPin, Phone } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Badge } from "@/components/ui/Badge";
import communityPlacesData from "@/data/communityPlaces.json";
import { images } from "@/assets/image";
import type { CommunityPlace, CommunityPlaceCategory } from "@/types";
import { MadrasahDetails } from "./MadrasahDetails";

const categoryLabel: Record<CommunityPlaceCategory, string> = {
  madrasa: 'মাদ্রাসা',
  school: 'স্কুল',
  library: 'পাঠাগার',
  eidgah: 'ঈদগাহ',
  health: 'চিকিৎসা কেন্দ্র',
  service: 'সেবা কেন্দ্র'
}

export function CommunityPlaceDetails() {
  const { id } = useParams()
  const places = communityPlacesData.places as CommunityPlace[]
  const place = places.find((item) => item.id === id)

  if (!place) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-section)]">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">তথ্য পাওয়া যায়নি</h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">অনুগ্রহ করে আবার চেষ্টা করুন।</p>
            <Link
              to="/community"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-[var(--color-primary)] px-4 text-sm font-semibold text-white"
            >
              কমিউনিটি পাতায় ফিরুন
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (place.category === 'madrasa') {
    return <MadrasahDetails place={place} />
  }

  const imageKey = place.image as keyof typeof images
  const heroImage = place.image && images[imageKey] ? images[imageKey] : place.image
  const galleryImages = (place.images ?? []).map((img) => {
    const key = img as keyof typeof images
    return images[key] ?? img
  })

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/community"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> কমিউনিটি তথ্য
        </Link>

        <section className="mt-4 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                  {place.nameBn ?? place.name}
                </h1>
                <Badge variant="success">{categoryLabel[place.category]}</Badge>
              </div>
              {place.descriptionBn && (
                <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                  {place.descriptionBn}
                </p>
              )}
              {place.highlightsBn && place.highlightsBn.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {place.highlightsBn.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[var(--color-bg)] px-3 py-1 text-xs text-[var(--color-text)] border border-[var(--color-border)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-6 space-y-2 text-sm text-[var(--color-text-muted)]">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
                  <span>{place.addressBn}</span>
                </p>
                {place.hoursBn && (
                  <p className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
                    <span>{place.hoursBn}</span>
                  </p>
                )}
                {place.contact && (
                  <a
                    href={`tel:${place.contact.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                  >
                    <Phone className="h-4 w-4" /> {place.contact}
                  </a>
                )}
              </div>
            </div>
            <div className="w-full lg:max-w-md">
              {heroImage && (
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
                  <img src={heroImage} alt={place.nameBn ?? place.name} className="h-64 w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle title="প্রধান কার্যক্রম" subtitle="এই প্রতিষ্ঠানে যে কাজগুলো পরিচালিত হয়" />
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {(place.activitiesBn ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle title="সুবিধাসমূহ" subtitle="স্থানীয়দের জন্য উপলব্ধ সুবিধা" />
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {(place.facilitiesBn ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        {galleryImages.length > 0 && (
          <section className="mt-10">
            <SectionTitle title="আরও ছবি" subtitle="কার্যক্রম ও সুবিধার কিছু দৃশ্য" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img, index) => (
                <div key={`${img}-${index}`} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
                  <img src={img} alt="কমিউনিটি ছবি" className="h-40 w-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
