import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { SectionTitle } from "../components/SectionTitle";
import { PrayerTimeCard } from "../components/PrayerTimeCard";
import { NoticeCard } from "../components/NoticeCard";
import { EventCard } from "../components/EventCard";
import { DonationSummaryCard } from "../components/DonationSummaryCard";
import { ProfileCard } from "../components/ProfileCard";
import { images } from "../assets/image";
import prayerTimesData from "../data/prayerTimes.json";
import noticesData from "../data/notices.json";
import donationData from "../data/donation.json";
import committeeData from "../data/committee.json";
import eventsData from "../data/events.json";
import galleryData from "../data/gallery.json";
import servicesData from "../data/services.json";
import type { PrayerTime } from "../types";
import {
  ScrollText,
  BookOpen,
  Moon,
  Heart,
  Megaphone,
  ArrowRight,
} from "lucide-react";

const serviceIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  coffin: ScrollText,
  "book-open": BookOpen,
  moon: Moon,
  heart: Heart,
  megaphone: Megaphone,
};

export function Home() {
  const times = prayerTimesData.times as PrayerTime[];
  const notices = noticesData.notices.slice(0, 3).map((n) => ({
    ...n,
    category: n.category as "ramadan" | "general" | "emergency",
  }));
  const events = eventsData.events.slice(0, 3);
  const imamAndMuazzin = committeeData.members.slice(0, 2);
  const galleryItems = galleryData.items.slice(0, 6);
  const services = servicesData.services;

  return (
    <div>
      {/* Hero – production style */}
      <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src={images.mosqueCover}
          alt="Mosque"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-3xl md:text-5xl lg:text-6xl mb-4">
              সাগরদী কান্দাপাড়া বাইতুল মামুর জামে মসজিদ{" "}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200">
              সালাম মেম্বার বাড়ি,সাগরদী
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/prayer-times"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors"
              >
                নামাজের সময় দেখুন
              </Link>
              <Link
                to="/donation"
                className="bg-accent hover:bg-accent/90 text-primary px-6 py-3 rounded-lg transition-colors"
              >
                দান করুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Today Prayer Times */}
        <section className="mb-12">
          <SectionTitle
            title="আজকের নামাজের সময় / Today's Prayer Times"
            subtitle="নামাজের সময়সূচী। আযান = ঘোষণা, ইকামত = জামাত শুরুর সময়।"
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {times.map((prayer) => (
              <PrayerTimeCard key={prayer.id} prayer={prayer} />
            ))}
          </div>
          <div className="mt-5 text-center">
            <Button asChild to="/prayer-times" variant="outline" size="md">
              পূর্ণ সময়সূচী ও নির্দেশনা / Full Schedule
            </Button>
          </div>
        </section>

        {/* Latest Notices */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl text-primary">সর্বশেষ নোটিশ</h2>
            <Link
              to="/notices"
              className="text-primary hover:text-primary/80 flex items-center gap-1"
            >
              <span>সব দেখুন</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {notices.map((notice, id) => (
              <NoticeCard key={id} {...notice} />
            ))}
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="mb-12">
          <SectionTitle
            title="আসন্ন কার্যক্রম / Upcoming Events"
            subtitle="ইফতার, ঈদ, মিলাদ ও অন্যান্য অনুষ্ঠানের তারিখ।"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>

        {/* Donation Summary */}
        <section className="mb-12">
          <SectionTitle
            title="দান সংক্ষেপ / Donation Summary"
            subtitle="মাসিক আয়, ব্যয় ও ব্যালেন্স—পূর্ণ স্বচ্ছতা।"
          />
          <DonationSummaryCard summary={donationData.summary} showCta />
        </section>

        {/* Imam & Muazzin */}
        <section className="mb-12">
          <SectionTitle
            title="ইমাম ও মুয়াযযিন / Imam & Muazzin"
            subtitle="নামাজ ও আযানের দায়িত্বে থাকা ব্যক্তিবর্গ।"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {imamAndMuazzin.map((member) => (
              <ProfileCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Services Preview */}
        <section className="mb-12">
          <SectionTitle
            title="সেবাসমূহ / Services"
            subtitle="জানাযা, মক্তব, রমজান ইফতার, দান ও ঘোষণা।"
          />
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon] ?? Megaphone;
              return (
                <Link
                  key={service.id}
                  to="/services"
                  className="card-base flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="mt-3 text-center text-sm font-medium text-[var(--color-text)]">
                    {service.title}
                  </span>
                  <span className="mt-1 text-center text-xs text-[var(--color-text-muted)]">
                    {service.titleBn}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className="mt-5 text-center">
            <Button asChild to="/services" variant="outline" size="md">
              সব সেবা / All Services
            </Button>
          </div>
        </section>

        {/* Gallery Preview */}
        <section className="mb-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle
              title="গ্যালারি / Gallery"
              subtitle="অনুষ্ঠান, নির্মাণ ও রমজানের ছবি।"
            />
            <Link
              to="/gallery"
              className="text-sm font-medium text-[var(--color-primary)] hover:underline focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] rounded"
            >
              পূর্ণ গ্যালারি দেখুন →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {galleryItems.map((item) => (
              <Link
                key={item.id}
                to="/gallery"
                className="block aspect-[4/3] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover"
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
