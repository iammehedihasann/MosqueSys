import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { NoticeCard } from "@/components/shared/NoticeCard";
import { EventCard } from "@/components/shared/EventCard";
import { DonationSummaryCard } from "@/components/shared/DonationSummaryCard";
import ProfileCard from "@/components/shared/ProfileCard";
import { PrayerTimes } from "@/components/PrayerTimes";
import { images } from "@/assets/image";
import noticesData from "@/data/notices.json";
import donationData from "@/data/donation.json";
import committeeData from "@/data/committee.json";
import eventsData from "@/data/events.json";
import galleryData from "@/data/gallery.json";
import servicesData from "@/data/services.json";
import { getImgSrc } from "@/utils/getImgSrc";
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
  const notices = noticesData.notices.slice(0, 3).map((n) => ({
    ...n,
    category: n.category as "ramadan" | "general" | "emergency",
  }));
  const events = eventsData.events.slice(0, 3);
  const imamAndMuazzin = committeeData.imamStaff.slice(0, 4);
  const galleryItems = galleryData.items.slice(0, 6);
  const services = servicesData.services;
  const heroImages = [images.mosqueCover, images.friends, images.program_1];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section - Refined Overlay and Typography */}
      <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] min-h-[400px] overflow-hidden">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Mosque"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] 
  ${index === currentImage ? "opacity-100 scale-105" : "opacity-0"}
  brightness-110 contrast-105`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/60 to-black/90" />
        <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
          <div className="max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg leading-tight">
              সাগরদী কান্দাপাড়া{" "}
              <span className="text-amber-400">বাইতুল মামুর</span> জামে মসজিদ
            </h1>

            <p className="text-lg md:text-2xl text-gray-200 font-medium">
              সালাম মেম্বার বাড়ি, সাগরদী
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                to="/prayer-times"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-2xl font-bold shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
              >
                নামাজের সময় দেখুন
              </Link>

              <Link
                to="/donation"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-2xl font-bold shadow-[var(--shadow-card)] transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
              >
                দান করুন
              </Link>
            </div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {heroImages.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-6 rounded-full transition-all ${
                i === currentImage ? "bg-amber-400" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-20">
        {/* 2. Today Prayer Times - Grid Refresh */}
        <section>
          <PrayerTimes />
        </section>

        {/* 3. Latest Notices & Events Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Notices - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black text-gray-900">
                সর্বশেষ নোটিশ
              </h2>
              <Link
                to="/notices"
                className="group flex items-center gap-2 text-emerald-600 font-bold hover:underline"
              >
                সব দেখুন{" "}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {notices.map((notice, id) => (
                <NoticeCard key={id} {...notice} />
              ))}
            </div>
          </div>

          {/* Side Banner / Quick Event */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-6 md:p-8 text-white shadow-[var(--shadow-card-hover)] border border-emerald-700/30">
            {/* Decorative Background */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-teal-300/10 rounded-full blur-2xl"></div>

            <div className="relative z-10 flex flex-col h-full justify-between">
              {/* Header */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-amber-400 tracking-wide">
                  আসন্ন কার্যক্রম
                </h3>

                <p className="text-emerald-100/80 mb-6 text-sm italic leading-relaxed">
                  ইকামতের সাথে আপনার দ্বীনি কার্যক্রম পরিচালনা করুন
                </p>

                {/* Events */}
                <div className="space-y-4">
                  {events.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
                    >
                      <EventCard event={event} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <Link
                to="/events"
                className="mt-8 block text-center text-sm md:text-base font-semibold py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-emerald-950 hover:brightness-105 transition-colors shadow-[var(--shadow-card)]"
              >
                সব কার্যক্রম দেখুন →
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Donation Summary Section - Full Width Feature */}
        <section className="bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <SectionTitle
              title="দান সংক্ষেপ"
              subtitle="মাসিক আয়, ব্যয় ও ব্যালেন্স—পূর্ণ স্বচ্ছতা।"
            />
            <Button
              asChild
              to="/donation"
              variant="primary"
              className="rounded-2xl px-8 h-12 shadow-md"
            >
              পূর্ণ রিপোর্ট দেখুন <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <div className="mt-10">
            <DonationSummaryCard
              summary={donationData.summary}
              showCta={false}
            />
          </div>
        </section>

        {/* 5. Imam & Muazzin - Modern Flex Grid */}
        <section>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
            <SectionTitle
              title="ইমাম ও মুয়াযযিন"
              subtitle="সালাত ও দ্বীনি শিক্ষার দায়িত্বে নিয়োজিত"
            />
            <Link
              to="/committee"
              className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-2"
            >
              সকল স্টাফ দেখুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {imamAndMuazzin.map((member, index) => (
              <ProfileCard
                key={`${member.name}-${member.role}-${member.phone}-${index}`}
                {...member}
              />
            ))}
          </div>
        </section>

        {/* 6. Services - Compact Bento Style */}
        <section>
          <SectionTitle
            title="সেবাসমূহ / Services"
            subtitle="মসজিদের মাধ্যমে পরিচালিত জনকল্যাণমূলক কাজ"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon] ?? Megaphone;
              return (
                <div
                  key={service.title}
                  className="group bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="h-14 w-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm leading-tight">
                    {service.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">
                    {service.titleBn}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. Gallery Preview - Masonry-like Grid */}
        <section className="pb-12">
          <div className="flex justify-between items-end mb-8">
            <SectionTitle
              title="গ্যালারি / Gallery"
              subtitle="মসজিদের সুন্দর মুহূর্তসমূহ"
            />
            <Link
              to="/gallery"
              className="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
            >
              পূর্ণ গ্যালারি →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryItems.map((item, idx) => (
              <div
                key={item.id}
                className={`overflow-hidden rounded-2xl shadow-sm border border-gray-100 ${idx === 0 || idx === 3 ? "md:col-span-2" : ""}`}
              >
                <img
                  src={getImgSrc(item.src)}
                  alt={item.alt}
                  className="h-full w-full object-cover aspect-video hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
