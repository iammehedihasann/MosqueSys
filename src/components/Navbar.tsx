import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { Button } from './Button'
import { MobileMenu } from './MobileMenu'
import { cn } from '../utils/cn'

const navLinks = [
  { to: '/', label: 'হোম', labelEn: 'Home' },
  { to: '/prayer-times', label: 'নামাজের সময়', labelEn: 'Prayer Times' },
  { to: '/notices', label: 'নোটিশ', labelEn: 'Notice' },
  { to: '/donation', label: 'দান', labelEn: 'Donation' },
  { to: '/committee', label: 'কমিটি', labelEn: 'Committee' },
  { to: '/services', label: 'সেবা', labelEn: 'Services' },
  { to: '/gallery', label: 'গ্যালারি', labelEn: 'Gallery' },
  { to: '/contact', label: 'যোগাযোগ', labelEn: 'Contact' },
]

const shortName = 'মসজিদ'

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-white/95 shadow-[var(--shadow-section)] backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to="/"
          className="flex min-h-[44px] min-w-[44px] items-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 rounded-lg"
          aria-label="Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white font-bold text-lg shadow-sm">
            ম
          </div>
          <span className="hidden text-lg font-semibold text-[var(--color-text)] sm:inline" style={{ fontFamily: 'var(--font-display)' }}>
            গ্রাম মসজিদ
          </span>
          <span className="text-lg font-semibold text-[var(--color-text)] sm:hidden" style={{ fontFamily: 'var(--font-display)' }}>{shortName}</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'min-h-[44px] min-w-[44px] flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                location.pathname === link.to
                  ? 'bg-[var(--color-primary)]/12 text-[var(--color-primary)]'
                  : 'text-[var(--color-text)] hover:bg-gray-100'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/donation" className="ml-2">
            <Button variant="primary" size="sm">
              দান করুন
            </Button>
          </Link>
        </nav>

        <button
          type="button"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-[var(--color-text)] hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  )
}
