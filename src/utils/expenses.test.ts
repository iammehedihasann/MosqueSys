import { describe, expect, it, vi } from 'vitest';
import { applyExpenseChanges, breakdown, expenseNet, filterExpenses, formatExpenseDate, loadExpenseChanges, loadExpenses, saveExpenseChanges, totalExpenses, validDate, type Expense } from './expenses';
import { buildExpenseReport } from './expenseReport';

const entries: Expense[] = [
  { id: '1', date: '2026-05-01', category: 'repair', description: 'দরজা', payee: 'রহিম', amount: 1 },
  { id: '2', date: '2026-05-01', category: 'cleaning', description: 'পরিষ্কার', payee: 'করিম', amount: 1 },
  { id: '3', date: '2026-05-02', category: 'electricity', description: 'বিল', payee: 'বোর্ড', amount: 1 },
];
describe('expense data', () => {
  it('rejects invalid dates and amounts without throwing', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(loadExpenses([entries[0], null, { ...entries[0], amount: NaN }, { ...entries[0], amount: 0 }, { ...entries[0], date: '2026-02-30' }])).toEqual([entries[0]]);
    expect(loadExpenses(null)).toEqual([]); warn.mockRestore();
  });
  it('validates calendar dates and formats in Dhaka', () => {
    expect(validDate('2024-02-29')).toBe(true); expect(validDate('2025-02-29')).toBe(false);
    expect(formatExpenseDate('2026-05-01')).toContain('১');
  });
  it('persists expense additions, edits, and deletions in browser storage', () => {
    const values = new Map<string, string>();
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
      },
    });
    try {
      const changes = {
        added: [entries[2]],
        updated: [{ ...entries[0], amount: 25 }],
        deletedIds: [entries[1].id],
      };
      saveExpenseChanges(changes);
      expect(applyExpenseChanges(entries.slice(0, 2), loadExpenseChanges())).toEqual([
        { ...entries[0], amount: 25 },
        entries[2],
      ]);
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('adds a new expense to local records instead of treating it as an update', () => {
    const values = new Map<string, string>();
    vi.stubGlobal('window', {
      localStorage: {
        getItem: (key: string) => values.get(key) ?? null,
        setItem: (key: string, value: string) => values.set(key, value),
      },
    });
    try {
      const expense = {
        id: 'new-expense',
        date: '2026-11-21',
        category: 'repair' as const,
        description: 'ঝড়ের ক্ষয় repaired',
        payee: 'কামাল দোকান',
        amount: 2500,
      };
      saveExpenseChanges({
        added: [expense],
        updated: [],
        deletedIds: [],
      });
      const records = applyExpenseChanges([], loadExpenseChanges());
      expect(records).toEqual([expense]);
    } finally {
      vi.unstubAllGlobals();
    }
  });
  it('filters and preserves equal-key order when sorting', () => {
    expect(filterExpenses(entries, '2026-05', '', '', 'newest').map(x => x.id)).toEqual(['3', '1', '2']);
    expect(filterExpenses(entries, '2026-05', '', '', 'amount').map(x => x.id)).toEqual(['1', '2', '3']);
    expect(filterExpenses(entries, '2026-05', 'repair', 'রহিম', 'oldest')).toEqual([entries[0]]);
    expect(totalExpenses(filterExpenses(entries, '2026-05', 'repair', '', 'newest'))).toBe(1);
  });
  it('allocates rounded category percentages to exactly 100', () => { expect(breakdown(entries).map(x => x.percent)).toEqual([34, 33, 33]); expect(breakdown([])).toEqual([]); });
  it('only calculates net for finalized income and recorded expenses', () => {
    expect(expenseNet('চলছে ', entries)).toBe('চলছে'); expect(expenseNet(undefined, entries)).toBe('—'); expect(expenseNet(100, [])).toBe('—'); expect(expenseNet(100, entries)).toBe(97);
  });
  it('joins income to expenses by the actual Bangla month', () => {
    const may = buildExpenseReport(entries).find(x => x.key === '2026-05');
    expect(may?.income).toBe(4120); expect(may?.expense).toBe(3); expect(may?.net).toBe(4117);
    expect(buildExpenseReport([]).find(x => x.income === 'চলছে')?.net).toBe('চলছে');
    expect(buildExpenseReport([]).find(x => x.key === '2026-02')).toBeDefined();
  });
  it('includes numeric-string income and expenses in the monthly report', () => {
    const november = buildExpenseReport([], [
      { month: 'নভেম্বর ২০২৬', collected: '1550', expense: '400' },
    ]).find(x => x.key === '2026-11');
    expect(november).toMatchObject({ income: 1550, expense: 400, net: 1150 });
  });
});
