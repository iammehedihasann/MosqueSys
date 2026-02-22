import { useState, useMemo } from 'react'
// import { SectionTitle } from '../components/SectionTitle'
import { Modal } from '../components/Modal'
import galleryData from '../data/gallery.json'
import type { GalleryItem, GalleryCategory } from '../types'
import { cn } from '../utils/cn'

const tabs: { value: GalleryCategory; label: string }[] = [
  { value: 'all', label: 'সব' },
  { value: 'programs', label: 'অনুষ্ঠান' },
  { value: 'construction', label: 'নির্মাণ' },
  { value: 'mosque', label: 'মসজিদ' },
]

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>('all')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  const items = useMemo(() => {
    const list = galleryData.items as GalleryItem[]
    if (activeTab === 'all') return list
    return list.filter((item) => item.category === activeTab)
  }, [activeTab])

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 ">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl text-primary mb-4">ছবি গ্যালারি</h1>
        <p className="text-base md:text-lg text-gray-600">Photo Gallery</p>
      </div>
      <div className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Gallery categories">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
            className={cn(
              'min-h-[44px] rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
              activeTab === tab.value
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'border border-[var(--color-border)] bg-white text-[var(--color-text)] shadow-sm hover:bg-gray-50'
            )}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className="block aspect-[4/3] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] text-left shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            onClick={() => setLightboxItem(item)}
          >
            <img src={item.src} alt={item.alt} className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      {items.length === 0 && (
        <p className="py-10 text-center text-[var(--color-text-muted)]">এই ক্যাটাগরিতে কোনো ছবি নেই।</p>
      )}

      <Modal isOpen={!!lightboxItem} onClose={() => setLightboxItem(null)}>
        {lightboxItem && (
          <div className="space-y-2">
            <img src={lightboxItem.src} alt={lightboxItem.alt} className="w-full rounded-lg" />
            {lightboxItem.caption && <p className="text-sm text-[var(--color-text-muted)]">{lightboxItem.caption}</p>}
          </div>
        )}
      </Modal>
      <div className="mt-12  p-6 md:p-8 text-center">
        <h3 className="text-3xl text-primary mb-4">ছবি যোগ করুন</h3>
        <p className="text-gray-700 mb-4">
          আপনার তোলা মসজিদের ছবি আমাদের সাথে শেয়ার করতে পারেন। ভালো ছবি গ্যালারিতে যোগ করা হবে।
        </p>
        <p className="text-sm text-gray-600">
          যোগাযোগ: ০১৭১২-৩৪৫৬৭৮ অথবা info@centralmosque.com
        </p>
      </div>
    </div>
  )
}
