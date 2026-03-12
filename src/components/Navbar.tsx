import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { ChevronDown, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const closeTimeoutRef = useRef<number | null>(null);

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>('mosque');

  const topLinks = [
    { name: 'Home', path: '/', label: 'হোম' },
    { name: 'Contact', path: '/contact', label: 'যোগাযোগ' },
  ];

  const navGroups = [
    {
      key: 'mosque',
      label: 'মসজিদ',
      items: [
        { name: 'Prayer Times', path: '/prayer-times', label: 'নামাজের সময়' },
        { name: 'NoticePage', path: '/notices', label: 'নোটিশ' },
        { name: 'Donation', path: '/donation', label: 'দান' },
        { name: 'Committee', path: '/committee', label: 'কমিটি' },
        { name: 'Services', path: '/services', label: 'সেবা' },
      ],
    },
    {
      key: 'community',
      label: 'কমিউনিটি',
      items: [
        { name: 'Community', path: '/community', label: 'কমিউনিটি তথ্য' },
        { name: 'Events', path: '/events', label: 'অনুষ্ঠান' },
        { name: 'Emergency', path: '/emergency', label: 'জরুরি' },
        { name: 'Charity', path: '/charity', label: 'দাতব্য' },
        { name: 'Gallery', path: '/gallery', label: 'গ্যালারি' },
      ],
    },
  ];

  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = '';
  }, [isMenuOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const isGroupActive = (paths: { path: string }[]) =>
    paths.some((item) => isActive(item.path));
  const mosqueName = "বাইতুল মামুর জামে মসজিদ "

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center gap-2 md:gap-3">
           
            <div className="flex h-10 w-10 items-center justify-center rounded-xl  text-accent font-bold text-lg border shadow-sm">{mosqueName.slice(0,3)}</div>
            <div className="flex flex-col">
              <span className="font-semibold text-base md:text-lg"> {mosqueName}</span>
              <span className="text-xs md:text-sm text-accent">সাগরদী, মাধবদী</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {topLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-accent text-primary'
                    : 'hover:bg-primary/80'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {navGroups.map((group) => {
              const active = isGroupActive(group.items)
              return (
                <div
                  key={group.key}
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current) {
                      window.clearTimeout(closeTimeoutRef.current);
                    }
                    setOpenDropdown(group.key);
                  }}
                  onMouseLeave={() => {
                    if (closeTimeoutRef.current) {
                      window.clearTimeout(closeTimeoutRef.current);
                    }
                    closeTimeoutRef.current = window.setTimeout(() => {
                      setOpenDropdown(null);
                    }, 160);
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenDropdown(openDropdown === group.key ? null : group.key)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                      active || openDropdown === group.key
                        ? 'bg-accent text-primary'
                        : 'hover:bg-primary/80'
                    }`}
                    aria-expanded={openDropdown === group.key}
                    aria-haspopup="menu"
                  >
                    {group.label}
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {openDropdown === group.key && (
                    <div className="absolute left-0 top-full w-56 pt-2">
                      <div className="rounded-xl border border-[var(--color-border)] bg-white p-2 shadow-lg">
                      {group.items.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                            isActive(item.path)
                              ? 'bg-[var(--color-bg)] text-[var(--color-primary)]'
                              : 'text-[var(--color-text)] hover:bg-[var(--color-bg)]'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md hover:bg-primary/80"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-x-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-primary/20 bg-primary md:top-20 md:max-h-[calc(100vh-5rem)]">
            <div className="px-4 py-4 space-y-4">
              <div className="space-y-1">
                {topLinks.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-md transition-colors ${
                      isActive(item.path)
                        ? 'bg-accent text-primary'
                        : 'hover:bg-primary/80'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {navGroups.map((group) => {
                const isOpen = openMobileGroup === group.key
                return (
                  <div key={group.key} className="rounded-xl border border-primary/30 bg-primary/60">
                    <button
                      type="button"
                      onClick={() => setOpenMobileGroup(isOpen ? null : group.key)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white"
                      aria-expanded={isOpen}
                      aria-controls={`mobile-group-${group.key}`}
                    >
                      {group.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div id={`mobile-group-${group.key}`} className="px-2 pb-3">
                        {group.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block rounded-md px-3 py-3 text-sm transition-colors ${
                              isActive(item.path)
                                ? 'bg-accent text-primary'
                                : 'text-white hover:bg-primary/80'
                            }`}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
