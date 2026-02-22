import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const SUBJECTS = [
  { value: "general", label: "সাধারণ প্রশ্ন" },
  { value: "donation", label: "দান সংক্রান্ত" },
  { value: "service", label: "সেবা নিতে চাই" },
  { value: "complaint", label: "অভিযোগ" },
  { value: "suggestion", label: "পরামর্শ" },
  { value: "other", label: "অন্যান্য" },
];

function InfoCard({
  icon,
  titleBn,
  titleEn,
  children,
}: {
  icon: React.ReactNode;
  titleBn: string;
  titleEn: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground">
            {titleBn} <span className="text-muted-foreground">/ {titleEn}</span>
          </h3>
          <div className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Minimal client validation (still keep HTML required)
    if (!formData.name.trim() || !formData.phone.trim() || !formData.subject || !formData.message.trim()) {
      toast.error("অনুগ্রহ করে প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    toast.success("আপনার বার্তা পাঠানো হয়েছে। শীঘ্রই আমরা যোগাযোগ করব।");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Header */}
        <header className="mx-auto mb-10 max-w-2xl text-center">


          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            যোগাযোগ করুন
          </h1>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            Contact Us — যেকোনো প্রশ্ন, সেবা, দান বা পরামর্শের জন্য আমাদের লিখুন।
          </p>
        </header>

        {/* Main grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEFT: Info */}
          <section aria-label="Contact information" className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">
              যোগাযোগের তথ্য <span className="text-muted-foreground">/ Contact Info</span>
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard
                icon={<MapPin className="h-6 w-6" />}
                titleBn="ঠিকানা"
                titleEn="Address"
              >
                <p className="text-foreground/90">কেন্দ্রীয় জামে মসজিদ</p>
                <p>মিরপুর-১০, রোড নং ১২</p>
                <p>ঢাকা-১২১৬, বাংলাদেশ</p>
              </InfoCard>

              <InfoCard
                icon={<Phone className="h-6 w-6" />}
                titleBn="ফোন"
                titleEn="Phone"
              >
                <p>
                  মসজিদ অফিস:{" "}
                  <a
                    className="font-medium text-foreground hover:text-primary"
                    href="tel:01712345678"
                  >
                    ০১৭১২-৩৪৫৬৭৮
                  </a>
                </p>
                <p>
                  ইমাম:{" "}
                  <a className="font-medium text-foreground hover:text-primary" href="tel:01712111111">
                    ০১৭১২-১১১১১১
                  </a>
                </p>
                <p>
                  জরুরি:{" "}
                  <a className="font-medium text-foreground hover:text-primary" href="tel:01712999999">
                    ০১৭১২-৯৯৯৯৯৯
                  </a>
                </p>
              </InfoCard>

              <InfoCard
                icon={<Mail className="h-6 w-6" />}
                titleBn="ইমেইল"
                titleEn="Email"
              >
                <p>
                  <a className="font-medium text-foreground hover:text-primary" href="mailto:info@centralmosque.com">
                    info@centralmosque.com
                  </a>
                </p>
                <p>
                  <a className="font-medium text-foreground hover:text-primary" href="mailto:committee@centralmosque.com">
                    committee@centralmosque.com
                  </a>
                </p>
              </InfoCard>

              <InfoCard
                icon={<Clock className="h-6 w-6" />}
                titleBn="অফিস সময়"
                titleEn="Office Hours"
              >
                <p className="text-foreground/90">শনিবার - বৃহস্পতিবার</p>
                <p>ফজরের পর - এশা পর্যন্ত</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  শুক্রবার: জুমআর পর থেকে
                </p>
              </InfoCard>
            </div>
          </section>

          {/* RIGHT: Form */}
          <section aria-label="Contact form">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  আমাদের লিখুন <span className="text-muted-foreground">/ Send Message</span>
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  * চিহ্নিত ঘরগুলো আবশ্যক (required)
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      নাম <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      placeholder="আপনার নাম লিখুন"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      ইমেইল <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                      মোবাইল নাম্বার <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      autoComplete="tel"
                      placeholder="০১৭১২-৩৪৫৬৭৮"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      নম্বর সঠিক হলে আমরা দ্রুত যোগাযোগ করতে পারব।
                    </p>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium text-foreground">
                      বিষয় <span className="text-destructive">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                    >
                      <option value="">বিষয় নির্বাচন করুন</option>
                      {SUBJECTS.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    বার্তা <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="আপনার বার্তা লিখুন..."
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-offset-background focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  বার্তা পাঠান
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  By sending, you agree we may contact you back via phone/email.
                </p>
              </form>
            </div>
          </section>
        </div>

        {/* Map */}
        {/* <section aria-label="Map" className="mt-12">
          <div className="mx-auto mb-6 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-foreground">
              মানচিত্র <span className="text-muted-foreground">/ Map</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              লোকেশন বুঝতে সুবিধার জন্য ম্যাপ যুক্ত করুন।
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="aspect-[16/9] bg-muted/40 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="mx-auto mb-4 h-14 w-14 text-primary" />
                <p className="text-sm font-medium text-foreground">Google Map Embed</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  কেন্দ্রীয় জামে মসজিদ, মিরপুর-১০, ঢাকা
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* Visit Info */}
        <section aria-label="Before visiting" className="mt-8">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-blue-900">
              মসজিদে আসার আগে <span className="text-blue-800/80">/ Before Visiting</span>
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              {[
                "নামাজের সময় জানতে নামাজের সময়সূচী পেজ দেখুন",
                "বিশেষ সেবার জন্য আগে থেকে যোগাযোগ করুন",
                "জুমআর দিন একটু আগে আসার চেষ্টা করুন",
                "পার্কিং সুবিধা সীমিত, সম্ভব হলে গণপরিবহন ব্যবহার করুন",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}