import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bell, CalendarDays, Clock3, RefreshCcw } from "lucide-react";
import prayerTimesSchedule from "@/data/prayerTimes.json";
import { getTimingsByCity } from "@/services/prayerApi";
import { sanitizeAladhanTime } from "@/utils/aladhan";
import { formatCountdownHMS, getNextPrayer } from "@/utils/prayerUtils";

const dailyPrayers = prayerTimesSchedule.times.filter((prayer) => !prayer.isJumuah);
const jumuah = prayerTimesSchedule.times.find((prayer) => prayer.isJumuah);
const timeZone = "Asia/Dhaka";
const dateFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const timeFormat = new Intl.DateTimeFormat("en-BD", {
  timeZone,
  hour: "numeric",
  minute: "2-digit",
});
const offsetFormat = new Intl.DateTimeFormat("en", { timeZone, timeZoneName: "longOffset" });

type ScheduleResult = { day: string; timings: Record<string, string> | null };

export function HomePrayerCard() {
  const [now, setNow] = useState(() => new Date());
  const [result, setResult] = useState<ScheduleResult | null>(null);
  const [retry, setRetry] = useState(0);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const day = dateFormat.format(now);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void getTimingsByCity(
      { city: "Dhaka", country: "Bangladesh", method: 1 },
      { signal: controller.signal, cacheTtlMs: 3 * 60 * 1000 },
    ).then(
      ({ timings }) => {
        if (!controller.signal.aborted) setResult({ day, timings });
      },
      () => {
        if (!controller.signal.aborted) setResult({ day, timings: null });
      },
    );
    return () => controller.abort();
  }, [day, retry]);

  const timings = result?.day === day ? result.timings : null;
  const offset = offsetFormat.formatToParts(now).find((part) => part.type === "timeZoneName")?.value.replace("GMT", "");
  const dateAt = (hhmm: string) => new Date(`${day}T${hhmm.padStart(5, "0")}:00${offset}`);
  const prayerTimes = dailyPrayers.flatMap((prayer) => {
    const timing = timings?.[prayer.name];
    if (!timing) return [];
    const dateTime = dateAt(sanitizeAladhanTime(timing));
    return Number.isFinite(dateTime.getTime()) ? [{ ...prayer, dateTime }] : [];
  });

  const next = getNextPrayer(prayerTimes, now);
  const current = [...prayerTimes].reverse().find((prayer) => prayer.dateTime <= now);
  const remaining = next ? next.at.getTime() - now.getTime() : null;
  const intervalStart = current?.dateTime ?? dateAt("00:00");
  const intervalLength = next ? next.at.getTime() - intervalStart.getTime() : 0;
  const progress = intervalLength > 0 && remaining !== null
    ? Math.max(0, Math.min(100, ((intervalLength - remaining) / intervalLength) * 100))
    : 0;
  const hasError = result?.day === day && !next;
  const circumference = 2 * Math.PI * 122;
  const ringOffset = circumference - (progress / 100) * circumference;
  const countdown = remaining === null
    ? "০০:০০:০০"
    : formatCountdownHMS(remaining).replace(/\d/g, (digit) => String.fromCharCode(digit.charCodeAt(0) - 48 + "০".charCodeAt(0)));
  const nextTime = next
    ? timeFormat.format(next.at).replace(/[0-9]/g, (digit) => String.fromCharCode(digit.charCodeAt(0) - 48 + "০".charCodeAt(0)))
    : "—";
  // const shareCard = async () => {
  //   const shareData = {
  //     title: "বাইতুল মামুর জামে মসজিদ",
  //     url: window.location.href,
  //   };
  //   if (navigator.share) {
  //     try {
  //       await navigator.share(shareData);
  //     } catch {
  //       return;
  //     }
  //   } else {
  //     await navigator.clipboard?.writeText(window.location.href);
  //   }
  // };

  return (
    <section
      aria-labelledby="home-next-prayer"
      className="min-w-0 rounded-[30px] border border-white/40 bg-transparent px-3 py-4 text-white shadow-[0_18px_45px_rgba(4,44,36,0.12)] backdrop-blur-lg sm:rounded-[36px] sm:px-5 sm:py-5"
    >
      <div className="flex items-center justify-between gap-3 px-1">
        <h2 id="home-next-prayer" className="flex items-center gap-2 text-sm font-bold sm:text-base">
          <Clock3 aria-hidden="true" className="size-5 " />
          পরবর্তী নামাজ
        </h2>
        {jumuah && (
          <p className="text-sm font-bold sm:text-base">
            জুমুআ : <span className="tabular-nums">{jumuah.iqamah ?? jumuah.azan}</span>
          </p>
        )}
      </div>

      {hasError ? (
        <div className="mt-3 flex min-h-64 items-center justify-center rounded-3xl bg-white/40">
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setRetry((attempt) => attempt + 1);
            }}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-[#087c70] hover:bg-white/70"
          >
            <RefreshCcw aria-hidden="true" className="size-4" />
            নামাজের সময় লোড করা যায়নি — আবার চেষ্টা
          </button>
        </div>
      ) : (
        <div
          className="relative mx-auto my-2 aspect-square w-[min(260px,76vw,38vh)] max-w-full sm:my-3 sm:w-[min(280px,76vw,40vh)]"
          aria-label={next ? `পরবর্তী নামাজ ${next.prayer.nameBn}, ${nextTime}` : "নামাজের সময় লোড হচ্ছে"}
        >
          <svg className="size-full -rotate-90" viewBox="0 0 300 300" aria-hidden="true">
            <circle cx="150" cy="150" r="122" fill="none" stroke="#d9ebe2" strokeWidth="24" />
            <circle
              cx="150"
              cy="150"
              r="122"
              fill="none"
              stroke="#087c70"
              strokeWidth="24"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={ringOffset}
              className="transition-[stroke-dashoffset] duration-1000"
            />
          </svg>
          <div className="absolute inset-[31px] grid place-items-center rounded-full bg-transparent text-center">
            <div>
              <p className="text-sm font-bold text-white/80 sm:text-base">{next?.prayer.nameBn ?? "লোড হচ্ছে"}</p>
              <p className="mt-1 whitespace-nowrap text-[clamp(1.7rem,7vw,2.7rem)] leading-[1.1] font-black tracking-tight text-white [font-family:var(--font-display)]">
                {nextTime}
              </p>
              {current?.nameBn && (
                <p className="mt-2 text-xs font-bold text-[#F0D297] sm:text-sm">
                  এখন {current.nameBn}
                </p>
              )}
              <p className="mt-1 text-base font-black tabular-nums text-[#F0D297] sm:text-lg">
                {countdown}
              </p>
              <p className="text-xs font-semibold text-white/75 sm:text-sm">বাকি</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 pt-1 sm:gap-3">
        <button
          type="button"
          aria-pressed={reminderEnabled}
          onClick={() => setReminderEnabled((enabled) => !enabled)}
          className={`flex min-h-10 items-center justify-center gap-1.5 rounded-xl border px-1.5 text-[11px] font-bold transition-colors sm:min-h-11 sm:gap-2 sm:px-2 sm:text-sm ${
            reminderEnabled
              ? "border-[#087c70] bg-[#087c70] text-white"
              : "border-transparent bg-[#143f38] text-white hover:bg-[#1d5148]"
          }`}
        >
          <span>রিমাইন্ডার</span>
          <Bell aria-hidden="true" className="size-4 shrink-0" />
        </button>
        <Link
          to="/prayer-times"
          className="flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-white/65 bg-white/30 px-1.5 text-[11px] font-bold text-white transition-colors hover:bg-black/40 sm:min-h-11 sm:gap-2 sm:px-2 sm:text-sm"
        >
          <span>ক্যালেন্ডার</span>
          <CalendarDays aria-hidden="true" className="size-4 shrink-0" />
        </Link>
        
      </div>
    </section>
  );
}
