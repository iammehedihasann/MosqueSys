import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";

const quickLinks = [
  { to: "/prayer-times", label: "নামাজের সময়" },
  { to: "/notices", label: "নোটিশ" },
  { to: "/donation", label: "দান" },
  { to: "/committee", label: "কমিটি" },
  { to: "/contact", label: "যোগাযোগ" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Responsive Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Map */}
          <div className="order-1 md:order-1 lg:order-1 lg:col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              মানচিত্র / Map
            </h3>

            <div className="mt-3 h-44 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-muted)] text-sm">
              মানচিত্র (গুগল ম্যাপ এখানে যুক্ত করুন)
            </div>
          </div>

          {/* Address */}
          <div className="order-2 md:order-2 lg:order-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              ঠিকানা / Address
            </h3>

            <p className="mt-3 flex items-start gap-2 text-sm text-[var(--color-text)] leading-relaxed">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" />
              <span>
                গ্রাম মসজিদ, মেইন রোড, ইউনিয়ন পরিষদ,
                <br className="hidden sm:block" />
                জেলা, বাংলাদেশ
              </span>
            </p>
          </div>

          {/* Contact */}
          <div className="order-3 md:order-3 lg:order-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              যোগাযোগ / Contact
            </h3>

            <p className="mt-3 flex items-center gap-2 text-sm text-[var(--color-text)]">
              <Phone className="h-4 w-4 shrink-0 text-[var(--color-primary)]" />
              <a
                href="tel:01712345678"
                className="rounded hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              >
                ০১৭১২-৩৪৫৬৭৮
              </a>
            </p>

            {/* Optional: Small helper text */}
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">
              জরুরি প্রয়োজনে কল করুন (Emergency call)
            </p>
          </div>

          {/* Quick Links */}
          <div className="order-4 md:order-4 lg:order-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
              দ্রুত লিংক / Quick Links
            </h3>

            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex rounded text-sm text-[var(--color-text)] hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-[var(--color-border)] pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left text-sm text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} গ্রাম মসজিদ। সর্বস্বত্ব সংরক্ষিত।
          </p>

          {/* Optional: Small secondary links */}
          <div className="flex items-center justify-center sm:justify-end gap-4 text-xs text-[var(--color-text-muted)]">
            <Link
              to="/privacy"
              className="rounded hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="rounded hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}