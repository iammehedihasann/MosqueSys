interface Notice {
  title: string;
  date: string;
}

export function NoticeBoard() {
  const notices: Notice[] = [
    { title: "২০২৬ শিক্ষাবর্ষে ভর্তি শুরু", date: "১২ মার্চ ২০২৬" },
    { title: "বার্ষিক পরীক্ষার সময়সূচি প্রকাশ", date: "৫ মার্চ ২০২৬" },
    { title: "রমজান উপলক্ষে বিশেষ দোয়া মাহফিল", date: "১ মার্চ ২০২৬" },
  ];

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <h2 className="text-xl font-semibold text-[var(--color-text)]">
        নোটিশ বোর্ড
      </h2>

      <ul className="mt-4 space-y-3">
        {notices.map((notice) => (
          <li
            key={notice.title}
            className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 text-sm"
          >
            <span>{notice.title}</span>
            <span className="text-[var(--color-text-muted)]">
              {notice.date}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
