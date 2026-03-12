import { BookOpen, Building2, GraduationCap, Heart, MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from './Badge'
import { cn } from '../utils/cn'
import type { CommunityPlace, CommunityPlaceCategory } from '../types'

interface CommunityPlaceCardProps {
  place: CommunityPlace
  detailPath?: string
  className?: string
}

const categoryMeta: Record<CommunityPlaceCategory, { label: string; icon: React.ComponentType<{ className?: string }>; tone: string }> = {
  madrasa: {
    label: 'মাদ্রাসা',
    icon: BookOpen,
    tone: 'bg-emerald-50 text-emerald-700 border-emerald-100'
  },
  school: {
    label: 'স্কুল',
    icon: GraduationCap,
    tone: 'bg-blue-50 text-blue-700 border-blue-100'
  },
  library: {
    label: 'পাঠাগার',
    icon: BookOpen,
    tone: 'bg-amber-50 text-amber-700 border-amber-100'
  },
  eidgah: {
    label: 'ঈদগাহ',
    icon: MapPin,
    tone: 'bg-purple-50 text-purple-700 border-purple-100'
  },
  health: {
    label: 'চিকিৎসা',
    icon: Heart,
    tone: 'bg-rose-50 text-rose-700 border-rose-100'
  },
  service: {
    label: 'সেবা কেন্দ্র',
    icon: Building2,
    tone: 'bg-gray-50 text-gray-700 border-gray-100'
  }
}

export function CommunityPlaceCard({ place, detailPath, className }: CommunityPlaceCardProps) {
  const meta = categoryMeta[place.category]
  const Icon = meta?.icon ?? Users

  return (
    <article
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]',
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl border', meta?.tone)}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-semibold text-[var(--color-text)]">
              {place.nameBn ?? place.name}
            </h3>
            {meta && <Badge variant="success" className="bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)]">{meta.label}</Badge>}
          </div>
          {place.descriptionBn && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
              {place.descriptionBn}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm text-[var(--color-text-muted)]">
        <p className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 text-[var(--color-primary)]" />
          <span>{place.addressBn}</span>
        </p>
        {place.hoursBn && <p>সময়: {place.hoursBn}</p>}
        {place.contact && (
          <a
            href={`tel:${place.contact.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
          >
            <span>যোগাযোগ:</span>
            <span>{place.contact}</span>
          </a>
        )}
      </div>

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
    </article>
  )
}
