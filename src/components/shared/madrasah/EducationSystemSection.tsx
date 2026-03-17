interface Level {
  title: string;
  description: string;
}

export function EducationSystemSection() {
  const levels: Level[] = [
    {
      title: "নূরানী",
      description:
        "শিশুদের জন্য প্রাথমিক কুরআন শিক্ষা ও আরবি বর্ণমালা পরিচিতি।",
    },
    {
      title: "নাজেরা",
      description: "সঠিক তাজবিদ সহ কুরআন পাঠের অনুশীলন।",
    },
    {
      title: "হিফজ",
      description: "পবিত্র কুরআন সম্পূর্ণ মুখস্থ করার বিশেষ বিভাগ।",
    },
    {
      title: "কিতাব",
      description: "আরবি ভাষা, ফিকহ, হাদিস ও তাফসিরসহ ইসলামি গ্রন্থ অধ্যয়ন।",
    },
    {
      title: "দাওরায়ে হাদিস",
      description: "সহিহ হাদিসের গভীর অধ্যয়ন এবং আলেম হিসেবে প্রস্তুতি।",
    },
  ];

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-xl font-semibold text-[var(--color-text)]">
        শিক্ষা ব্যবস্থা
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {levels.map((level) => (
          <div
            key={level.title}
            className="rounded-lg border border-[var(--color-border)] p-4"
          >
            <h3 className="font-semibold text-[var(--color-primary)]">
              {level.title}
            </h3>

            <p className="mt-1 text-sm text-[var(--color-text-muted)]">
              {level.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
