import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import '@/components/donation/expensePdf.css';
import mosqueImage from '@/assets/MosqueImage/mosque/mosqueCoverPage.jpg';
import { bnNumber, categories, expenseNet, formatExpenseDate, formatMonth, totalExpenses, type Expense } from '@/utils/expenses';
import { buildExpenseReport } from '@/utils/expenseReport';

const mosque = 'সাগরদী বাইতুল মামুর জামে মসজিদ';
const address = 'সাগরদী কান্দাপাড়া, পাইকারচর ইউনিয়ন পরিষদ, নরসিংদী, ঢাকা, বাংলাদেশ';
const fmt = (value: number | string | null | undefined) => typeof value === 'number' ? `${bnNumber.format(value)} টাকা` : value ?? '—';
const date = () => new Intl.DateTimeFormat('bn-BD', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dhaka' }).format(new Date());
function element<K extends keyof HTMLElementTagNameMap>(tag: K, text?: string, className?: string) { const el = document.createElement(tag); if (text !== undefined) el.textContent = text; if (className) el.className = className; return el; }
function table(headers: string[]) { const t = element('table', undefined, 'expense-print-table'); const head = t.createTHead().insertRow(); headers.forEach(label => head.appendChild(element('th', label))); t.createTBody(); return t; }
function row(t: HTMLTableElement, values: string[]) { const tr = t.tBodies[0].insertRow(); values.forEach(value => tr.appendChild(element('td', value))); return tr; }
function card(label: string, value: string) { const el = element('div', undefined, 'expense-print-card'); el.append(element('span', label), element('strong', value)); return el; }

export async function downloadExpensePdf(month: string, all: Expense[], selected: Expense[]) {
  const report = buildExpenseReport(all);
  const monthReport = report.find(x => x.key === month);
  const monthItems = all.filter(x => x.date.startsWith(month));
  const totalIncome = report.reduce((n, x) => n + (typeof x.income === 'number' ? x.income : 0), 0);
  const hasIncome = report.some(x => typeof x.income === 'number');
  const expenses = report.filter(x => x.expense !== null);
  const host = element('div', undefined, 'expense-print-host');
  host.setAttribute('aria-hidden', 'true');
  document.body.append(host);
  const pages: HTMLElement[] = [];
  const makePage = () => {
    const page = element('section', undefined, 'expense-print-page');
    const header = element('div', undefined, 'expense-print-header');
    const img = element('img'); img.src = mosqueImage; img.alt = '';
    const identity = element('div'); identity.append(element('strong', mosque), element('small', address));
    header.append(img, identity, element('span', month ? formatMonth(month) : '—', 'expense-print-badge'));
    page.append(header); host.append(page); pages.push(page); return page;
  };
  let page = makePage();
  page.append(element('h1', 'দান ও ব্যয়ের প্রতিবেদন'));
  const summary = element('div', undefined, 'expense-print-summary');
  summary.append(card('মাসের আয়', fmt(monthReport?.income)), card('মাসের ব্যয়', monthItems.length ? fmt(totalExpenses(monthItems)) : '—'), card('নিট', fmt(expenseNet(monthReport?.income, monthItems))), card('ব্যয়ের সংখ্যা', bnNumber.format(selected.length)));
  const totals = element('div', undefined, 'expense-print-totals');
  totals.append(card('নথিভুক্ত মোট আয়', hasIncome ? fmt(totalIncome) : '—'), card('নথিভুক্ত মোট ব্যয়', expenses.length ? fmt(expenses.reduce((n, x) => n + (x.expense ?? 0), 0)) : '—'));
  page.append(summary, totals);
  await document.fonts.load('400 14px ReportBengali'); await document.fonts.load('700 14px ReportBengali'); await document.fonts.ready;
  const img = page.querySelector('img'); if (img && !img.complete) await new Promise<void>((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(new Error('Image failed')); });
  const limit = 1050;
  const addTable = (title: string, headers: string[], rows: string[][]) => {
    let heading = element('h2', title); let current = table(headers); page.append(heading, current);
    for (const values of rows) {
      const tr = row(current, values);
      if (tr.getBoundingClientRect().bottom - page.getBoundingClientRect().top > limit) {
        tr.remove();
        if (!current.tBodies[0].rows.length) { heading.remove(); current.remove(); }
        page = makePage(); heading = element('h2', title); current = table(headers); page.append(heading, current); const next = row(current, values);
        if (next.getBoundingClientRect().bottom - page.getBoundingClientRect().top > limit) throw new Error('Report row exceeds a page');
      }
    }
  };
  try {
    addTable('ব্যয়ের বিবরণ', ['তারিখ', 'খাত', 'বিবরণ', 'কোথায় / প্রাপক', 'পরিমাণ'], selected.length ? selected.map(x => [formatExpenseDate(x.date), categories[x.category], x.description, x.payee, fmt(x.amount)]) : [['—', '—', 'এই মাসে কোনো ব্যয় নথিভুক্ত হয়নি', '—', '—']]);
    addTable('মাসভিত্তিক হিসাব', ['মাস', 'আয়', 'ব্যয়', 'নিট'], [...report.map(x => [x.key ? formatMonth(x.key) : x.label, fmt(x.income), fmt(x.expense), fmt(x.net)]), ['মোট', hasIncome ? fmt(totalIncome) : '—', expenses.length ? fmt(expenses.reduce((n, x) => n + (x.expense ?? 0), 0)) : '—', '—']]);
    const end = element('div'); end.append(element('p', 'ড্যাশ (—) অনুপলব্ধ হিসাব নির্দেশ করে। চলমান মাসের হিসাব চূড়ান্ত নয়।', 'expense-print-note'));
    const signatures = element('div', undefined, 'expense-print-signatures'); ['প্রস্তুতকারী', 'যাচাইকারী', 'অনুমোদনকারী'].forEach(x => signatures.append(element('span', x))); end.append(signatures); page.append(end);
    if (end.getBoundingClientRect().bottom - page.getBoundingClientRect().top > limit) { end.remove(); page = makePage(); page.append(end); }
    pages.forEach((p, i) => { const footer = element('div', undefined, 'expense-print-footer'); footer.append(element('span', `তৈরির তারিখ: ${date()}`), element('span', mosque), element('span', `পৃষ্ঠা ${bnNumber.format(i + 1)} / ${bnNumber.format(pages.length)}`)); p.append(footer); });
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
    for (let i = 0; i < pages.length; i++) { if (i) pdf.addPage(); const canvas = await html2canvas(pages[i], { scale: 2, backgroundColor: '#ffffff', useCORS: true }); pdf.addImage(canvas.toDataURL('image/jpeg', 0.94), 'JPEG', 0, 0, 210, 297); }
    const blob = pdf.output('blob'); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `masjid-donation-report-${month}.pdf`; document.body.append(a); a.click(); a.remove();
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) window.open(url, '_blank');
    window.setTimeout(() => URL.revokeObjectURL(url), 120000);
  } catch (error) {
    host.removeAttribute('aria-hidden');
    window.print();
    throw error;
  } finally { host.remove(); }
}
