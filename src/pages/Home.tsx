import { useEffect, useRef, useState } from "react";
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
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  MapPin,
  Phone,
} from "lucide-react";
import { HomePrayerCard } from "./home/HomePrayerCard";
import { HomeDonationReport } from "./home/HomeDonationReport";

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

const containerClass = "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8";
const sectionTitleClass = "mb-0! [&_h2]:text-2xl [&_h2]:text-(--home-ink) md:[&_h2]:text-3xl";
const textLinkClass = "inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-(--home-green) hover:underline";
const goldLinkClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-(--home-brass) px-5 py-2.5 font-semibold text-(--home-ink) transition-colors hover:bg-amber-300 focus-visible:outline-white";
const serviceControlClass = "grid size-11 place-items-center rounded-lg border border-(--home-green)/30 bg-white text-(--home-green) transition-colors enabled:hover:bg-(--home-sage) disabled:opacity-40";
const address = "সালাম মেম্বার বাড়ি, সাগরদী";

const noticeRowClass = [
  "[&>div]:grid [&>div]:grid-cols-[4.75rem_minmax(0,1fr)] [&>div]:items-start [&>div]:gap-x-3 [&>div]:gap-y-2",
  "sm:[&>div]:grid-cols-[6rem_minmax(0,1fr)_auto] sm:[&>div]:gap-x-4",
  "[&>div]:rounded-none [&>div]:border-0 [&>div]:bg-transparent [&>div]:px-0 [&>div]:py-4 [&>div]:shadow-none!",
  "[&>div>div:first-child]:contents [&>div>div:first-child>div:first-child]:contents",
  "[&_h3]:col-start-2 [&_h3]:row-start-1 [&_h3]:m-0 [&_h3]:font-semibold [&_h3]:text-(--home-ink)",
  "[&_h3+div]:col-start-1 [&_h3+div]:row-span-4 [&_h3+div]:row-start-1 [&_h3+div]:m-0",
  "[&_h3+div]:block [&_h3+div]:rounded-lg [&_h3+div]:bg-(--home-sage) [&_h3+div]:px-2 [&_h3+div]:py-2 [&_h3+div]:text-center [&_h3+div]:text-(--home-green)",
  "[&_h3+div>svg]:mx-auto [&_h3+div>svg]:mb-1",
  "[&_p]:col-start-2 [&_p]:row-start-2 [&_p]:m-0 [&_p]:text-sm sm:[&_p]:col-span-2",
  "[&>div>div:first-child>span]:col-start-2 [&>div>div:first-child>span]:row-start-3 [&>div>div:first-child>span]:justify-self-start",
  "sm:[&>div>div:first-child>span]:col-start-3 sm:[&>div>div:first-child>span]:row-start-1 sm:[&>div>div:first-child>span]:justify-self-end",
  "[&_button]:col-start-2 [&_button]:row-start-4 [&_button]:justify-self-start sm:[&_button]:row-start-3",
].join(" ");

const profileCardClass = [
  "flex h-full min-w-0 flex-col rounded-xl border border-(--home-sage) bg-white p-4",
  "[&>div]:flex [&>div]:grow [&>div]:flex-col [&>div]:rounded-none [&>div]:border-0 [&>div]:p-0 [&>div]:shadow-none!",
  "[&>div]:translate-y-0! [&>div>div:first-child]:hidden",
  "[&>div>div:nth-child(2)>div:first-child]:flex [&>div>div:nth-child(2)>div:first-child]:flex-col [&>div>div:nth-child(2)>div:first-child]:items-center",
  "[&_img]:size-16 [&_img]:border-(--home-sage) [&>div>div:nth-child(2)>div:first-child>div:first-child:not(:last-child)]:size-16",
  "[&>div>div:nth-child(2)>div:first-child>div:last-child]:static [&>div>div:nth-child(2)>div:first-child>div:last-child]:mt-2",
  "[&>div>div:nth-child(2)>div:first-child>div:last-child>span]:bg-(--home-sage) [&>div>div:nth-child(2)>div:first-child>div:last-child>span]:px-2 [&>div>div:nth-child(2)>div:first-child>div:last-child>span]:py-1 [&>div>div:nth-child(2)>div:first-child>div:last-child>span]:text-xs [&>div>div:nth-child(2)>div:first-child>div:last-child>span]:text-(--home-green) [&>div>div:nth-child(2)>div:first-child>div:last-child>span]:shadow-none",
  "[&>div>div:nth-child(2)>div:last-child]:mt-2 [&_h3]:text-base [&_h3]:text-(--home-ink)",
  "[&>div>div:nth-child(3)]:mb-2 [&>div>div:nth-child(3)]:mt-auto [&>div>div:nth-child(3)]:border-0",
  "[&>div>div:last-child]:mb-2 [&>div>div:last-child>a]:hidden [&>div>div:last-child>div]:justify-center",
  "[&_a[href^=mailto]]:size-8 [&_a[href^=mailto]]:flex-none [&_a[href^=mailto]]:p-0",
  "[&_a[target]]:size-8 [&_a[target]]:flex-none [&_a[target]]:p-0",
].join(" ");

