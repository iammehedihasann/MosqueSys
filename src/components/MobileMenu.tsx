import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../utils/cn'

interface NavLink {
  to: string
  label: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    if (isOpen) window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-xs border-l border-gray-200 bg-white shadow-xl lg:hidden',
          'flex flex-col'
        )}
        role="dialog"
        aria-label="Main menu"
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <span className="font-semibold text-[var(--color-text)]">মেনু</span>
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md text-[var(--color-text)] hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-auto p-4" aria-label="Main">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onClose}
              className="min-h-[48px] flex items-center rounded-md px-4 py-3 text-base font-medium text-[var(--color-text)] hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4">
            <Button asChild to="/donation" variant="primary" size="lg" className="w-full">
              দান করুন
            </Button>
          </div>
        </nav>
      </aside>
    </>
  )
}
