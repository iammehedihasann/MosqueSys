import rawExpenses from '@/data/expenses.json';

export const categories = { electricity: 'বিদ্যুৎ', cleaning: 'পরিচ্ছন্নতা', repair: 'মেরামত', maktab: 'মক্তব', honorarium: 'সম্মানী', other: 'অন্যান্য' } as const;
export type ExpenseCategory = keyof typeof categories;
export type Expense = { id: string; date: string; category: ExpenseCategory; description: string; payee: string; amount: number };
export type ExpenseSort = 'newest' | 'oldest' | 'amount';
export function loadExpenses(data: unknown = rawExpenses): Expense[] {
  if (!Array.isArray(data)) return [];
  return data.filter((item): item is Expense => {
    const valid = item && typeof item.id === 'string' && typeof item.date === 'string' && validDate(item.date) && typeof item.category === 'string' && Object.hasOwn(categories, item.category) && typeof item.description === 'string' && typeof item.payee === 'string' && Number.isSafeInteger(item.amount) && item.amount > 0;
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

export function formatExpenseDate(date: string) {
  return new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Dhaka' }).format(new Date(`${date}T12:00:00Z`));
}
