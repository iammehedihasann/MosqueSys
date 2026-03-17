interface Testimonial {
  name: string;
  role: string;
  comment: string;
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: "মোহাম্মদ আরিফ",
      role: "অভিভাবক",
      comment: "এই মাদরাসায় আমার সন্তান খুব সুন্দর ইসলামী শিক্ষা পাচ্ছে।",
    },
    {
      name: "আব্দুল্লাহ",
      role: "শিক্ষার্থী",
      comment: "শিক্ষকরা খুব আন্তরিক এবং পরিবেশ খুব ভালো।",
    },
  ];

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-xl font-semibold">মতামত</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <div
            key={item.name}
            className="rounded-lg border border-[var(--color-border)] p-4"
          >
            <p className="text-sm text-[var(--color-text-muted)]">
              “{item.comment}”
            </p>

            <div className="mt-3 text-sm font-semibold">
              {item.name} — {item.role}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
