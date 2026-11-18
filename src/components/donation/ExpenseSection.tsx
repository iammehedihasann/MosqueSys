import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Download,
  Loader2,
  MoreHorizontal,
  Receipt,
  Search,
  SearchX,
  Sparkles,
  Tag,
  Users,
  Wallet,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  bnNumber,
  breakdown,
  categories,
  expenseNet,
  filterExpenses,
  formatExpenseDate,
  formatMonth,
  loadExpenses,
  totalExpenses,
  type ExpenseSort,
} from "@/utils/expenses";
import { buildExpenseReport } from "@/utils/expenseReport";

const money = (n: number) => `${bnNumber.format(n)} টাকা`;

/* One icon per category. Unknown keys fall back to a generic tag. */
const categoryIcons: Record<string, LucideIcon> = {
  electricity: Zap,
  cleaning: Sparkles,
  repair: Wrench,
  maktab: BookOpen,
  honorarium: Users,
  other: MoreHorizontal,
};
const iconFor = (key: string): LucideIcon => categoryIcons[key] ?? Tag;

function CategoryBubble({
  k,
  size = "md",
}: {
  k: string;
  size?: "sm" | "md";
}) {
  const Icon = iconFor(k);
  const box = size === "sm" ? "h-9 w-9 rounded-xl" : "h-11 w-11 rounded-2xl";
  return (
    <span
      aria-hidden="true"
      className={`${box} flex shrink-0 items-center justify-center bg-emerald-50 text-emerald-700`}
    >
      <Icon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
    </span>
  );
}

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700";
const chip = `inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 text-sm font-semibold whitespace-nowrap transition-colors ${focusRing}`;
const chipOn = "border-emerald-700 bg-emerald-700 text-white shadow-sm";
const chipOff =
  "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50";
const hideScrollbar =
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
const barColors = [
  "bg-emerald-700",
  "bg-emerald-600",
  "bg-emerald-500",
  "bg-emerald-400",
  "bg-emerald-300",
  "bg-emerald-200",
];

