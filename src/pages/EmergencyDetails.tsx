import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  Bolt,
  Droplet,
  Flame,
  Heart,
  MapPin,
  Phone,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import emergencyContactsData from "@/data/emergencyContacts.json";
import { images } from "@/assets/image";
import type { EmergencyContact, EmergencyServiceType } from "@/types";

const serviceMeta: Record<EmergencyServiceType, { label: string; icon: React.ComponentType<{ className?: string }>; tone: string; badge: 'emergency' | 'general' | 'success' }> = {
  police: { label: 'পুলিশ', icon: Shield, tone: 'bg-indigo-50 text-indigo-700 border-indigo-100', badge: 'emergency' },
  hospital: { label: 'চিকিৎসা', icon: Heart, tone: 'bg-rose-50 text-rose-700 border-rose-100', badge: 'emergency' },
  fire: { label: 'ফায়ার সার্ভিস', icon: Flame, tone: 'bg-orange-50 text-orange-700 border-orange-100', badge: 'emergency' },
  ambulance: { label: 'অ্যাম্বুলেন্স', icon: Phone, tone: 'bg-emerald-50 text-emerald-700 border-emerald-100', badge: 'emergency' },
  blood: { label: 'রক্ত সহায়তা', icon: Droplet, tone: 'bg-red-50 text-red-700 border-red-100', badge: 'general' },
  electricity: { label: 'বিদ্যুৎ', icon: Bolt, tone: 'bg-yellow-50 text-yellow-700 border-yellow-100', badge: 'general' },
  disaster: { label: 'জরুরি সেবা', icon: AlertTriangle, tone: 'bg-slate-50 text-slate-700 border-slate-100', badge: 'emergency' },
  women: { label: 'নারী সহায়তা', icon: Shield, tone: 'bg-pink-50 text-pink-700 border-pink-100', badge: 'emergency' }
}

export function EmergencyDetails() {
  const { id } = useParams()
  const contacts = emergencyContactsData.contacts as EmergencyContact[]
  const contact = contacts.find((item) => item.id === id)

  if (!contact) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[var(--color-border)] bg-white p-8 text-center shadow-[var(--shadow-section)]">
            <h1 className="text-2xl font-semibold text-[var(--color-text)]">তথ্য পাওয়া যায়নি</h1>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">অনুগ্রহ করে আবার চেষ্টা করুন।</p>
            <Link
              to="/emergency"
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-md bg-[var(--color-primary)] px-4 text-sm font-semibold text-white"
            >
              জরুরি তালিকায় ফিরুন
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const meta = serviceMeta[contact.serviceType]
  const Icon = meta?.icon ?? Phone
  const imageKey = contact.image as keyof typeof images
  const imageSrc = contact.image && images[imageKey] ? images[imageKey] : contact.image
  const phones = [contact.phone, ...(contact.alternatePhones ?? [])].filter(Boolean)

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/emergency"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> জরুরি যোগাযোগ
        </Link>

        <section className="mt-4 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${meta?.tone ?? ''}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-3xl font-semibold text-[var(--color-text)] md:text-4xl">{contact.nameBn}</h1>
                  {meta && <Badge variant={meta.badge}>{meta.label}</Badge>}
                </div>
              </div>
              {contact.noteBn && (
                <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                  {contact.noteBn}
                </p>
              )}
              <div className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
                {contact.locationBn && (
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
                    <span>{contact.locationBn}</span>
                  </p>
                )}
                {contact.availabilityBn && <p>সময়: {contact.availabilityBn}</p>}
                {contact.coverageBn && <p>পরিধি: {contact.coverageBn}</p>}
              </div>
              {phones.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-[var(--color-primary)] px-4 text-sm font-semibold text-white hover:bg-[var(--color-primary-dark)]"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="w-full lg:max-w-md">
              {imageSrc && (
                <div className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
                  <img src={imageSrc} alt={contact.nameBn} className="h-64 w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <SectionTitle title="যে সেবাগুলো পাওয়া যায়" subtitle="এই সেবার মাধ্যমে কী কী সহায়তা পাওয়া যাবে" />
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {(contact.servicesBn ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionTitle title="জরুরি করণীয়" subtitle="কল করার সময় যে তথ্যগুলো প্রস্তুত রাখবেন" />
            <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
              {(contact.instructionsBn ?? []).map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}
