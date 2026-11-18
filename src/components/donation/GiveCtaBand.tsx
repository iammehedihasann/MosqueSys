// src/components/donation/GiveCtaBand.tsx
import { HandCoins } from "lucide-react";

/** Closing call-to-action: after reading the accounts, jump back to give. */
export function GiveCtaBand({ onGive }: { onGive: () => void }) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 p-6 text-center text-white sm:flex-row sm:p-8 sm:text-left">
      <div>
        <p className="text-2xl font-bold">আপনিও মসজিদের কাজে অংশ নিন</p>
        <p className="mt-1 text-emerald-100">
          আপনার ছোট দানও মসজিদের রক্ষণাবেক্ষণ ও জনকল্যাণমূলক কাজে ব্যবহৃত হয়।
        </p>
      </div>
      <button
        type="button"
        onClick={onGive}
        className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl bg-amber-400 px-6 font-bold text-emerald-950 transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white max-sm:w-full max-sm:justify-center"
      >
        <HandCoins aria-hidden="true" className="h-5 w-5" />
        দান করুন
      </button>
    </div>
  );
}
