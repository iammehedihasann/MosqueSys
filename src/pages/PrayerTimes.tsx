import { PrayerTimes as PrayerTimesWidget } from "@/components/PrayerTimes";
import { Info, Clock } from "lucide-react";

export function PrayerTimes() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <PrayerTimesWidget />

      {/* Bangla instructions & info */}
      <section
        className="mt-10 space-y-6"
        aria-labelledby="prayer-instructions-heading"
      >
        <h2
          id="prayer-instructions-heading"
          className="flex items-center gap-2 text-lg font-semibold text-[var(--color-text)]"
        >
          <Info className="h-5 w-5 text-[var(--color-primary)]" />
          নামাজ ও সময় সংক্রান্ত নির্দেশনা
        </h2>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
            <h3 className="font-semibold text-[var(--color-primary)]">
              আযান সময় সম্পর্কে
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text)] leading-relaxed">
              <strong>আযান</strong> হলো নামাজের সময় জানানোর ঘোষণা। এখানে দেখানো{" "}
              <strong>আযান</strong> সময় Dhaka, Bangladesh এর জন্য গণনা করা
              (Aladhan API)। <strong>ইকামত</strong> সময় আমাদের মসজিদের সময়সূচী
              অনুযায়ী দেখানো হয়, তবে বিশেষ পরিস্থিতিতে পরিবর্তন হতে পারে, তাই
              মসজিদের নোটিশ/ইমামের নির্দেশনা অনুসরণ করুন।
            </p>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-white p-5">
            <h3 className="font-semibold text-[var(--color-primary)]">
              সময়মতো নামাজের গুরুত্ব
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text)] leading-relaxed">
              প্রতিটি ওয়াক্ত নামাজ তার নির্ধারিত সময়ে পড়া মুস্তাহাব। ফজর
              সূর্য ওঠার আগে, যোহর দুপুরে, আসর বিকেলে, মাগরিব সূর্য ডোবার পর এবং
              ইশা রাতে পড়া হয়। জুমুআর দিন জোহরের পরিবর্তে জুমুআর নামাজ পড়া
              হয়।
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-amber-800">
            <Clock className="h-5 w-5" />
            মসজিদে প্রবেশের আদব
          </h3>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-amber-900/90">
            <li>প্রবেশের আগে পা ধুয়ে, পবিত্র হয়ে আসুন।</li>
            <li>মোবাইল সাইলেন্ট বা বন্ধ রাখুন।</li>
            <li>ইকামত শুরু হলে দ্রুত সারিতে শরিক হন।</li>
            <li>নামাজরত ব্যক্তির সামনে দিয়ে হাঁটবেন না।</li>
            <li>জুমুআর দিন আগেভাগে আসলে ভালো।</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
