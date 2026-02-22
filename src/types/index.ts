// Prayer times
export interface PrayerTime {
  id: string
  name: string
  nameBn?: string
  azan: string
  iqamah: string
  isJumuah?: boolean
}

// Notices
export type NoticeCategory = 'ramadan' | 'general' | 'emergency' | 'all'
export interface Notice {
  id: string
  title: string
  titleBn?: string
  date: string
  category: NoticeCategory
  excerpt: string
  content?: string
}

// Donation
export interface DonationSummary {
  monthCollected: number
  monthExpense: number
  currentBalance: number
  currency: string
  lastUpdated: string
}

export interface DonationMonthlyRow {
  month: string
  collected: number
  expense: number
  balance: number
}

export type DonationMethodType = 'bkash' | 'nagad' | 'bank' | 'cash'
export interface DonationMethod {
  id: string
  type: DonationMethodType
  name: string
  number?: string
  accountName?: string
  bankName?: string
  branch?: string
  qrPlaceholder?: boolean
}

export interface DonationCategory {
  id: string
  name: string
  nameBn?: string
  description?: string
}

// Committee
export interface CommitteeMember {
  id: string
  name: string
  nameBn?: string
  designation: string
  phone?: string
  photo?: string
  isChairman?: boolean
  isSecretary?: boolean
}

// Events
export interface Event {
  id: string
  name: string
  nameBn?: string
  date: string
  time: string
  location?: string
  description?: string
}

// Gallery
export type GalleryCategory = 'all' | 'programs' | 'construction' | 'mosque'
export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: GalleryCategory
  caption?: string
}

// Services
export interface Service {
  id: string
  title: string
  titleBn?: string
  description: string
  icon: string
  contact?: string
}

// FAQ
export interface FAQItem {
  id: string
  question: string
  answer: string
}

// Contact form
export interface ContactFormData {
  name: string
  phone: string
  message: string
}
