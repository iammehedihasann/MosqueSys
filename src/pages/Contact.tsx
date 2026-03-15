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

          <div className="mt-2 text-sm leading-relaxed text-muted-foreground break-words">
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

    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.subject ||
      !formData.message.trim()
    ) {
      toast.error("অনুগ্রহ করে প্রয়োজনীয় তথ্য পূরণ করুন।");
      return;
    }

    toast.success("আপনার বার্তা পাঠানো হয়েছে। শীঘ্রই আমরা যোগাযোগ করব।");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

        {/* Header */}
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
            যোগাযোগ করুন
          </h1>

          <p className="mt-3 text-sm sm:text-base text-muted-foreground">
            Contact Us — যেকোনো প্রশ্ন, সেবা, দান বা পরামর্শের জন্য আমাদের লিখুন।
          </p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">

          {/* Contact Info */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground">
              যোগাযোগের তথ্য
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">

              <InfoCard
                icon={<MapPin className="h-6 w-6" />}
                titleBn="ঠিকানা"
                titleEn="Address"
              >
                <p className="text-foreground/90">বায়তুল মামুর জামে মসজিদ</p>
                <p>কান্দাপাড়া, সাগরদী, মাধবদী</p>
                <p>ঢাকা, বাংলাদেশ</p>
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
                    href="tel:01757705728"
                  >
                    ০১৭-৫৭৭০৫৭২৮
                  </a>
                </p>

                <p>
                  ইমাম:{" "}
                  <a
                    className="font-medium text-foreground hover:text-primary"
                    href="tel:01905878351"
                  >
                    ০১৯০৫-৮৭৮৩৫১
                  </a>
                </p>

                <p>
                  জরুরি:{" "}
                  <a
                    className="font-medium text-foreground hover:text-primary"
                    href="tel:01757705728"
                  >
                    ০১৭-৫৭৭০৫৭২৮
                  </a>
                </p>
              </InfoCard>

              <InfoCard
                icon={<Mail className="h-6 w-6" />}
                titleBn="ইমেইল"
                titleEn="Email"
              >
                <p>
                  <a
                    className="font-medium text-foreground hover:text-primary"
                    href="mailto:Kandaparamosque@gmail.com"
                  >
                    Kandaparamosque@gmail.com
                  </a>
                </p>

                <p>
                  <a
                    className="font-medium text-foreground hover:text-primary"
                    href="mailto:mosquecommittee4280@gmail.com"
                  >
                    mosquecommittee4280@gmail.com
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

          {/* Contact Form */}
          <section>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-foreground">
                  আমাদের লিখুন
                  <span className="text-muted-foreground"> / Send Message</span>
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  * চিহ্নিত ঘরগুলো আবশ্যক
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      নাম *
                    </label>

                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="আপনার নাম লিখুন"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      ইমেইল
                    </label>

                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Phone + Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      মোবাইল নাম্বার *
                    </label>

                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="০১৭১২-৩৪৫৬৭৮"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      বিষয় *
                    </label>

                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary"
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
                  <label className="mb-2 block text-sm font-medium">
                    বার্তা *
                  </label>

                  <textarea
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="আপনার বার্তা লিখুন..."
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm sm:text-base outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-95"
                >
                  বার্তা পাঠান
                </button>
              </form>
            </div>
          </section>
        </div>

        {/* Visit Info */}
        <section className="mt-10">
          <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">

            <h3 className="text-lg font-semibold text-blue-900">
              মসজিদে আসার আগে
              <span className="text-blue-800/80"> / Before Visiting</span>
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-slate-700">

              {[
                "নামাজের সময় জানতে নামাজের সময়সূচী পেজ দেখুন",
                "বিশেষ সেবার জন্য আগে থেকে যোগাযোগ করুন",
                "জুমআর দিন একটু আগে আসার চেষ্টা করুন",
                "পার্কিং সুবিধা সীমিত, সম্ভব হলে গণপরিবহন ব্যবহার করুন",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
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
