import rawExpenses from '@/data/expenses.json';

export const categories = { electricity: 'বিদ্যুৎ', cleaning: 'পরিচ্ছন্নতা', repair: 'মেরামত', maktab: 'মক্তব', honorarium: 'সম্মানী', other: 'অন্যান্য' } as const;
export type ExpenseCategory = keyof typeof categories;
export type Expense = { id: string; date: string; category: ExpenseCategory; description: string; payee: string; amount: number };
export type ExpenseChanges = { added: Expense[]; updated: Expense[]; deletedIds: string[] };
export type ExpenseSort = 'newest' | 'oldest' | 'amount';
export function isExpenseCategory(value: string): value is ExpenseCategory { return Object.hasOwn(categories, value); }
export function loadExpenses(data: unknown = rawExpenses): Expense[] {
  if (!Array.isArray(data)) return [];
  return data.filter((item): item is Expense => {
    const valid = item && typeof item.id === 'string' && typeof item.date === 'string' && validDate(item.date) && typeof item.category === 'string' && isExpenseCategory(item.category) && typeof item.description === 'string' && typeof item.payee === 'string' && Number.isSafeInteger(item.amount) && item.amount > 0;
    if (!valid && import.meta.env.DEV) console.warn('Invalid expense row skipped', item);
    return valid;
  });
}
export function validDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.valueOf()) && d.toISOString().slice(0, 10) === value;
}
export function filterExpenses(items: readonly Expense[], month: string, category: string, search: string, sort: ExpenseSort): Expense[] {
  const q = search.trim().toLocaleLowerCase();
  return items.filter(x => x.date.slice(0, 7) === month && (!category || x.category === category) && (!q || `${x.description} ${x.payee}`.toLocaleLowerCase().includes(q)))
    .map((item, index) => ({ item, index })).sort((a, b) => (sort === 'amount' ? b.item.amount - a.item.amount : sort === 'oldest' ? a.item.date.localeCompare(b.item.date) : b.item.date.localeCompare(a.item.date)) || a.index - b.index).map(x => x.item);
}
export const totalExpenses = (items: readonly Expense[]) => items.reduce((sum, item) => sum + item.amount, 0);
export function breakdown(items: readonly Expense[]) {
  const total = totalExpenses(items);
  const rows = Object.entries(categories).map(([key, label]) => ({ key, label, amount: totalExpenses(items.filter(x => x.category === key)), percent: 0, remainder: 0 })).filter(x => x.amount > 0);
  rows.forEach(x => { const exact = x.amount * 100 / total; x.percent = Math.floor(exact); x.remainder = exact - x.percent; });
  let remaining = 100 - rows.reduce((sum, x) => sum + x.percent, 0);
  [...rows].sort((a, b) => b.remainder - a.remainder).forEach(x => { if (remaining > 0) { x.percent++; remaining--; } });
  return rows;
}
export function expenseNet(income: number | string | null | undefined, expenses: readonly Expense[]): number | string {
  if (typeof income === 'string' && income.trim() === 'চলছে') return 'চলছে';
  if (typeof income !== 'number' || !Number.isFinite(income) || !expenses.length) return '—';
  return income - totalExpenses(expenses);
}
export const bnNumber = new Intl.NumberFormat('bn-BD');
export function formatMonth(month: string) { const [y, m] = month.split('-').map(Number); return new Intl.DateTimeFormat('bn-BD', { month: 'long', year: 'numeric', timeZone: 'Asia/Dhaka' }).format(new Date(Date.UTC(y, m - 1, 1, 12))); }

const savedExpensesKey = 'mosquesys.saved-expenses.v1';
export const expensesUpdatedEvent = 'mosquesys:expenses-updated';
const emptyExpenseChanges = (): ExpenseChanges => ({ added: [], updated: [], deletedIds: [] });

export function currentDhakaDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: 'Asia/Dhaka',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now);
  const part = (type: 'year' | 'month' | 'day') =>
    parts.find((value) => value.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function currentDhakaMonth(now = new Date()) {
  return currentDhakaDate(now).slice(0, 7);
}

export function loadExpenseChanges(): ExpenseChanges {
  if (typeof window === 'undefined') return emptyExpenseChanges();

  let serialized: string | null;
  try {
    serialized = window.localStorage.getItem(savedExpensesKey);
  } catch (error) {
    throw new Error('সংরক্ষিত খরচ পড়া যায়নি। ব্রাউজারের স্টোরেজ পরীক্ষা করুন।', { cause: error });
  }
  if (!serialized) return emptyExpenseChanges();

  let data: unknown;
  try {
    data = JSON.parse(serialized);
  } catch (error) {
    throw new Error('সংরক্ষিত খরচের তথ্য পড়া যায়নি।', { cause: error });
  }

  if (Array.isArray(data)) {
    return { added: loadExpenses(data), updated: [], deletedIds: [] };
  }
  if (typeof data !== 'object' || data === null) {
    throw new Error('সংরক্ষিত খরচের তথ্যের ধরন সঠিক নয়।');
  }
  const record = data as Record<string, unknown>;
  if (
    !Array.isArray(record.added) ||
    !Array.isArray(record.updated) ||
    !Array.isArray(record.deletedIds) ||
    !record.deletedIds.every((id): id is string => typeof id === 'string')
  ) {
    throw new Error('সংরক্ষিত খরচের তথ্যের ধরন সঠিক নয়।');
  }
  return {
    added: loadExpenses(record.added),
    updated: loadExpenses(record.updated),
    deletedIds: [...new Set(record.deletedIds)],
  };
}

export function applyExpenseChanges(
  base: readonly Expense[],
  changes: ExpenseChanges,
) {
  const deleted = new Set(changes.deletedIds);
  const updated = new Map(changes.updated.map((expense) => [expense.id, expense]));
  return [
    ...base.flatMap((expense) => {
      if (deleted.has(expense.id)) return [];
      return [updated.get(expense.id) ?? expense];
    }),
    ...changes.added.filter((expense) => !deleted.has(expense.id)),
  ];
}

export function loadExpenseRecords() {
  return applyExpenseChanges(loadExpenses(), loadExpenseChanges());
}

export function saveExpenseChanges(changes: ExpenseChanges) {
  if (typeof window === 'undefined') {
    throw new Error('ব্রাউজার স্টোরেজ পাওয়া যায়নি।');
  }
  try {
    window.localStorage.setItem(savedExpensesKey, JSON.stringify(changes));
  } catch (error) {
    throw new Error('খরচ সংরক্ষণ করা যায়নি। ব্রাউজারের স্টোরেজ পরীক্ষা করুন।', { cause: error });
  }
}

export function formatExpenseDate(date: string) {
  return new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dhaka' }).format(new Date(`${date}T12:00:00Z`));
}
