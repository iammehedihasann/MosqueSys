import { Button } from '../components/Button'

export function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 text-center">
      <h1 className="text-5xl font-bold text-[var(--color-text)]">৪০৪</h1>
      <p className="mt-3 text-lg text-[var(--color-text-muted)]">পৃষ্ঠা পাওয়া যায়নি / Page not found</p>
      <Button asChild to="/" variant="primary" size="lg" className="mt-6">
        হোমে ফিরে যান / Go Home
      </Button>
    </div>
  )
}
