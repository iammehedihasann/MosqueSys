export function DepartmentsSection() {
  const departments = [
    "নূরানী বিভাগ",
    "নাজেরা বিভাগ",
    "হিফজুল কুরআন বিভাগ",
    "কিতাব বিভাগ",
    "দাওরায়ে হাদিস বিভাগ",
  ];

  return (
    <section className="grid md:grid-cols-3 gap-4">
      {departments.map((item) => (
        <div
          key={item}
          className="rounded-xl border border-[var(--color-border)] bg-white p-5"
        >
          <h3 className="font-semibold">{item}</h3>

          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            এই বিভাগে ইসলামী শিক্ষার গুরুত্বপূর্ণ পাঠদান করা হয়।
          </p>

          <button className="mt-3 text-sm text-[var(--color-primary)]">
            বিস্তারিত দেখুন →
          </button>
        </div>
      ))}
    </section>
  );
}
