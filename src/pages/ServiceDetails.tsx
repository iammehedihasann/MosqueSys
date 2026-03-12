import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Phone } from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'
import servicesData from '../data/services.json'
import { images } from '../assets/image'
import type { Service } from '../types'

export function ServiceDetails() {
  const { id } = useParams()
  const services = servicesData.services as Service[]
  const service = services.find((item) => item.id === id)

  if (!service) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-section)]">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">সেবার তথ্য পাওয়া যায়নি</h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">অনুগ্রহ করে আবার চেষ্টা করুন।</p>
            <Link
              to="/services"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-[var(--color-primary)] px-4 text-sm font-semibold text-white"
            >
              সেবা তালিকায় ফিরুন
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const imageKey = service.image as keyof typeof images
  const heroImage = service.image && images[imageKey] ? images[imageKey] : service.image
  const galleryImages = (service.images ?? []).map((img) => {
    const key = img as keyof typeof images
    return images[key] ?? img
  })

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> সেবাসমূহ
        </Link>

        <section className="mt-4 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                {service.titleBn ?? service.title}
              </h1>
              {service.summaryBn && (
                <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                  {service.summaryBn}
                </p>
              )}
              {service.detailsBn && (
                <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                  {service.detailsBn}
                </p>
              )}

              <div className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                {service.availabilityBn && (
                  <p className="flex items-start gap-2">
                    <Clock className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
                    <span>{service.availabilityBn}</span>
                  </p>
                )}
                {service.contact && (
                  <a
                    href={`tel:${service.contact.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
                  >
                    <Phone className="h-4 w-4" /> {service.contact}
                  </a>
                )}
              </div>
            </div>
            <div className="w-full lg:max-w-md">
              {heroImage && (
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
                  <img src={heroImage} alt={service.titleBn ?? service.title} className="h-64 w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle title="কারা সেবা পাবেন" subtitle="সেবার প্রাপ্যতা সম্পর্কে তথ্য" />
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {(service.eligibilityBn ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle title="প্রয়োজনীয় কাগজপত্র" subtitle="সেবার জন্য যা সঙ্গে আনতে হবে" />
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {(service.requirementsBn ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <SectionTitle title="সেবা গ্রহণের ধাপ" subtitle="সহজ ধাপে প্রক্রিয়া" />
          <ol className="space-y-2 text-sm text-[var(--color-text-muted)]">
            {(service.processBn ?? []).map((item, index) => (
              <li key={item}>{index + 1}. {item}</li>
            ))}
          </ol>
        </section>

        {galleryImages.length > 0 && (
          <section className="mt-10">
            <SectionTitle title="সেবার ছবি" subtitle="সেবা কার্যক্রমের কিছু দৃশ্য" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((img, index) => (
                <div key={`${img}-${index}`} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white">
                  <img src={img} alt="সেবার ছবি" className="h-40 w-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
