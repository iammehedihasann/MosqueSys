// src/components/donation/SectionNav.tsx
import { useActiveSection } from "./useActiveSection";
import { scrollToSection } from "@/utils/scroll";

export interface NavItem {
  id: string;
  label: string;
}

/**
 * Sticky in-page menu. If your site header is sticky too,
 * change `top-0` to the header height (e.g. `top-16`).
 */
const DEFAULT_ITEMS: NavItem[] = [
  { id: "donation-methods", label: "দান করার মাধ্যম" },
  { id: "donation-categories", label: "দানের খাত" },
  { id: "donation-expenses", label: "খরচের বিবরণ" },
  { id: "donation-accounts", label: "হিসাব" },
];

export function SectionNav({ items = DEFAULT_ITEMS }: { items?: NavItem[] }) {
  const active = useActiveSection(items.map((i) => i.id));

  return (
    <nav
      aria-label="পৃষ্ঠার অংশসমূহ"
      className="sticky top-0 z-20 -mx-4 mb-10 border-y border-gray-100 bg-white/90 px-4 py-2 shadow-sm backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:px-2"
    >
      <ul className="flex gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
        {items.map((item) => {
          const on = active === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={on ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className={`flex min-h-11 items-center rounded-xl px-4 text-sm font-semibold whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 sm:text-base ${
                  on
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "text-gray-700 hover:bg-emerald-50"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
