import { useState, useMemo } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { NoticeCard } from '../components/NoticeCard'
import { Input } from '../components/Input'
import { Select } from '../components/Select'
import noticesData from '../data/notices.json'
import type { Notice } from '../types'

const PER_PAGE = 6
const filterOptions = [
  { value: 'all', label: 'সব / All' },
  { value: 'ramadan', label: 'রমজান' },
  { value: 'general', label: 'সাধারণ' },
  { value: 'emergency', label: 'জরুরি' },
]

export function Notices() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const [page, setPage] = useState(1)

  const notices = useMemo(() => {
    let list = noticesData.notices as Notice[]
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          (n.titleBn && n.titleBn.includes(q)) ||
          n.excerpt.toLowerCase().includes(q)
      )
    }
    if (filter !== 'all') {
      list = list.filter((n) => n.category === filter)
    }
    return list
  }, [search, filter])

  const totalPages = Math.ceil(notices.length / PER_PAGE) || 1
  const paginated = notices.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <SectionTitle
        title="নোটিশ / Notices"
        subtitle="মসজিদ ও এলাকার গুরুত্বপূর্ণ ঘোষণা। খুঁজতে সার্চ করুন বা ক্যাটাগরি দিয়ে ফিল্টার করুন।"
      />
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex-1 w-full">
          <Input
            type="search"
            placeholder="নোটিশ খুঁজুন..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            aria-label="Search notices"
          />
        </div>
        
        <Select
          options={filterOptions}
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value)
            setPage(1)
          }}
          aria-label="Filter by category"
          className="w-full sm:w-44"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {paginated.map((notice) => (
          <NoticeCard key={notice.id} notice={notice} />
        ))}
      </div>
      {notices.length === 0 && (
        <p className="py-10 text-center text-[var(--color-text-muted)]">কোনো নোটিশ পাওয়া যায়নি।</p>
      )}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-text)] shadow-sm hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            আগে
          </button>
          <span className="flex min-h-[44px] items-center px-4 text-sm text-[var(--color-text-muted)]">
            পৃষ্ঠা {page} / {totalPages}
          </span>
          <button
            type="button"
            className="min-h-[44px] min-w-[44px] rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm font-medium text-[var(--color-text)] shadow-sm hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            পর
          </button>
        </div>
      )}
    </div>
  )
}
