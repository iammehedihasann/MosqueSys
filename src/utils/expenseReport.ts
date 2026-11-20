import donationData from '@/data/donation.json';
import { monthPeriod, parseDonationMoney } from '@/utils/donationReport';
import { expenseNet, totalExpenses, type Expense } from '@/utils/expenses';
import type { DonationMonthlyRow } from '@/types';

export function buildExpenseReport(
  expenses: readonly Expense[],
  monthlyReport: readonly DonationMonthlyRow[] = donationData.monthlyReport,
) {
  const months = monthlyReport.map(row => {
    const period = monthPeriod(row.month.replace('ফেব্রুয়ারি', 'ফেব্রুয়ারি').replace('জানুয়ারি', 'জানুয়ারি'));
    const key = period === null ? '' : `${Math.floor(period / 12)}-${String(period % 12 + 1).padStart(2, '0')}`;
    const entries = expenses.filter(item => item.date.slice(0, 7) === key);
    const income = parseDonationMoney(row.collected);
    const expense = entries.length ? totalExpenses(entries) : parseDonationMoney(row.expense);
    const ongoing = typeof row.collected === 'string' && row.collected.trim() === 'চলছে';
    const incomeValue = income ?? (ongoing ? 'চলছে' : '—');
    const net = entries.length
      ? expenseNet(incomeValue, entries)
      : ongoing
        ? 'চলছে'
        : income !== null && expense !== null
          ? income - expense
          : '—';
    return { key, label: row.month.trim(), income: incomeValue, expense, net };
  });
  for (const key of new Set(expenses.map(item => item.date.slice(0, 7)))) {
    if (!months.some(row => row.key === key)) months.push({ key, label: key, income: '—', expense: totalExpenses(expenses.filter(item => item.date.startsWith(key))), net: '—' });
  }
  return months.sort((a, b) => b.key.localeCompare(a.key));
}
