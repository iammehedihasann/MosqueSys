import { useState, useMemo } from "react";
// import { SectionTitle } from '@/components/ui/SectionTitle'
import { Modal } from "@/components/ui/Modal";
import galleryData from "../data/gallery.json";
import type { GalleryItem, GalleryCategory } from "../types";
import { cn } from "../utils/cn";
import { getImgSrc } from "../utils/getImgSrc";

const tabs: { value: GalleryCategory; label: string }[] = [
  { value: "all", label: "সব" },
  { value: "programs", label: "অনুষ্ঠান" },
  { value: "construction", label: "নির্মাণ" },
  { value: "mosque", label: "মসজিদ" },
];

export function GalleryPage() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>("all");
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const items = useMemo(() => {
    const list = galleryData.items as GalleryItem[];
    if (activeTab === "all") return list;
    return list.filter((item) => item.category === activeTab);
  }, [activeTab]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 ">
      <div className="mb-12 text-center">
        {" "}
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          {" "}
          মসজিদের স্মৃতিচিত্র{" "}
        </span>{" "}
        <h1 className="mt-5 text-4xl font-bold text-primary md:text-5xl">
          {" "}
          ছবি গ্যালারি{" "}
        </h1>{" "}
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          মসজিদের বিভিন্ন কার্যক্রম, উন্নয়ন কাজ এবং স্মরণীয় মুহূর্তসমূহের
          নির্বাচিত আলোকচিত্র।
        </p>
      </div>
      <div
        className="mb-10 flex flex-wrap justify-center gap-3"
        role="tablist"
        aria-label="Gallery categories"
      >
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.value}
            className={cn(
              "min-h-[44px] rounded-2xl px-5 py-2.5 text-lg font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
              activeTab === tab.value
                ? "bg-emerald-600 text-white shadow-md"
                : "border border-gray-200 bg-white text-gray-600 hover:border-emerald-300 hover:text-emerald-600",
            )}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}{" "}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightboxItem(item)}
            className=" group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] "
          >
            {/* Image */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={getImgSrc(item.src)}
                alt={item.alt}
                loading="lazy"
                className=" h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 "
              />
            </div>{" "}
            {/* Overlay */}
            <div className=" absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 " />
            {/* Caption */}{" "}
            <div className=" absolute bottom-0 left-0 right-0 p-4 text-white translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 ">
              {" "}
              <p className="text-sm font-semibold line-clamp-2">
                {" "}
                {item.caption || item.alt}{" "}
              </p>{" "}
            </div>{" "}
          </button>
        ))}{" "}
      </div>
      {items.length === 0 && (
        <div className="py-16 text-center">
          {" "}
          <p className="text-gray-500"> এই ক্যাটাগরিতে কোনো ছবি নেই। </p>{" "}
        </div>
      )}

      <Modal isOpen={!!lightboxItem} onClose={() => setLightboxItem(null)}>
        {lightboxItem && (
          <div className="space-y-2">
            <img
              src={getImgSrc(lightboxItem.src)}
              alt={lightboxItem.alt}
              className="w-full rounded-2xl"
            />
            {lightboxItem.caption && (
              <p className="text-sm text-[var(--color-text-muted)]">
                {lightboxItem.caption}
              </p>
            )}
          </div>
        )}
      </Modal>
      <div className="mt-20 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-8 text-center md:p-12">
        {" "}
        <h3 className="mb-4 text-3xl font-bold text-primary">
          {" "}
          ছবি যোগ করুন{" "}
        </h3>{" "}
        <p className="mx-auto mb-6 max-w-2xl text-gray-700">
          {" "}
          আপনার তোলা মসজিদের সুন্দর মুহূর্ত, অনুষ্ঠান অথবা উন্নয়ন কাজের ছবি
          আমাদের সাথে শেয়ার করতে পারেন। ভালো ছবি গ্যালারিতে যোগ করা হবে।{" "}
        </p>{" "}
        <p className="text-sm text-gray-600 font-bold">
          {" "}
          যোগাযোগ: ০১৭৫৭-৭০৫৭২৮ <br></br> অথবা <br></br> info@centralmosque.com{" "}
        </p>{" "}
      </div>
    </div>
  );
}
