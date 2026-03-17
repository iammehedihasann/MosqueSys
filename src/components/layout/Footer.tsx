import { Link } from "react-router-dom";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { to: "/prayer-times", label: "নামাজের সময় / Prayer Times" },
  { to: "/notices", label: "নোটিশ / Notices" },
  { to: "/donation", label: "দান / Donation" },
  { to: "/committee", label: "কমিটি / Committee" },
  { to: "/contact", label: "যোগাযোগ / Contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-primary-dark)] text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-base font-semibold text-white">আমাদের মসজিদ</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              স্থানীয় মুসল্লিদের জন্য নিয়মিত সালাত, শিক্ষা এবং সামাজিক সহায়তা
              কার্যক্রম পরিচালিত হয়।
            </p>
            <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/10">
              <iframe
                title="Mosque location map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2391.2678663626834!2d90.69170624857563!3d23.833863094263815!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375437863baec4c1%3A0x4e6724df9861df66!2z4KaG4Kay4Ka54Ka-4Kac4KeN4KasIOCmhuCmrOCnjeCmpuCngeCmsiDgppvgpr7gprLgpr7gpq4g4Kau4KeH4Kau4KeN4Kas4Ka-4KawIOCmrOCmvuCnnOCngCDgppzgpr7gpq7gp4cg4Kau4Ka44Kac4Ka_4Kam!5e0!3m2!1sen!2sbd!4v1773640664696!5m2!1sen!2sbd"
                className="h-44 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              ঠিকানা / Address
            </h3>
            <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-light)]" />
              <span>
                সাগরদী কান্দাপাড়া
                <br />
                পাইকারচর ইউনিয়ন পরিষদ
                <br />
                নরসিংদী, ঢাকা, বাংলাদেশ
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              যোগাযোগ / Contact
            </h3>
            <div className="mt-3 space-y-3 text-sm">
              <a
                href="tel:+8801779520593"
                className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/10 px-3 py-3 transition-colors hover:bg-black/15"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-light)]" />
                <span className="leading-relaxed">
                  01779-520593
                  <span className="block text-xs text-white/60">
                    জরুরি কল (Emergency)
                  </span>
                </span>
              </a>

              <a
                href="mailto:kandaparamosque@gmail.com"
                className="flex items-start gap-2 rounded-lg border border-white/10 bg-black/10 px-3 py-3 transition-colors hover:bg-black/15"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-light)]" />
                <span className="leading-relaxed break-all">
                  kandaparamosque@gmail.com
                  <span className="block text-xs text-white/60">ইমেইল</span>
                </span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">
              দ্রুত লিংক / Links
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-1">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group inline-flex items-center gap-2 rounded-md text-sm text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-light)]"
                  >
                    <ArrowRight className="h-4 w-4 shrink-0 text-white/30 transition-transform group-hover:translate-x-0.5 group-hover:text-white/70" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} গ্রাম মসজিদ। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex items-center gap-4 text-xs text-white/60">
            <Link
              to="/privacy"
              className="rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-light)]"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="rounded hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-light)]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

