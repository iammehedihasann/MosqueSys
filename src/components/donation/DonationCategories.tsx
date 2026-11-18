// src/components/donation/DonationCategories.tsx
import type { ReactNode } from "react";
import {
  Building2,
  HandCoins,
  Lightbulb,
  PiggyBank,
  TriangleAlert,
  User,
} from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface Category {
  id: string | number;
  name: string;
  nameBn?: string;
  description?: string;
}

const categoryIcons: Record<string, ReactNode> = {
  "Monthly Fund": <PiggyBank className="h-7 w-7 text-accent" />,
  "Imam Salary": <User className="h-7 w-7 text-lime-700" />,
  "Electricity Bill": <Lightbulb className="h-7 w-7 text-yellow-500" />,
  Development: <Building2 className="h-7 w-7 text-slate-700" />,
  "Zakat/Fitra": <HandCoins className="h-7 w-7 text-green-600" />,
  "Emergency Fund": <TriangleAlert className="h-7 w-7 text-red-600" />,
};

export function DonationCategories({ categories }: { categories: Category[] }) {
  return (
    <div id="donation-categories" className="scroll-mt-24">
      <SectionTitle
        title="দানের খাত"
        subtitle="আপনার দান নিচের খাতগুলোতে ব্যবহার করা হয়।"
      />
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex items-center gap-4 rounded-xl border-t-2 border-green-600 bg-white p-4 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]"
          >
            <span aria-hidden="true" className="shrink-0">
              {categoryIcons[cat.name] ?? (
                <PiggyBank className="h-7 w-7 text-accent" />
              )}
            </span>
            <div className="min-w-0">
              {cat.nameBn && (
                <p className="text-xl font-medium text-[var(--color-text)]">
                  {cat.nameBn}
                </p>
              )}
              {cat.description && (
                <p className="mt-0.5 text-[15px] text-[var(--color-text-muted)]">
                  {cat.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
