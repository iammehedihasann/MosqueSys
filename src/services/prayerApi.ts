import type { AladhanMethod, AladhanTimingsByCityData } from '../utils/aladhan'
import { fetchTimingsByCity } from '../utils/aladhan'

export interface PrayerApiParams {
  city: string
  country: string
  method: AladhanMethod
}

export async function getTimingsByCity(
  params: PrayerApiParams,
  opts?: { signal?: AbortSignal; cacheTtlMs?: number }
): Promise<AladhanTimingsByCityData> {
  return fetchTimingsByCity(params, opts)
}

