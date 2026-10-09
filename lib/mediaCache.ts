const CACHE_PREFIX = 'bird-img-'
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000 // 7 days

interface CachedEntry {
  url: string
  timestamp: number
}

export function getCachedImageUrl(scientificName: string): string | null {
  if (typeof window === 'undefined') { return null }
  try {
    const raw = localStorage.getItem(`${CACHE_PREFIX}${scientificName}`)
    if (!raw) { return null }
    const entry: CachedEntry = JSON.parse(raw)
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(`${CACHE_PREFIX}${scientificName}`)
      return null
    }
    return entry.url
  } catch {
    return null
  }
}

export function setCachedImageUrl(scientificName: string, url: string): void {
  if (typeof window === 'undefined') { return }
  try {
    const entry: CachedEntry = { url, timestamp: Date.now() }
    localStorage.setItem(`${CACHE_PREFIX}${scientificName}`, JSON.stringify(entry))
  } catch {
    // localStorage quota exceeded — silently ignore
  }
}

export function clearMediaCache(): void {
  if (typeof window === 'undefined') { return }
  try {
    const toRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(CACHE_PREFIX)) { toRemove.push(key) }
    }
    toRemove.forEach((key) => localStorage.removeItem(key))
  } catch {
    // ignore
  }
}
