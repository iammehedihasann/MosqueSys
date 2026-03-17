import { useCallback, useEffect, useMemo, useState } from "react";
import { Compass, LocateFixed } from "lucide-react";
import { cn } from "@/utils/cn";

const KAABA = { lat: 21.4225, lon: 39.8262 };

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

function normalizeDeg(deg: number) {
  return ((deg % 360) + 360) % 360;
}

function qiblaBearing(fromLat: number, fromLon: number) {
  const φ1 = toRad(fromLat);
  const φ2 = toRad(KAABA.lat);
  const Δλ = toRad(KAABA.lon - fromLon);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  return normalizeDeg(toDeg(Math.atan2(y, x)));
}

export function QiblaCard({ className }: { className?: string }) {
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocation = useCallback(() => {
    setErr(null);
    setLoading(true);

    if (!("geolocation" in navigator)) {
      setErr("এই ব্রাউজারে লোকেশন সুবিধা নেই।");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setLoading(false);
      },
      (e) => {
        setErr(e.message || "লোকেশন অনুমতি প্রদান করা হয়নি।");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 60_000 },
    );
  }, []);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  const bearing = useMemo(() => {
    if (!coords) return null;
    return qiblaBearing(coords.lat, coords.lon);
  }, [coords]);

  return (
    <section
      className={cn(
        "mt-4 rounded-3xl border border-emerald-200/60 bg-white p-4 sm:p-5",
        className,
      )}
      aria-label="কিবলার দিক"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 text-sm font-extrabold tracking-wide text-emerald-950">
            <Compass className="h-4 w-4 text-emerald-800" />
            কিবলার দিক
          </h3>
          <p className="mt-1 text-xs text-slate-600">
            আপনার ডিভাইসের অবস্থান ব্যবহার করে মক্কার কাবা শরীফের দিক নির্ধারণ
            করা হয়।
          </p>
        </div>

        <button
          type="button"
          onClick={requestLocation}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-2 text-xs font-extrabold text-emerald-950 hover:bg-emerald-100/80 active:scale-[0.99]"
        >
          <LocateFixed className={cn("h-4 w-4", loading && "animate-pulse")} />
          {loading ? "অবস্থান নির্ধারণ করা হচ্ছে…" : "আপডেট"}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
          <div className="text-xs font-bold text-slate-600">দিক (ডিগ্রি)</div>
          <div className="mt-1 text-2xl font-black text-slate-900">
            {bearing == null ? "—" : `${bearing.toFixed(1)}°`}
          </div>

          {coords ? (
            <div className="mt-2 text-[11px] font-semibold text-slate-600">
              অক্ষাংশ {coords.lat.toFixed(4)}, দ্রাঘিমাংশ{" "}
              {coords.lon.toFixed(4)}
            </div>
          ) : (
            <div className="mt-2 text-[11px] font-semibold text-slate-600">
              সঠিক ফলাফলের জন্য লোকেশন অনুমতি দিন।
            </div>
          )}

          {err ? (
            <div className="mt-2 text-[11px] font-semibold text-rose-700">
              {err}
            </div>
          ) : null}
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-950 p-4 text-white">
          <div className="text-xs font-extrabold tracking-wide text-amber-200/90">
            নির্দেশনা
          </div>
          <ul className="mt-2 space-y-1 text-[12px] font-semibold text-white/85">
            <li>- সঠিক কম্পাসের জন্য মোবাইলটি সমতলভাবে ধরুন।</li>
            <li>- কম্পাস না থাকলে ডিগ্রি মান অনুসরণ করুন।</li>
            <li>- বাংলাদেশে কিবলার দিক সাধারণত পশ্চিম-উত্তর-পশ্চিম দিকে।</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
