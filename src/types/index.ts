// Prayer times
export interface PrayerTime {
  id: string
  name: string
  nameBn?: string
  azan: string
  iqamah?: string
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
  monthCollected: number | string
  monthExpense: number | string
  currentBalance: number | string
  currency: string
  lastUpdated: string
}

export interface DonationMonthlyRow {
  month: string
  collected: number | string
  expense: number | string
  balance: number | string
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
  image?: string
  descriptionBn?: string
  organizerBn?: string
  contact?: string
  agendaBn?: string[]
  images?: string[]
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
  summaryBn?: string
  detailsBn?: string
  availabilityBn?: string
  eligibilityBn?: string[]
  requirementsBn?: string[]
  processBn?: string[]
  image?: string
  images?: string[]
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

// Charity Campaigns
export interface CharityCampaign {
  id: string
  titleBn: string
  descriptionBn: string
  goalAmount: number
  raisedAmount: number
  currency: string
  deadline: string
  beneficiaryBn?: string
  contact?: string
  activitiesBn?: string[]
  updatesBn?: string[]
  image?: string
  images?: string[]
}

// Community Places
export type CommunityPlaceCategory = 'madrasa' | 'school' | 'library' | 'eidgah' | 'health' | 'service'
export interface CommunityPlace {
  id: string
  name: string
  nameBn?: string
  category: CommunityPlaceCategory
  typeBn?: string
  addressBn: string
  establishedYearBn?: string
  contact?: string
  email?: string
  hoursBn?: string
  descriptionBn?: string
  highlightsBn?: string[]
  activitiesBn?: string[]
  weeklyActivitiesBn?: string[]
  monthlyActivitiesBn?: string[]
  specialEventsBn?: string[]
  moralEducationBn?: string[]
  facilitiesBn?: string[]
  image?: string
  images?: string[]
  mapUrl?: string
  mapPreviewImage?: string
  coursesBn?: string[]
  curriculumBn?: string[]
  principal?: CommunityPrincipal
  staff?: CommunityStaffMember[]
  studentsOverview?: CommunityStudentOverview
  classGroups?: CommunityClassGroup[]
  campusImages?: CommunityCampusGroup[]
  eventsBn?: CommunityActivityEvent[]
}

export interface CommunityPrincipal {
  nameBn: string
  designationBn: string
  qualificationBn: string
  photo?: string
}

export interface CommunityStaffMember {
  id: string
  nameBn: string
  roleBn: string
  subjectBn?: string
  qualificationBn?: string
  experienceBn?: string
  phone?: string
  photo?: string
}

export interface CommunityActivityEvent {
  id: string
  titleBn: string
  dateBn: string
  descriptionBn: string
}

export interface CommunityStudentOverview {
  total: number
  ageRangeBn: string
}

export interface CommunityClassGroup {
  id: string
  classNameBn: string
  ageRangeBn?: string
  students: CommunityStudent[]
}

export interface CommunityStudent {
  id: string
  nameBn: string
  photo?: string
}

export interface CommunityCampusGroup {
  id: string
  titleBn: string
  images: string[]
}

// Emergency Contacts
export type EmergencyServiceType = 'police' | 'hospital' | 'fire' | 'ambulance' | 'blood' | 'electricity' | 'disaster' | 'women'
export interface EmergencyContact {
  id: string
  nameBn: string
  serviceType: EmergencyServiceType
  phone: string
  alternatePhones?: string[]
  locationBn?: string
  availabilityBn?: string
  noteBn?: string
  servicesBn?: string[]
  instructionsBn?: string[]
  coverageBn?: string
  image?: string
}