function dialablePhone(phone: string) {
  return phone.replace(/[০-৯]/g, (digit) => String(digit.charCodeAt(0) - "০".charCodeAt(0))).replace(/[^\d+]/g, "");
}

export function Home() {
  const notices = noticesData.notices.slice(0, 4).map((n) => ({
    ...n,
    category: n.category as "ramadan" | "general" | "emergency",
  }));
  const featuredNotice = notices.find((notice) => notice.category === "emergency") ?? notices[0];
  const events = eventsData.events.slice(0, 3);
  const imamAndMuazzin = committeeData.imamStaff.slice(0, 4);
  const galleryItems = galleryData.items.slice(0, 5);
  const services = servicesData.services;
  const heroImages = [images.mosqueCover, images.mosque_construction, images.mimbar];
  const [currentImage, setCurrentImage] = useState(0);
  const [showFullPrayerTimes, setShowFullPrayerTimes] = useState(false);
  const [serviceScrollEdge, setServiceScrollEdge] = useState<"start" | "middle" | "end">("start");
  const serviceList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollServices = (direction: -1 | 1) => {
    const list = serviceList.current;
    if (list) list.scrollBy({ left: direction * list.clientWidth });
  };

  return (
    <div className="min-h-screen bg-(--home-paper) font-sans text-(--home-ink) [--home-ink:#14231F] [--home-green:#0F3D33] [--home-green-2:#1E5B4C] [--home-sage:#E3ECE6] [--home-paper:#F6F8F5] [--home-brass:#B5892D] [--font-display:Georgia,'Noto_Serif_Bengali','Bangla_MN','Shonar_Bangla',serif]">
      <section className="relative isolate overflow-hidden bg-(--home-green) text-white">
        {heroImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Mosque"
            aria-hidden={index !== currentImage}
            className={`absolute inset-0 h-full w-full object-cover object-center brightness-110 contrast-105 transition-opacity duration-[1000ms] motion-reduce:transition-none
              ${index === currentImage ? "scale-105 opacity-100" : "opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-[#0B2D25]/98 via-(--home-green)/90 to-(--home-green)/55" />

        <div className={`${containerClass} relative grid gap-x-10 gap-y-5 py-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:items-center lg:gap-x-16 lg:py-16`}>
          <div className="space-y-5">
            <h1 className="max-w-2xl text-4xl leading-[1.22] font-semibold sm:text-5xl xl:text-6xl">
              সাগরদী কান্দাপাড়া{" "}
              <span className="text-[#F0D297]">বাইতুল মামুর</span> জামে মসজিদ
            </h1>
            <p className="flex items-start gap-2 text-base text-(--home-sage) lg:text-lg">
              <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#F0D297]" />
              {address}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/prayer-times" className={goldLinkClass}>
                নামাজের সময় দেখুন
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                to="/donation"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/65 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-white"
              >
                দান করুন
              </Link>
            </div>
            <div className="flex gap-2 pt-1" aria-hidden="true">
              {heroImages.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all motion-reduce:transition-none ${i === currentImage ? "w-7 bg-[#F0D297]" : "w-3 bg-white/45"}`}
                />
              ))}
            </div>
          </div>

          <HomePrayerCard />
          <details
            className="group md:col-span-2"
            onToggle={(event) => {
              if (event.currentTarget.open) setShowFullPrayerTimes(true);
            }}
          >
            <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 rounded px-1 text-sm font-medium text-white hover:underline focus-visible:outline-2 focus-visible:outline-white md:ml-auto [&::-webkit-details-marker]:hidden">
              সম্পূর্ণ নামাজের সময়সূচি
              <ChevronDown aria-hidden="true" className="size-4 group-open:rotate-180" />
            </summary>
            {showFullPrayerTimes && (
              <div className="mt-4 overflow-x-auto text-(--home-ink)">
                <PrayerTimes />
              </div>
            )}
          </details>
        </div>
      </section>

      <div className="border-b border-(--home-sage) bg-white">
        <div className={`${containerClass} flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2.5 text-sm text-(--home-green)`}>
          <p className="flex items-center gap-2">
            <MapPin aria-hidden="true" className="size-4 shrink-0" />
            {address}
          </p>
          <a href="tel:01757705728" className="inline-flex items-center gap-2 rounded py-1 hover:underline">
            <Phone aria-hidden="true" className="size-4 shrink-0" />
            মসজিদ অফিস: ০১৭৫৭-৭০৫৭২৮
          </a>
        </div>
      </div>

      <div className={`${containerClass} grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-14 lg:py-16`}>
        <section aria-labelledby="home-notices" className="min-w-0 lg:col-span-2">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h2 id="home-notices" className="text-2xl font-semibold md:text-3xl">
              সর্বশেষ নোটিশ
            </h2>
            <Link to="/notices" className={textLinkClass}>
              সব দেখুন{" "}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          {featuredNotice && (
            <div className="[&>div]:rounded-xl [&>div]:border-red-700 [&>div]:bg-red-50 [&>div]:shadow-none! [&_h3]:font-semibold [&_h3]:text-(--home-ink)">
              <NoticeCard {...featuredNotice} />
            </div>
          )}
          <ul className="mt-2 divide-y divide-(--home-sage)">
            {notices.filter((notice) => notice !== featuredNotice).map((notice) => (
              <li key={notice.title} className={noticeRowClass}>
                <NoticeCard {...notice} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="home-events" className="flex min-w-0 flex-col self-start rounded-2xl bg-(--home-green) p-5 text-white sm:p-6 lg:p-7">
          <h2 id="home-events" className="text-2xl font-semibold text-[#F0D297]">
            আসন্ন কার্যক্রম
          </h2>
          <p className="mt-1.5 text-sm text-(--home-sage)">
            ইকামতের সাথে আপনার দ্বীনি কার্যক্রম পরিচালনা করুন
          </p>
          <ol className="mt-5 mb-6 space-y-4 border-l border-[#F0D297]/40 pl-4">
            {events.slice(0, 2).map((event) => (
              <li key={event.id} className="relative before:absolute before:top-2 before:-left-[21px] before:size-[9px] before:rounded-full before:bg-[#F0D297]">
                <EventCard
                  event={event}
                  className="rounded-none! border-0! bg-transparent! p-0! shadow-none! [--color-text:white] [--color-text-muted:var(--home-sage)] [&>div:first-child:has(img)]:float-right [&>div:first-child:has(img)]:ml-2 [&>div:first-child:has(img)]:mb-1 [&>div:first-child:has(img)]:w-14 [&_img]:h-12 [&_h3]:text-base [&_h3~div]:mt-1 [&_h3~div]:gap-x-2 [&_h3~div]:gap-y-0 [&_h3~div]:text-xs [&_h3~div_svg]:size-3"
                />
              </li>
            ))}
          </ol>
          <Link
            to="/events"
            className="mt-auto inline-flex min-h-11 items-center justify-center rounded-lg border border-white/50 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-white/15 focus-visible:outline-white"
          >
            সব কার্যক্রম দেখুন →
          </Link>
        </section>
      </div>

      <section className="bg-(--home-sage)">
        <div className={`${containerClass} py-11 lg:py-14`}>
          <HomeDonationReport
            summary={donationData.summary}
            monthlyReport={donationData.monthlyReport}
            introduction={
              <SectionTitle
                title="দান সংক্ষেপ"
                subtitle="মাসিক আয়, ব্যয় ও ব্যালেন্স—পূর্ণ স্বচ্ছতা।"
                className={sectionTitleClass}
              />
            }
            reportLink={
              <Button
                asChild
                to="/monthly-report"
                variant="primary"
                className="rounded-lg bg-(--home-green)! px-5 text-white hover:bg-(--home-green-2)!"
              >
                পূর্ণ রিপোর্ট দেখুন <ArrowRight aria-hidden="true" className="ml-2 size-4" />
              </Button>
            }
            fallback={<DonationSummaryCard summary={donationData.summary} showCta={false} />}
          />
        </div>
      </section>

      <div className={`${containerClass} space-y-12 py-12 lg:space-y-16 lg:py-16`}>
        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <SectionTitle
              title="ইমাম ও মুয়াযযিন"
              subtitle="সালাত পরিচালনা, আযান এবং দ্বীনি শিক্ষার দায়িত্বে নিয়োজিত সম্মানিত ব্যক্তিবর্গ"
              className={sectionTitleClass}
            />
            <Link to="/committee" className={textLinkClass}>
              সকল স্টাফ দেখুন
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {imamAndMuazzin.map((member, index) => (
              <div key={`${member.name}-${member.role}-${member.phone}-${index}`} className={profileCardClass}>
                <ProfileCard {...member} />
                <a
                  href={`tel:${dialablePhone(member.phone)}`}
                  aria-label={`${member.name.trim()} – কল করুন ${member.phone}`}
                  className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-(--home-sage) px-2 text-sm font-semibold text-(--home-green) transition-colors hover:bg-(--home-green) hover:text-white"
                >
                  <Phone aria-hidden="true" className="size-4" />
                  {member.phone}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-end justify-between gap-3">
            <SectionTitle
              title="সেবাসমূহ / Services"
              subtitle="মসজিদের মাধ্যমে পরিচালিত জনকল্যাণমূলক কাজ"
              className={sectionTitleClass}
            />
            {services.length > 5 && (
              <div className="hidden gap-2 lg:flex">
                <button
                  type="button"
                  aria-label="আগের সেবাগুলো"
                  aria-controls="home-service-list"
                  disabled={serviceScrollEdge === "start"}
                  onClick={() => scrollServices(-1)}
                  className={serviceControlClass}
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="পরের সেবাগুলো"
                  aria-controls="home-service-list"
                  disabled={serviceScrollEdge === "end"}
                  onClick={() => scrollServices(1)}
                  className={serviceControlClass}
                >
                  <ArrowRight aria-hidden="true" className="size-4" />
                </button>
              </div>
            )}
          </div>
          <div
            id="home-service-list"
            ref={serviceList}
            role="region"
            aria-label="সেবাসমূহ / Services"
            tabIndex={0}
            onScroll={({ currentTarget }) => {
              const { clientWidth, scrollLeft, scrollWidth } = currentTarget;
              if (scrollLeft <= 1) {
                setServiceScrollEdge("start");
              } else {
                setServiceScrollEdge(scrollLeft + clientWidth >= scrollWidth - 1 ? "end" : "middle");
              }
            }}
            className="mt-5 overflow-hidden rounded-xl border border-(--home-sage) bg-white focus-visible:outline-2 focus-visible:outline-(--home-green) motion-safe:scroll-smooth lg:overflow-x-auto lg:[scrollbar-color:var(--home-green-2)_var(--home-sage)] lg:[scrollbar-width:thin]"
          >
            <ul className="grid grid-cols-2 lg:grid-flow-col lg:grid-cols-none lg:auto-cols-[20%]">
              {services.map((service) => {
                const Icon = serviceIcons[service.icon] ?? Megaphone;
                return (
                  <li
                    key={service.title}
                    className="min-w-0 border-b border-(--home-sage) px-3 py-4 even:border-l sm:px-5 lg:border-b-0 lg:border-l lg:py-6 lg:first:border-l-0"
                  >
                    <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-(--home-sage) text-(--home-green)">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="font-semibold leading-snug">{service.title}</h3>
                    <p className="mt-1 text-sm font-medium text-(--home-green)">{service.titleBn}</p>
                    <p className="mt-2 text-sm leading-relaxed text-(--home-ink)/75">{service.description}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <SectionTitle
              title="গ্যালারি / Gallery"
              subtitle="মসজিদের সুন্দর মুহূর্তসমূহ"
              className={sectionTitleClass}
            />
            <Link
              to="/gallery"
              className="inline-flex min-h-11 items-center rounded-lg border border-(--home-green) px-4 text-sm font-semibold text-(--home-green) transition-colors hover:bg-(--home-green) hover:text-white"
            >
              পূর্ণ গ্যালারি →
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 md:auto-rows-fr lg:grid-cols-4">
            {galleryItems.map((item, index) => (
              <figure
                key={item.id}
                className={`group relative isolate overflow-hidden rounded-xl bg-(--home-green) text-white ${index === 0 ? "aspect-[4/3] md:col-span-2 lg:row-span-2 lg:aspect-auto" : "aspect-[16/10]"}`}
              >
                <img
                  src={getImgSrc(item.src)}
                  alt={item.alt}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-(--home-ink) to-transparent px-4 pt-8 pb-3 text-sm font-medium">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>

      <section className="bg-(--home-green) text-white">
        <div className={`${containerClass} flex flex-wrap items-center justify-between gap-4 py-8 lg:py-10`}>
          <h2 className="text-2xl font-semibold md:text-3xl">মসজিদের কাজে পাশে থাকুন</h2>
          <Link to="/donation" className={goldLinkClass}>
            দান করুন <Heart aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
