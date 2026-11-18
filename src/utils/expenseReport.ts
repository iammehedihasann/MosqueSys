import donationData from '@/data/donation.json';
import { monthPeriod } from '@/utils/donationReport';
import { expenseNet, totalExpenses, type Expense } from '@/utils/expenses';

export function buildExpenseReport(expenses: readonly Expense[]) {
  const months = donationData.monthlyReport.map(row => {
    const period = monthPeriod(row.month.replace('ফেব্রুয়ারি', 'ফেব্রুয়ারি').replace('জানুয়ারি', 'জানুয়ারি'));
    const key = period === null ? '' : `${Math.floor(period / 12)}-${String(period % 12 + 1).padStart(2, '0')}`;
    const entries = expenses.filter(item => item.date.slice(0, 7) === key);
    const income = row.collected;
    const expense = entries.length ? totalExpenses(entries) : typeof row.expense === 'number' ? row.expense : null;
    const net = entries.length ? expenseNet(income, entries) : typeof income === 'string' && income.trim() === 'চলছে' ? 'চলছে' : typeof income === 'number' && expense !== null ? income - expense : '—';
    return { key, label: row.month.trim(), income: typeof income === 'number' ? income : income.trim() === 'চলছে' ? 'চলছে' : '—', expense, net };
  });
  for (const key of new Set(expenses.map(item => item.date.slice(0, 7)))) {
    if (!months.some(row => row.key === key)) months.push({ key, label: key, income: '—', expense: totalExpenses(expenses.filter(item => item.date.startsWith(key))), net: '—' });
  }
  return months.sort((a, b) => b.key.localeCompare(a.key));
}
