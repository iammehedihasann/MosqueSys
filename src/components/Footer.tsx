import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

const quickLinks = [
  { to: "/prayer-times", label: "নামাজের সময় / Prayer Times" },
  { to: "/notices", label: "নোটিশ / Notices" },
  { to: "/donation", label: "দান / Donation" },
  { to: "/committee", label: "কমিটি / Committee" },
  { to: "/contact", label: "যোগাযোগ / Contact" },
];

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 font-sans">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* 1. Map Section */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold tracking-wide text-zinc-100 mb-4">
              মানচিত্র / Map
            </h3>
            {/* Modern embedded map placeholder with hover effect */}
            <div className="group relative h-48 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all hover:border-emerald-500/50">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sm text-zinc-500 transition-transform duration-300 group-hover:scale-105">
                <MapPin className="mb-2 h-6 w-6 text-zinc-700" />
                <span>Google Map Embed Here</span>
              </div>
            </div>
          </div>

          {/* 2. Address Section */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold tracking-wide text-zinc-100 mb-4">
              ঠিকানা / Address
            </h3>
            <div className="flex items-start gap-4 rounded-xl bg-zinc-900/50 p-4 border border-zinc-800/50">
              <div className="rounded-full bg-zinc-800 p-2 text-emerald-500">
                <MapPin className="h-5 w-5" />
              </div>
              <p className="text-base leading-relaxed text-zinc-300">
                গ্রাম মসজিদ, মেইন রোড
                <br />
                ইউনিয়ন পরিষদ
                <br />
                জেলা, বাংলাদেশ
              </p>
            </div>
          </div>

          {/* 3. Contact Section */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold tracking-wide text-zinc-100 mb-4">
              যোগাযোগ / Contact
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="tel:01712345678"
                className="group flex items-center gap-4 rounded-xl bg-zinc-900/50 p-4 border border-zinc-800/50 transition-colors hover:border-emerald-500/30 hover:bg-zinc-900"
              >
                <div className="rounded-full bg-zinc-800 p-2 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    ০১৭১২-৩৪৫৬৭৮
                  </p>
                  <p className="text-xs text-zinc-500">জরুরি কল (Emergency)</p>
                </div>
              </a>

              {/* Optional Email Addition for modern feel */}
              <a
                href="mailto:info@mosque.com"
                className="group flex items-center gap-4 rounded-xl bg-zinc-900/50 p-4 border border-zinc-800/50 transition-colors hover:border-emerald-500/30 hover:bg-zinc-900"
              >
                <div className="rounded-full bg-zinc-800 p-2 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-zinc-950 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-200">
                    info@mosque.com
                  </p>
                  <p className="text-xs text-zinc-500">ইমেইল (Email)</p>
                </div>
              </a>
            </div>
          </div>

          {/* 4. Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold tracking-wide text-zinc-100 mb-4">
              দ্রুত লিংক / Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-2 text-base text-zinc-400 transition-colors hover:text-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md w-fit"
                  >
                    <ArrowRight className="h-4 w-4 shrink-0 text-zinc-700 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-800/80 pt-8 sm:flex-row">
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} গ্রাম মসজিদ। সর্বস্বত্ব সংরক্ষিত।
          </p>

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link
              to="/privacy"
              className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
