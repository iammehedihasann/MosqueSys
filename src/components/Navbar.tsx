import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X, Building2 } from 'lucide-react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', label: 'হোম' },
    { name: 'Prayer Times', path: '/prayer-times', label: 'নামাজের সময়' },
    { name: 'NoticePage', path: '/notices', label: 'নোটিশ' },
    { name: 'Donation', path: '/donation', label: 'দান' },
    { name: 'Committee', path: '/committee', label: 'কমিটি' },
    { name: 'Services', path: '/services', label: 'সেবা' },
    { name: 'Gallery', path: '/gallery', label: 'গ্যালারি' },
    { name: 'Contact', path: '/contact', label: 'যোগাযোগ' },
  ];

  const isActive = (path: string) => location.pathname === path;
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
            {navItems.map((item) => (
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
        <div className="lg:hidden bg-primary border-t border-primary/20">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
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
        </div>
      )}
    </nav>
  );
}