export function ExpenseSection() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<ReturnType<typeof loadExpenses> | null>(
    null,
  );
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [pdfState, setPdfState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    setItems(loadExpenses());
  }, []);

  const report = useMemo(() => buildExpenseReport(items ?? []), [items]);
  const recordedMonths = useMemo(
    () =>
      [...new Set((items ?? []).map((x) => x.date.slice(0, 7)))]
        .sort()
        .reverse(),
    [items],
  );
  const months = useMemo(
    () =>
      [
        ...new Set([
          ...recordedMonths,
          ...report.map((x) => x.key).filter(Boolean),
        ]),
      ]
        .sort()
        .reverse(),
    [recordedMonths, report],
  );

  const requestedMonth = params.get("month");
  const month =
    requestedMonth && /^\d{4}-(0[1-9]|1[0-2])$/.test(requestedMonth)
      ? requestedMonth
      : (recordedMonths[0] ?? months[0] ?? "");
  const cat = params.get("cat") ?? "";
  const sort = (
    ["newest", "oldest", "amount"].includes(params.get("sort") ?? "")
      ? params.get("sort")
      : "newest"
  ) as ExpenseSort;
  const query = params.get("search") ?? "";

  function update(key: string, value: string) {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  }

  useEffect(() => {
    setSearch(query);
  }, [query]);
  useEffect(() => {
    if (search === query) return;
    const timer = window.setTimeout(() => update("search", search), 300);
    return () => window.clearTimeout(timer);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const monthItems = (items ?? []).filter((x) => x.date.slice(0, 7) === month);
  const filtered = filterExpenses(items ?? [], month, cat, query, sort);
  const groups = [...breakdown(filtered)].sort((a, b) => b.amount - a.amount);
  const top = breakdown(monthItems).sort((a, b) => b.amount - a.amount)[0];
  const net = expenseNet(
    report.find((x) => x.key === month)?.income,
    monthItems,
  );
  const monthChips =
    month && !months.includes(month) ? [month, ...months] : months;
  const hasFilter = Boolean(cat || query || sort !== "newest");
  const TopIcon = top ? iconFor(top.key) : Tag;

  const reset = () => {
    setSearch("");
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      ["cat", "search", "sort"].forEach((k) => next.delete(k));
      return next;
    });
  };

  const download = async () => {
    if (!items || !month) return;
    setPdfState("loading");
    try {
      const { downloadExpensePdf } = await import("./expensePdf");
      await downloadExpensePdf(month, items, filtered);
      setPdfState("success");
    } catch (error) {
      console.error("PDF generation failed", error);
      setPdfState("error");
    }
  };

  return (
    <section className="mb-12 min-w-0" aria-labelledby="expense-heading">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2
            id="expense-heading"
            className="text-2xl font-bold text-gray-900 sm:text-3xl"
          >
            খরচ
          </h2>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">
            মসজিদের টাকা কোথায়, কী কাজে খরচ হয়েছে
          </p>
        </div>
        <button
          type="button"
          className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 font-semibold text-white shadow-sm transition-colors hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60 max-sm:w-full ${focusRing}`}
          disabled={!items || !month || pdfState === "loading"}
          onClick={download}
        >
          {pdfState === "loading" ? (
            <Loader2
              aria-hidden="true"
              className="h-5 w-5 animate-spin motion-reduce:animate-none"
            />
          ) : (
            <Download aria-hidden="true" className="h-5 w-5" />
          )}
          {pdfState === "loading"
            ? "পিডিএফ তৈরি হচ্ছে…"
            : pdfState === "error"
              ? "আবার পিডিএফ ডাউনলোড করুন"
              : "পিডিএফ ডাউনলোড"}
        </button>
      </div>

      <div role="status" aria-live="polite">
        {pdfState === "success" && (
          <p className="mb-4 flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0" />
            পিডিএফ ডাউনলোড শুরু হয়েছে।
          </p>
        )}
        {pdfState === "error" && (
          <p className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">
            <AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
            পিডিএফ তৈরি করা যায়নি। আবার চেষ্টা করুন।
          </p>
        )}
      </div>

      {!items ? (
        <div
          role="status"
          aria-label="তথ্য লোড হচ্ছে"
          className="space-y-3"
        >
          <div className="h-36 animate-pulse rounded-3xl bg-gray-100 motion-reduce:animate-none" />
          <div className="grid gap-3 sm:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-20 animate-pulse rounded-2xl bg-gray-100 motion-reduce:animate-none"
              />
            ))}
          </div>
          <div className="h-48 animate-pulse rounded-2xl bg-gray-100 motion-reduce:animate-none" />
        </div>
      ) : (
        <>
          {/* Month picker */}
          <div
            role="group"
            aria-label="মাস নির্বাচন"
            className={`-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 ${hideScrollbar}`}
          >
            {!monthChips.length && (
              <span className="py-2 text-sm text-gray-500">কোনো মাস নেই</span>
            )}
            {monthChips.map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={m === month}
                className={`${chip} ${m === month ? chipOn : chipOff}`}
                onClick={() => update("month", m)}
              >
                <CalendarDays aria-hidden="true" className="h-4 w-4" />
                {formatMonth(m)}
              </button>
            ))}
          </div>

          {/* Hero total */}
          <div className="mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-6 text-white shadow-md sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm text-emerald-100 sm:text-base">
                  {month ? formatMonth(month) : "মাস নির্বাচন করুন"} মাসের মোট
                  ব্যয়
                </p>
                <p className="mt-2 text-4xl font-bold tabular-nums sm:text-5xl">
                  {monthItems.length ? money(totalExpenses(monthItems)) : "—"}
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3">
                <Receipt aria-hidden="true" className="h-6 w-6 text-amber-300" />
                <div>
                  <p className="text-xs text-emerald-100">ব্যয়ের সংখ্যা</p>
                  <p className="text-xl font-semibold tabular-nums">
                    {bnNumber.format(monthItems.length)}টি
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary stats */}
          <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700"
              >
                <TopIcon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm text-gray-600">সর্বোচ্চ খাত</dt>
                <dd className="truncate text-lg font-semibold text-gray-900">
                  {top?.label ?? "—"}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"
              >
                <Wallet className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm text-gray-600">মাসের নিট</dt>
                <dd className="truncate text-lg font-semibold text-gray-900">
                  {typeof net === "number" ? money(net) : net}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"
              >
                <CalendarDays className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <dt className="text-sm text-gray-600">নথিভুক্ত মাস</dt>
                <dd className="truncate text-lg font-semibold text-gray-900">
                  {bnNumber.format(recordedMonths.length)} /{" "}
                  {bnNumber.format(months.length)}
                </dd>
              </div>
            </div>
          </dl>

          {/* Search + sort */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label className="relative block min-w-0 flex-1">
              <span className="sr-only">বিবরণ বা প্রাপক খুঁজুন</span>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              />
              <input
                type="search"
                inputMode="search"
                placeholder="বিবরণ বা প্রাপক খুঁজুন"
                className={`min-h-11 w-full rounded-xl border border-gray-300 bg-white pl-11 pr-11 [&::-webkit-search-cancel-button]:appearance-none ${focusRing}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  aria-label="খোঁজা মুছুন"
                  onClick={() => setSearch("")}
                  className={`absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 ${focusRing}`}
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </label>
            <label className="block sm:w-56">
              <span className="sr-only">সাজান</span>
              <select
                className={`min-h-11 w-full rounded-xl border border-gray-300 bg-white px-3 ${focusRing}`}
                value={sort}
                onChange={(e) => update("sort", e.target.value)}
              >
                <option value="newest">নতুন আগে</option>
                <option value="oldest">পুরোনো আগে</option>
                <option value="amount">সর্বোচ্চ পরিমাণ আগে</option>
              </select>
            </label>
          </div>

          {/* Category chips */}
          <div
            role="group"
            aria-label="খাত নির্বাচন"
            className={`-mx-4 mt-3 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 ${hideScrollbar}`}
          >
            <button
              type="button"
              className={`${chip} ${!cat ? chipOn : chipOff}`}
              aria-pressed={!cat}
              onClick={() => update("cat", "")}
            >
              সব খাত
            </button>
            {Object.entries(categories).map(([key, label]) => {
              const Icon = iconFor(key);
              return (
                <button
                  type="button"
                  key={key}
                  className={`${chip} ${cat === key ? chipOn : chipOff}`}
                  aria-pressed={cat === key}
                  onClick={() => update("cat", key)}
                >
                  <Icon aria-hidden="true" className="h-4 w-4" />
                  {label}
                </button>
              );
            })}
          </div>

          {/* Results */}
          {!monthItems.length ? (
            <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm"
              >
                <Receipt className="h-7 w-7" />
              </span>
              <p className="mt-4 text-lg font-semibold text-gray-900">
                এই মাসে কোনো ব্যয় নথিভুক্ত হয়নি
              </p>
              {months.length > 1 && (
                <p className="mt-1 text-sm text-gray-600">
                  উপরে থেকে অন্য মাস বেছে নিন।
                </p>
              )}
            </div>
          ) : !filtered.length ? (
            <div className="mt-6 flex flex-col items-center rounded-3xl border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
              <span
                aria-hidden="true"
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-gray-400 shadow-sm"
              >
                <SearchX className="h-7 w-7" />
              </span>
              <p className="mt-4 text-lg font-semibold text-gray-900">
                কোনো ফলাফল পাওয়া যায়নি
              </p>
              <button
                type="button"
                className={`mt-4 min-h-11 rounded-xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800 ${focusRing}`}
                onClick={reset}
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <p
                  className="text-sm text-gray-600"
                  role="status"
                  aria-live="polite"
                >
                  {bnNumber.format(filtered.length)}টি খরচ দেখানো হচ্ছে
                </p>
                {hasFilter && (
                  <button
                    type="button"
                    onClick={reset}
                    className={`inline-flex min-h-11 items-center gap-1 rounded-lg px-2 text-sm font-semibold text-emerald-700 hover:underline ${focusRing}`}
                  >
                    <X aria-hidden="true" className="h-4 w-4" />
                    ফিল্টার রিসেট করুন
                  </button>
                )}
              </div>

              {/* Mobile + tablet: cards */}
              <div className="mt-1 space-y-3 lg:hidden">
                {filtered.map((x, i) => (
                  <article
                    key={`${x.id}-${i}`}
                    className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
                  >
                    <CategoryBubble k={x.category} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold break-words text-gray-900">
                          {x.description}
                        </h3>
                        <p className="shrink-0 font-bold tabular-nums text-amber-700">
                          {money(x.amount)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm break-words text-gray-600">
                        {x.payee}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-800">
                          {categories[x.category]}
                        </span>
                        <span className="inline-flex items-center gap-1 text-gray-500">
                          <CalendarDays aria-hidden="true" className="h-3.5 w-3.5" />
                          {formatExpenseDate(x.date)}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Desktop: table */}
              <div className="mt-1 hidden max-h-[28rem] overflow-auto rounded-2xl border border-gray-100 bg-white shadow-sm lg:block">
                <table className="w-full text-left">
                  <thead className="sticky top-0 z-10 bg-emerald-900 text-white">
                    <tr>
                      {[
                        ["তারিখ", ""],
                        ["খাত", ""],
                        ["বিবরণ", ""],
                        ["কোথায় / প্রাপক", ""],
                        ["পরিমাণ", "text-right"],
                      ].map(([x, align]) => (
                        <th
                          scope="col"
                          className={`px-4 py-3 text-sm font-semibold ${align}`}
                          key={x}
                        >
                          {x}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((x, i) => (
                      <tr
                        className="border-t border-gray-100 transition-colors hover:bg-emerald-50/50"
                        key={`${x.id}-${i}`}
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                          {formatExpenseDate(x.date)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-2 whitespace-nowrap">
                            <CategoryBubble k={x.category} size="sm" />
                            <span className="font-medium">
                              {categories[x.category]}
                            </span>
                          </span>
                        </td>
                        <td className="px-4 py-3 break-words text-gray-900">
                          {x.description}
                        </td>
                        <td className="px-4 py-3 break-words text-gray-600">
                          {x.payee}
                        </td>
                        <td className="px-4 py-3 text-right font-bold tabular-nums whitespace-nowrap text-amber-700">
                          {money(x.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total bar */}
              <div
                className="sticky bottom-0 z-10 mt-3 flex items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 shadow-sm lg:static"
                style={{
                  paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
                }}
              >
                <span className="font-semibold text-gray-900">মোট</span>
                <span className="text-xl font-bold tabular-nums text-amber-800">
                  {money(totalExpenses(filtered))}
                </span>
              </div>

              {/* Category breakdown */}
              <div className="mt-8 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  খাতভিত্তিক ব্যয়
                </h3>
                <ul className="mt-4 space-y-4">
                  {groups.map((x, i) => (
                    <li key={x.key}>
                      <div className="flex items-center gap-3">
                        <CategoryBubble k={x.key} size="sm" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline justify-between gap-3">
                            <span className="truncate font-medium text-gray-900">
                              {x.label}
                            </span>
                            <span className="shrink-0 text-sm tabular-nums text-gray-600">
                              <span className="font-semibold text-gray-900">
                                {money(x.amount)}
                              </span>{" "}
                              · {bnNumber.format(x.percent)}%
                            </span>
                          </div>
                          <div
                            aria-hidden="true"
                            className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-gray-100"
                          >
                            <div
                              className={`h-full rounded-full ${barColors[Math.min(i, barColors.length - 1)]}`}
                              style={{ width: `${Math.max(x.percent, 2)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}