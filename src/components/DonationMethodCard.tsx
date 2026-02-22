import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Button } from './Button'
import { cn } from '../utils/cn'
import type { DonationMethod } from '../types'

interface DonationMethodCardProps {
  method: DonationMethod
  className?: string
}

function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text)
}

export function DonationMethodCard({ method, className }: DonationMethodCardProps) {
  const [copied, setCopied] = useState(false)
  const copyText = method.number ?? (method.bankName && method.accountName ? `${method.bankName} - ${method.accountName}` : null)

  const handleCopy = async () => {
    if (!copyText) return
    try {
      await copyToClipboard(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-white p-5 shadow-[var(--shadow-card)] transition-shadow hover:shadow-[var(--shadow-card-hover)]',
        className
      )}
    >
      <h3 className="font-semibold text-[var(--color-text)]">{method.name}</h3>
      {method.number && <p className="mt-2 text-lg font-medium text-[var(--color-primary)]">{method.number}</p>}
      {method.accountName && <p className="mt-1 text-sm text-[var(--color-text-muted)]">অ্যাকাউন্ট: {method.accountName}</p>}
      {method.bankName && <p className="text-sm text-[var(--color-text-muted)]">{method.bankName}{method.branch && `, ${method.branch}`}</p>}
      {method.qrPlaceholder && (
        <div className="mt-4 flex h-24 w-24 items-center justify-center rounded-lg border-2 border-dashed border-[var(--color-border)] bg-[var(--color-bg)] text-xs text-[var(--color-text-muted)]">
          QR কোড
        </div>
      )}
      {(method.number || method.accountName) && (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleCopy}
          className="mt-4 min-h-[44px] w-full"
        >
          {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
          {copied ? 'কপি হয়েছে' : 'কপি করুন'}
        </Button>
      )}
    </div>
  )
}
