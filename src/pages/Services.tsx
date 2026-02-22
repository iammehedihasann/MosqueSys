import { useState } from 'react'
import {
  Heart,
  BookOpen,
  Users,
  Home,
  GraduationCap,
  Utensils,
  Radio,
  HandHeart,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import servicesData from '../data/services.json'
import type { Service, FAQItem } from '../types'
import { cn } from '../utils/cn'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  heart: Heart,
  'book-open': BookOpen,
  utensils: Utensils,
  'hand-heart': HandHeart,
  users: Users,
  'graduation-cap': GraduationCap,
  radio: Radio,
  home: Home,
}

export function Services() {
  const services = servicesData.services as Service[]
  const faqs = (servicesData.faqs ?? []) as FAQItem[]
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-background py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl text-[var(--color-primary)] mb-4 font-semibold">আমাদের সেবাসমূহ</h1>
          <p className="text-base md:text-lg text-[var(--color-text-muted)] mb-2">Our Services</p>
          <p className="text-sm md:text-base text-[var(--color-text-muted)] max-w-2xl mx-auto">
            মসজিদ শুধু ইবাদতের স্থান নয়, সমাজসেবার কেন্দ্র। আমরা বিভিন্ন সেবা প্রদান করে থাকি।
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Heart
            return (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 md:p-8 border-l-4 border-primary"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full shrink-0 text-primary">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl text-[var(--color-text)] mb-1 font-semibold">
                      {service.titleBn ?? service.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)]">{service.title}</p>
                  </div>
                </div>
                <p className="text-[var(--color-text-muted)] mb-4 leading-relaxed">{service.description}</p>
                {service.contact && (
                  <a
                    href={`tel:${service.contact.replace(/\s/g, '')}`}
                    className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline transition-colors"
                  >
                    <span>যোগাযোগ:</span>
                    <span>{service.contact}</span>
                  </a>
                )}
              </div>
            )
          })}
        </div>

        {/* Special Programs */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl text-[var(--color-primary)] mb-6 font-semibold">
            বিশেষ কার্যক্রম
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className=" bg-green-100 dark:from-green-950/30 dark:to-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800/50">
              <h3 className="text-lg text-black  font-semibold mb-3">রমজান প্রোগ্রাম</h3>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• তারাবীহ নামাজ</li>
                <li>• সেহরি ও ইফতার</li>
                <li>• তাফসির ক্লাস</li>
                <li>• লাইলাতুল কদর</li>
              </ul>
            </div>
            <div className="bg-blue-200 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800/50">
              <h3 className="text-lg text-lg text-black font-semibold mb-3">ঈদ উৎসব</h3>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• ঈদ জামাত</li>
                <li>• শিশু মেলা</li>
                <li>• দরিদ্র সহায়তা</li>
                <li>• কুরবানী ব্যবস্থা</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800/50">
              <h3 className="text-lg text-lg text-black font-semibold mb-3">সাপ্তাহিক প্রোগ্রাম</h3>
              <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>• শুক্রবার ওয়াজ</li>
                <li>• কুরআন তালিম</li>
                <li>• হাদিস পাঠ</li>
                <li>• দারস</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-4">প্রায়ই জিজ্ঞাসিত প্রশ্ন / FAQ</h2>
            <div className="space-y-2">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id
                return (
                  <div
                    key={faq.id}
                    className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-[var(--shadow-card)]"
                  >
                    <button
                      type="button"
                      className="flex w-full min-h-[48px] items-center justify-between gap-2 px-4 py-3 text-left font-medium text-[var(--color-text)] hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary)]"
                      onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${faq.id}`}
                      id={`faq-heading-${faq.id}`}
                    >
                      {faq.question}
                      {isOpen ? <ChevronUp className="h-5 w-5 shrink-0" /> : <ChevronDown className="h-5 w-5 shrink-0" />}
                    </button>
                    <div
                      id={`faq-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-heading-${faq.id}`}
                      className={cn('border-t border-[var(--color-border)]', isOpen ? 'block' : 'hidden')}
                    >
                      <p className="px-4 py-3 text-sm text-[var(--color-text-muted)] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* How to Get Service */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12">
          <h2 className="text-2xl text-[var(--color-primary)] mb-6 font-semibold">কীভাবে সেবা নেবেন</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-[var(--color-primary)]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[var(--color-primary)] font-semibold">১</span>
              </div>
              <h3 className="text-lg mb-2 font-medium text-[var(--color-text)]">যোগাযোগ করুন</h3>
              <p className="text-sm text-[var(--color-text-muted)]">
                সংশ্লিষ্ট বিভাগে ফোন করুন অথবা মসজিদে এসে যোগাযোগ করুন
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--color-primary)]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[var(--color-primary)] font-semibold">২</span>
              </div>
              <h3 className="text-lg mb-2 font-medium text-[var(--color-text)]">তথ্য প্রদান</h3>
              <p className="text-sm text-[var(--color-text-muted)]">প্রয়োজনীয় তথ্য ও নথিপত্র জমা দিন</p>
            </div>
            <div className="text-center">
              <div className="bg-[var(--color-primary)]/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-[var(--color-primary)] font-semibold">৩</span>
              </div>
              <h3 className="text-lg mb-2 font-medium text-[var(--color-text)]">সেবা গ্রহণ</h3>
              <p className="text-sm text-[var(--color-text-muted)]">নির্ধারিত সময়ে সেবা গ্রহণ করুন</p>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  )
}
