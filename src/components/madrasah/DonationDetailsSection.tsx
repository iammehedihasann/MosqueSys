interface DonationType {
  title: string;
  description: string;
}

interface PaymentMethod {
  name: string;
  number?: string;
}

interface DonationDetailsSectionProps {
  paymentMethods?: PaymentMethod[];
}

export function DonationDetailsSection({
  paymentMethods,
}: DonationDetailsSectionProps) {
  const donationTypes: DonationType[] = [
    {
      title: "যাকাত",
      description:
        "আপনার যাকাতের অর্থের মাধ্যমে দরিদ্র ছাত্রদের শিক্ষা কার্যক্রমে সহায়তা করা হয়।",
    },
    {
      title: "সদকা",
      description:
        "সাধারণ দানের মাধ্যমে মাদরাসার শিক্ষা ও পরিচালনা কার্যক্রম পরিচালিত হয়।",
    },
    {
      title: "লিল্লাহ ফান্ড",
      description:
        "গরীব ও এতিম শিক্ষার্থীদের থাকা-খাওয়া ও শিক্ষার ব্যয় নির্বাহে এই ফান্ড ব্যবহৃত হয়।",
    },
    {
      title: "নির্মাণ ফান্ড",
      description:
        "মাদরাসার ভবন নির্মাণ, মসজিদ সম্প্রসারণ এবং অবকাঠামো উন্নয়নে ব্যবহৃত হয়।",
    },
  ];

  const defaultPayments: PaymentMethod[] = [
    { name: "bKash", number: "01XXXXXXXXX" },
    { name: "Nagad", number: "01XXXXXXXXX" },
    { name: "Bank Transfer" },
  ];

  const methods = paymentMethods ?? defaultPayments;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-xl font-semibold text-[var(--color-text)]">
          মাদরাসার জন্য দান করুন
        </h2>

        <p className="mt-2 text-sm text-[var(--color-text-muted)]">
          ইসলামী শিক্ষা প্রসারে আপনার সহযোগিতা অত্যন্ত গুরুত্বপূর্ণ।
        </p>
      </div>

      {/* Donation Types */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {donationTypes.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-[var(--color-border)] p-4"
          >
            <h3 className="font-semibold text-[var(--color-primary)]">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="mt-8 rounded-xl bg-[var(--color-bg)] p-5">
        <h3 className="text-md font-semibold text-[var(--color-text)]">
          দানের মাধ্যম
        </h3>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {methods.map((method) => (
            <div
              key={method.name}
              className="flex flex-col items-center rounded-lg border border-[var(--color-border)] bg-white p-4 text-center"
            >
              <p className="font-semibold text-[var(--color-primary)]">
                {method.name}
              </p>

              {method.number && (
                <p className="text-sm text-[var(--color-text-muted)]">
                  {method.number}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-6 text-center">
        <button className="rounded-md bg-[var(--color-primary)] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90">
          এখনই দান করুন
        </button>
      </div>
    </section>
  );
}
