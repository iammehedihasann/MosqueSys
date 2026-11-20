import { House, Images, Phone, Clock3, Bell, HandHeart, ChartNoAxesCombined, Receipt, Users, HeartHandshake, MapPin, CalendarDays, ShieldPlus, Sprout } from "lucide-react";
export const primaryLinks = [
  { path: "/", label: "হোম", Icon: House },
  { path: "/gallery", label: "গ্যালারি", Icon: Images },
  { path: "/contact", label: "যোগাযোগ", Icon: Phone },
];
export const navigationGroups = [
  { key: "mosque", label: "মসজিদ", description: "ইবাদত, সেবা ও স্বচ্ছ হিসাব", items: [
    { path: "/prayer-times", label: "নামাজের সময়", Icon: Clock3 },
    { path: "/notices", label: "নোটিশ", Icon: Bell },
    { path: "/donation", label: "দান করুন", Icon: HandHeart },
    { path: "/monthly-report", label: "মাসিক রিপোর্ট", Icon: ChartNoAxesCombined },
    { path: "/expenses", label: "খরচের হিসাব", Icon: Receipt },
    { path: "/committee", label: "কমিটি", Icon: Users },
    { path: "/services", label: "সেবা", Icon: HeartHandshake },
  ] },
  { key: "community", label: "কমিউনিটি", description: "একসাথে সুন্দর সমাজ গড়ি", items: [
    { path: "/community", label: "কমিউনিটি তথ্য", Icon: MapPin },
    { path: "/events", label: "অনুষ্ঠান", Icon: CalendarDays },
    { path: "/emergency", label: "জরুরি", Icon: ShieldPlus },
    { path: "/charity", label: "দাতব্য", Icon: Sprout },
  ] },
];
