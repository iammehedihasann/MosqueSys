import { useEffect, useState } from "react";
import { Clock, RefreshCcw } from "lucide-react";
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

  return (
    <section aria-labelledby="home-next-prayer" className="min-w-0 rounded-2xl border border-white/25 bg-(--home-green)/95 p-4 text-white shadow-lg sm:p-5 lg:p-6">
      <h2 id="home-next-prayer" className="flex items-center gap-2 text-base font-semibold text-[#F0D297]">
        <Clock aria-hidden="true" className="size-4" />
        পরবর্তী নামাজ
      </h2>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
        <p className="text-3xl leading-tight font-semibold [font-family:var(--font-display)]">
          {next?.prayer.nameBn ?? "—"}
        </p>
        <p className="text-xl font-semibold tabular-nums">
          {next ? timeFormat.format(next.at) : "—"}
        </p>
      </div>

      {hasError ? (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-3 text-sm">
          <p role="status" className="text-(--home-sage)">নামাজের সময় লোড করা যায়নি।</p>
          <button
            type="button"
            onClick={() => {
              setResult(null);
              setRetry((attempt) => attempt + 1);
            }}
            className="inline-flex items-center gap-1 rounded py-1 text-[#F0D297] hover:underline focus-visible:outline-white"
          >
            <RefreshCcw aria-hidden="true" className="size-3.5" />
            Refresh
          </button>
        </div>
      ) : (
        <p className="mt-2 text-sm text-(--home-sage)">
          {remaining === null ? "লোড হচ্ছে" : <>বাকি <span className="font-semibold tabular-nums">{formatCountdownHMS(remaining)}</span></>}
        </p>
      )}
      <progress
        aria-label="পরবর্তী নামাজ পর্যন্ত অতিক্রান্ত সময়"
        value={progress}
        max={100}
        className="mt-2 block h-1.5 w-full appearance-none overflow-hidden rounded-full bg-white/20 [&::-moz-progress-bar]:bg-[#F0D297] [&::-webkit-progress-bar]:bg-white/20 [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-[#F0D297]"
      />

      <ul className="mt-4 grid grid-cols-5 gap-1 border-t border-white/15 pt-3 text-center">
        {dailyPrayers.map((prayer) => {
          const timing = prayerTimes.find((row) => row.id === prayer.id);
          const isCurrent = current?.id === prayer.id;
          return (
            <li
              key={prayer.id}
              aria-current={isCurrent ? "time" : undefined}
              className={`rounded-md py-1.5 text-[11px] sm:text-xs ${isCurrent ? "bg-[#F0D297] text-(--home-ink)" : "text-(--home-sage)"}`}
            >
              <span className="block font-semibold">{prayer.nameBn}</span>
              <span className="block tabular-nums">{timing ? timeFormat.format(timing.dateTime) : "—"}</span>
            </li>
          );
        })}
      </ul>

      {jumuah && (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-1 border-t border-white/15 pt-3 text-sm">
          <span>{jumuah.nameBn} · শুধু শুক্রবার</span>
          <span className="font-semibold text-[#F0D297]">{jumuah.iqamah ?? jumuah.azan}</span>
        </div>
      )}
    </section>
  );
}
