export function MadrasahStats() {
  const stats = [
    { label: "মোট ছাত্র", value: "১২০০+" },
    { label: "শিক্ষক", value: "১০+" },
    { label: "বিভাগ", value: "৫" },
    { label: "হাফেজ", value: "১০০+" },
  ];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      </div>

      <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white">
        <iframe
          title="Madrasah location map"
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3649.5356721413914!2d90.69584599999999!3d23.835104999999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDUwJzA2LjQiTiA5MMKwNDEnNDUuMSJF!5e0!3m2!1sen!2sbd!4v1773640373862!5m2!1sen!2sbd"
          className="h-56 w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  );
}
