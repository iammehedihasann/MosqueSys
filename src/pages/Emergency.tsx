import { AlertTriangle, PhoneCall } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { EmergencyContactCard } from "@/components/shared/EmergencyContactCard";
import emergencyContactsData from "@/data/emergencyContacts.json";
import type { EmergencyContact, EmergencyServiceType } from "@/types";

const toBnDigits = (value: string | number) => {
  const map = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return value
    .toString()
    .replace(/\d/g, (digit) => map[Number(digit)]);
};

const typeOrder: EmergencyServiceType[] = [
  "disaster",
  "police",
  "hospital",
  "ambulance",
  "fire",
  "blood",
  "electricity",
  "women",
];

export function Emergency() {
  const contacts = emergencyContactsData.contacts as EmergencyContact[];
  const sorted = [...contacts].sort(
    (a, b) => typeOrder.indexOf(a.serviceType) - typeOrder.indexOf(b.serviceType),
  );
  const hotline = contacts.find(
    (contact) => contact.serviceType === "disaster",
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg)] py-8 md:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-10 shadow-[var(--shadow-section)]">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)]">জরুরি যোগাযোগ</p>
              <h1 className="mt-2 text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
                জরুরি অবস্থায় দ্রুত সহায়তার জন্য প্রস্তুত নম্বরসমূহ
              </h1>
              <p className="mt-3 text-sm text-[var(--color-text-muted)] md:text-base">
                প্রয়োজনের সময় দ্রুত যোগাযোগ করার জন্য এই তালিকা সংরক্ষণ করে রাখুন।
              </p>
            </div>
            {hotline && (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <p className="text-sm text-red-700">জাতীয় জরুরি সেবা</p>
                <p className="mt-1 text-3xl font-semibold text-red-700">
                  {toBnDigits(hotline.phone)}
                </p>
                <a
                  href={`tel:${hotline.phone.replace(/\s/g, "")}`}
                  className="mt-3 inline-flex min-h-[44px] items-center justify-center rounded-md bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
                >
                  এখনই কল করুন
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Quick Tips */}
        <section className="mt-10 rounded-3xl border border-[var(--color-border)] bg-white p-6 md:p-8 shadow-[var(--shadow-section)]">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-amber-50 p-3 text-amber-700">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--color-text)]">জরুরি কল করার সময় যা বলবেন</h2>
              <ul className="mt-3 space-y-2 text-sm text-[var(--color-text-muted)]">
                <li>ঘটনার ধরন সংক্ষেপে বলুন (অগ্নিকাণ্ড, অসুস্থতা, দুর্ঘটনা)।</li>
                <li>সঠিক ঠিকানা বা পরিচিত স্থানের নাম বলুন।</li>
                <li>যোগাযোগের জন্য আপনার মোবাইল নম্বর দিন।</li>
                <li>পরিস্থিতি শান্তভাবে বোঝান এবং নির্দেশনা অনুসরণ করুন।</li>
              </ul>
            </div>
          </div>
        </section>

        {/* All Contacts */}
        <section className="mt-12">
          <SectionTitle
            title="সমস্ত জরুরি যোগাযোগ তালিকা"
            subtitle="স্থানীয় ও জাতীয় জরুরি সেবার হালনাগাদ নম্বর"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((contact) => (
              <EmergencyContactCard
                key={contact.id}
                contact={contact}
                detailPath={`/emergency/${contact.id}`}
              />
            ))}
          </div>
          <p className="mt-6 text-sm text-[var(--color-text-muted)]">
            অনুগ্রহ করে স্থানীয় নম্বরগুলো নিয়মিত হালনাগাদ করুন।
          </p>
        </section>
      </div>
    </div>
  );
}
