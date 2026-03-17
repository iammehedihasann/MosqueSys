import { Link } from "react-router-dom";
import { BellRing, Compass, HeartHandshake, Info } from "lucide-react";
import { cn } from "@/utils/cn";

export function InfoMarquee({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "border-b border-emerald-900/10 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 text-amber-100",
        className,
      )}
      aria-label="Important information"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 py-2">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold">
            <Info className="h-4 w-4 text-amber-200" />
            LIVE
          </div>

          <div className="min-w-0 flex-1 overflow-hidden">
            <div className="marquee">
              <div className="marquee__inner text-xs font-semibold">
                <span className="inline-flex items-center gap-2">
                  <BellRing className="h-4 w-4 text-amber-200" />
                  নামাজের সময় দেখুন এবং পরবর্তী ওয়াক্তের কাউন্টডাউন চালু আছে
                </span>
                <span className="mx-6 text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <Compass className="h-4 w-4 text-amber-200" />
                  কিবলা দিক (Qibla) দেখুন Prayer Times পেজে
                </span>
                <span className="mx-6 text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <HeartHandshake className="h-4 w-4 text-amber-200" />
                  মসজিদের উন্নয়নে দান করুন—স্বচ্ছ রিপোর্ট দেওয়া হয়
                </span>
                <span className="mx-6 text-white/35">•</span>
                <span className="inline-flex items-center gap-2">
                  <BellRing className="h-4 w-4 text-amber-200" />
                  নামাজের সময় দেখুন এবং পরবর্তী ওয়াক্তের কাউন্টডাউন চালু আছে
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/prayer-times"
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold hover:bg-white/15"
            >
              Prayer Times
            </Link>
            <Link
              to="/donation"
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold hover:bg-white/15"
            >
              Donate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

