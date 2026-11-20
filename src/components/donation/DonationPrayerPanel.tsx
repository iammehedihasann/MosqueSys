import { useEffect, useState } from "react";
import { Clock3, Moon, Sun, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import schedule from "@/data/prayerTimes.json";
import { getTimingsByCity } from "@/services/prayerApi";
import { sanitizeAladhanTime } from "@/utils/aladhan";
export function DonationPrayerPanel() {
  const [timings, setTimings] = useState<Record<string, string> | null>(null);
  const [failed, setFailed] = useState(false);
  const [retry, setRetry] = useState(0);
  const [day, setDay] = useState(() => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" }));
  useEffect(() => {
    const timer = window.setInterval(() => setDay(new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Dhaka" })), 60000);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    getTimingsByCity({ city: "Dhaka", country: "Bangladesh", method: 1 }, { signal: controller.signal }).then(({ timings }) => {
      if (!controller.signal.aborted) { setTimings(timings); setFailed(false); }
    }).catch(() => { if (!controller.signal.aborted) { setTimings(null); setFailed(true); } });
    return () => controller.abort();
  }, [day, retry]);
  return <section className="donation-panel donation-prayer">
    <h2><Clock3 />আজকের নামাজের সময়</h2>
    <p className="donation-caption">ঢাকা · {new Date(`${day}T12:00:00+06:00`).toLocaleDateString("bn-BD", { dateStyle: "long", timeZone: "Asia/Dhaka" })}</p>
    {failed ? <button className="donation-text-link" onClick={() => setRetry(retry + 1)}>সময় লোড হয়নি — আবার চেষ্টা করুন</button> : <ul>{schedule.times.filter(p => !p.isJumuah).map((prayer, i) => <li key={prayer.id}>{i < 3 ? <Sun /> : <Moon />}<span>{prayer.nameBn}</span><time>{timings?.[prayer.name] ? sanitizeAladhanTime(timings[prayer.name]) : "লোড হচ্ছে…"}</time></li>)}</ul>}
    <Link className="donation-text-link" to="/prayer-times">সম্পূর্ণ সময়সূচি দেখুন <ArrowRight size={14} /></Link>
  </section>;
}
