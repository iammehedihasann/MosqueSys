export type AladhanMethod = number

export interface AladhanTimingsByCityParams {
  city: string
  country: string
  method: AladhanMethod
}

export interface AladhanTimingsByCityData {
  timings: Record<string, string>
  date: {
    readable: string
    timestamp: string
    gregorian?: { date?: string }
    hijri?: { date?: string }
  }
  meta?: {
    timezone?: string
    method?: { id?: number; name?: string }
  }
}

export interface AladhanTimingsByCityResponse {
  code: number
  status: string
  data: AladhanTimingsByCityData
}

export function sanitizeAladhanTime(value: string): string {
  // API sometimes includes timezone text, e.g. "05:12 (BST)". We only want HH:MM.
  const match = value.match(/\d{1,2}:\d{2}/)
  return match ? match[0] : value
}

function ymdLocal(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

type CacheEntry = { key: string; fetchedAt: number; data: AladhanTimingsByCityData }
let cache: CacheEntry | null = null

export async function fetchTimingsByCity(
  params: AladhanTimingsByCityParams,
  opts?: { signal?: AbortSignal; cacheTtlMs?: number }
): Promise<AladhanTimingsByCityData> {
  const cacheTtlMs = opts?.cacheTtlMs ?? 5 * 60 * 1000
  const todayKey = ymdLocal(new Date())
  const key = `${params.city}|${params.country}|${params.method}|${todayKey}`

  if (cache && cache.key === key && Date.now() - cache.fetchedAt < cacheTtlMs) {
    return cache.data
  }

  const url = new URL('https://api.aladhan.com/v1/timingsByCity')
  url.searchParams.set('city', params.city)
  url.searchParams.set('country', params.country)
  url.searchParams.set('method', String(params.method))

  const res = await fetch(url.toString(), { signal: opts?.signal })
  if (!res.ok) {
    throw new Error(`Failed to load prayer times (${res.status})`)
  }

  const json = (await res.json()) as AladhanTimingsByCityResponse
  if (!json || typeof json !== 'object' || !json.data || !json.data.timings) {
    throw new Error('Unexpected prayer time response')
  }

  cache = { key, fetchedAt: Date.now(), data: json.data }
  return json.data
}

