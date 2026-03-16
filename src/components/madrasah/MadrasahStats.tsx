export function MadrasahStats() {
  const stats = [
    { label: "মোট ছাত্র", value: "১২০০+" },
    { label: "শিক্ষক", value: "১০+" },
    { label: "বিভাগ", value: "৫" },
    { label: "হাফেজ", value: "১০০+" },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-[var(--color-border)] bg-white p-5 text-center"
        >
          <p className="text-2xl font-bold text-[var(--color-primary)]">
            {item.value}
          </p>

          <p className="text-sm text-[var(--color-text-muted)]">{item.label}</p>
        </div>
      ))}
    </section>
  );
}
