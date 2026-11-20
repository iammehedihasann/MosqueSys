import { createElement, useEffect, useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Download,
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Receipt,
  Search,
  SearchX,
  Sparkles,
  Tag,
  Trash2,
  Users,
  Wallet,
  Wrench,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  bnNumber,
  applyExpenseChanges,
  breakdown,
  categories,
  currentDhakaDate,
  currentDhakaMonth,
  expenseNet,
  expensesUpdatedEvent,
  filterExpenses,
  formatExpenseDate,
  formatMonth,
  isExpenseCategory,
  loadExpenses,
  loadExpenseChanges,
  saveExpenseChanges,
  totalExpenses,
  validDate,
  type Expense,
  type ExpenseChanges,
  type ExpenseSort,
} from "@/utils/expenses";
import { buildExpenseReport } from "@/utils/expenseReport";
import donationData from "@/data/donation.json";
import {
  applyDonationCollectionOverrides,
  donationsUpdatedEvent,
} from "@/utils/donationCollections";
import type { DonationMonthlyRow } from "@/types";

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
  const box = size === "sm" ? "h-9 w-9 rounded-xl" : "h-11 w-11 rounded-2xl";
  return (
    <span
      aria-hidden="true"
      className={`${box} flex shrink-0 items-center justify-center bg-emerald-50 text-emerald-700`}
    >
      {createElement(iconFor(k), {
        className: size === "sm" ? "h-4 w-4" : "h-5 w-5",
      })}
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

export function ExpenseSection() {
  const [params, setParams] = useSearchParams();
  const [items, setItems] = useState<ReturnType<typeof loadExpenses> | null>(
    null,
  );
  const [expenseChanges, setExpenseChanges] = useState<ExpenseChanges>({
    added: [],
    updated: [],
    deletedIds: [],
  });
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [search, setSearch] = useState(params.get("search") ?? "");
  const [pdfState, setPdfState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [monthlyReport, setMonthlyReport] = useState<DonationMonthlyRow[]>(() =>
    applyDonationCollectionOverrides(donationData.monthlyReport),
  );

  useEffect(() => {
    const refreshCollections = () =>
      setMonthlyReport(
        applyDonationCollectionOverrides(donationData.monthlyReport),
      );
    window.addEventListener(donationsUpdatedEvent, refreshCollections);
    return () =>
      window.removeEventListener(donationsUpdatedEvent, refreshCollections);
  }, []);

  useEffect(() => {
    if (pdfState !== "success") return;
    const timer = window.setTimeout(() => setPdfState("idle"), 4000);
    return () => window.clearTimeout(timer);
  }, [pdfState]);

  useEffect(() => {
    try {
      const changes = loadExpenseChanges();
      setExpenseChanges(changes);
      setItems(applyExpenseChanges(loadExpenses(), changes));
    } catch (error) {
      setStorageError(
        error instanceof Error ? error.message : "সংরক্ষিত খরচ লোড করা যায়নি।",
      );
      setItems(loadExpenses());
    }
  }, []);

  const report = useMemo(
    () =>
      buildExpenseReport(
        items ?? [],
        monthlyReport,
      ),
    [items, monthlyReport],
  );
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
      : currentDhakaMonth();
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
  const top = breakdown(monthItems).sort((a, b) => b.amount - a.amount)[0];
  const net = expenseNet(
    report.find((x) => x.key === month)?.income,
    monthItems,
  );
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

  const addExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const date = String(formData.get("date") ?? "");
    const categoryValue = String(formData.get("category") ?? "");
    const description = String(formData.get("description") ?? "").trim();
    const payee = String(formData.get("payee") ?? "").trim();
    const amount = Number(formData.get("amount"));

    if (!validDate(date) || !isExpenseCategory(categoryValue) || !description || !payee || !Number.isSafeInteger(amount) || amount <= 0) {
      setFormError("তারিখ, খরচের কারণ, কোথায় খরচ হয়েছে এবং সঠিক পরিমাণ দিন।");
      return;
    }

    try {
      const expense: Expense = {
        id: editingExpense?.id ?? crypto.randomUUID(),
        date,
        category: categoryValue,
        description,
        payee,
        amount,
      };
      const nextChanges: ExpenseChanges = editingExpense
        ? expenseChanges.added.some((saved) => saved.id === expense.id)
          ? {
              ...expenseChanges,
              added: expenseChanges.added.map((saved) =>
                saved.id === expense.id ? expense : saved,
              ),
            }
          : {
              ...expenseChanges,
              updated: [
                ...expenseChanges.updated.filter(
                  (saved) => saved.id !== expense.id,
                ),
                expense,
              ],
            }
        : {
            ...expenseChanges,
            added: [...expenseChanges.added, expense],
          };
      saveExpenseChanges(nextChanges);
      setExpenseChanges(nextChanges);
      setItems(applyExpenseChanges(loadExpenses(), nextChanges));
      setFormError(null);
      setEditingExpense(null);
      update("month", date.slice(0, 7));
      form.reset();
      window.dispatchEvent(new Event(expensesUpdatedEvent));
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "খরচ সংরক্ষণ করা যায়নি।",
      );
    }
  };

  const startEditing = (expense: Expense) => {
    setEditingExpense(expense);
    setFormError(null);
    document.getElementById("expense-entry-form")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const deleteExpense = (expense: Expense) => {
    if (!window.confirm(`এই খরচটি মুছে ফেলবেন?\n${expense.description}`)) return;

    const isAdded = expenseChanges.added.some(
      (saved) => saved.id === expense.id,
    );
    const isBundled = loadExpenses().some((saved) => saved.id === expense.id);
    const nextChanges: ExpenseChanges = {
      added: expenseChanges.added.filter((saved) => saved.id !== expense.id),
      updated: expenseChanges.updated.filter(
        (saved) => saved.id !== expense.id,
      ),
      deletedIds:
        !isAdded && isBundled
          ? [...new Set([...expenseChanges.deletedIds, expense.id])]
          : expenseChanges.deletedIds,
    };

    try {
      saveExpenseChanges(nextChanges);
      setExpenseChanges(nextChanges);
      setItems(applyExpenseChanges(loadExpenses(), nextChanges));
      setFormError(null);
      if (editingExpense?.id === expense.id) setEditingExpense(null);
      window.dispatchEvent(new Event(expensesUpdatedEvent));
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "খরচ মুছে ফেলা যায়নি।",
      );
    }
  };

  const download = async () => {
    if (!items || !month) return;
    setPdfState("loading");
    try {
      const { downloadExpensePdf } = await import("./expensePdf");
      await downloadExpensePdf(month, items);
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
      {storageError && (
        <p role="alert" className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
          {storageError}
        </p>
      )}

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
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <label className="block w-full max-w-xs">
              <span className="mb-1 block text-sm font-semibold text-gray-700">
                মাস ও বছর নির্বাচন
              </span>
              <input
                type="month"
                value={month}
                onChange={(event) => update("month", event.target.value)}
                className={`min-h-11 w-full rounded-xl border border-gray-300 bg-white px-3 ${focusRing}`}
              />
            </label>
            <p className="text-sm text-gray-500">
              {month ? formatMonth(month) : "মাস নির্বাচন করুন"}
            </p>
          </div>

          <form
            id="expense-entry-form"
            key={editingExpense?.id ?? "new-expense-form"}
            onSubmit={addExpense}
            className="mb-5 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-5"
          >
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">
                {editingExpense ? "খরচ সম্পাদনা করুন" : "নতুন খরচ যোগ করুন"}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                খরচের তারিখ, পরিমাণ, কোথায় খরচ হয়েছে এবং কারণ লিখুন। তথ্য শুধু এই ব্রাউজারে থাকবে।
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <label className="block text-sm font-medium text-gray-700">
                তারিখ
                <input
                  type="date"
                  name="date"
                  defaultValue={editingExpense?.date ?? currentDhakaDate()}
                  required
                  className={`mt-1 min-h-11 w-full rounded-xl border border-gray-300 bg-white px-3 ${focusRing}`}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                খরচের খাত
                <select
                  name="category"
                  defaultValue={editingExpense?.category ?? "other"}
                  required
                  className={`mt-1 min-h-11 w-full rounded-xl border border-gray-300 bg-white px-3 ${focusRing}`}
                >
                  {Object.entries(categories).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-medium text-gray-700">
                পরিমাণ (টাকা)
                <input
                  type="number"
                  name="amount"
                  defaultValue={editingExpense?.amount}
                  min="1"
                  step="1"
                  inputMode="numeric"
                  required
                  className={`mt-1 min-h-11 w-full rounded-xl border border-gray-300 bg-white px-3 ${focusRing}`}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                কোথায় খরচ / প্রাপক
                <input
                  type="text"
                  name="payee"
                  defaultValue={editingExpense?.payee}
                  maxLength={120}
                  required
                  placeholder="দোকান, স্থান বা প্রাপকের নাম"
                  className={`mt-1 min-h-11 w-full rounded-xl border border-gray-300 bg-white px-3 ${focusRing}`}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700 sm:col-span-2">
                খরচের কারণ
                <input
                  type="text"
                  name="description"
                  defaultValue={editingExpense?.description}
                  maxLength={200}
                  required
                  placeholder="কী কাজে খরচ হয়েছে"
                  className={`mt-1 min-h-11 w-full rounded-xl border border-gray-300 bg-white px-3 ${focusRing}`}
                />
              </label>
            </div>
            {formError && (
              <p role="alert" className="mt-3 text-sm font-medium text-red-700">
                {formError}
              </p>
            )}
            <button
              type="submit"
              disabled={Boolean(storageError)}
              className={`mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
            >
              {editingExpense ? (
                <Pencil aria-hidden="true" className="h-4 w-4" />
              ) : (
                <Plus aria-hidden="true" className="h-4 w-4" />
              )}
              {editingExpense ? "পরিবর্তন সংরক্ষণ" : "খরচ সংরক্ষণ"}
            </button>
            {editingExpense && (
              <button
                type="button"
                onClick={() => {
                  setEditingExpense(null);
                  setFormError(null);
                }}
                className={`mt-4 ml-2 inline-flex min-h-11 items-center justify-center rounded-xl border border-gray-300 px-5 font-semibold text-gray-700 hover:bg-gray-50 ${focusRing}`}
              >
                বাতিল
              </button>
            )}
          </form>

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
                          <span className="text-gray-500">কারণ: </span>
                          {x.description}
                        </h3>
                        <p className="shrink-0 font-bold tabular-nums text-amber-700">
                          {money(x.amount)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm break-words text-gray-600">
                        কোথায় / প্রাপক:{" "}
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
                      <div className="mt-3 flex gap-2">
                        <button
                          type="button"
                          disabled={Boolean(storageError)}
                          onClick={() => startEditing(x)}
                          className={`inline-flex min-h-9 items-center gap-1 rounded-lg border border-emerald-200 px-3 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                        >
                          <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
                          সম্পাদনা
                        </button>
                        <button
                          type="button"
                          disabled={Boolean(storageError)}
                          onClick={() => deleteExpense(x)}
                          className={`inline-flex min-h-9 items-center gap-1 rounded-lg border border-red-200 px-3 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                        >
                          <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                          মুছুন
                        </button>
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
                        ["খরচের কারণ", ""],
                        ["কোথায় খরচ / প্রাপক", ""],
                        ["পরিমাণ", "text-right"],
                        ["অ্যাকশন", "text-right"],
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
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              disabled={Boolean(storageError)}
                              aria-label={`${x.description} সম্পাদনা`}
                              onClick={() => startEditing(x)}
                              className={`inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                            >
                              <Pencil aria-hidden="true" className="h-3.5 w-3.5" />
                              সম্পাদনা
                            </button>
                            <button
                              type="button"
                              disabled={Boolean(storageError)}
                              aria-label={`${x.description} মুছুন`}
                              onClick={() => deleteExpense(x)}
                              className={`inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
                            >
                              <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                              মুছুন
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total bar */}
              <div
                className="sticky bottom-0 z-10 mt-2 flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 shadow-sm lg:static"
                style={{
                  paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
                }}
              >
                <span className="font-semibold text-gray-900">মোট</span>
                <span className="text-lg font-bold tabular-nums text-amber-800">
                  {money(totalExpenses(filtered))}
                </span>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}
