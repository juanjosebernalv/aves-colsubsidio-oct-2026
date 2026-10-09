import { getCachedImageUrl, setCachedImageUrl } from './mediaCache'

// iNaturalist API types
interface INatPhoto {
  url: string
}
interface INatObservation {
  photos?: INatPhoto[]
  user?: { login: string }
  license_code?: string
}
interface INatObsResponse {
  results?: INatObservation[]
}
interface INatTaxon {
  id: number
}
interface INatTaxonResponse {
  results?: INatTaxon[]
}

// Wikimedia API types
interface WikiImageInfo {
  url: string
  thumburl?: string
}
interface WikiPage {
  imageinfo?: WikiImageInfo[]
}
interface WikiResponse {
  query?: {
    pages?: Record<string, WikiPage>
  }
}

async function fetchFromINaturalist(scientificName: string): Promise<string | null> {
  const taxonRes = await fetch(
    `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(scientificName)}&rank=species`,
  )
  const taxonData: INatTaxonResponse = await taxonRes.json()
  if (!taxonData.results?.length) { return null }

  const taxonId = taxonData.results[0].id
  const obsRes = await fetch(
    `https://api.inaturalist.org/v1/observations?taxon_id=${taxonId}&quality_grade=research&photos=true&per_page=5&order=desc&order_by=votes`,
  )
  const obsData: INatObsResponse = await obsRes.json()

  const firstWithPhoto = obsData.results?.find((obs) => obs.photos && obs.photos.length > 0)
  if (!firstWithPhoto?.photos?.[0]) { return null }

  return firstWithPhoto.photos[0].url.replace('square', 'large')
}

async function fetchFromWikimedia(scientificName: string): Promise<string | null> {
  const params = new URLSearchParams({
    action: 'query',
    format: 'json',
    prop: 'imageinfo',
    generator: 'search',
    gsrsearch: scientificName,
    gsrnamespace: '6',
    iiprop: 'url',
    iiurlwidth: '800',
    origin: '*',
  })
  const res = await fetch(`https://commons.wikimedia.org/w/api.php?${params.toString()}`)
  const data: WikiResponse = await res.json()
  if (!data.query?.pages) { return null }

  const pages = Object.values(data.query.pages)
  const first = pages.find((p) => p.imageinfo?.[0]?.url)
  return first?.imageinfo?.[0]?.url ?? null
}

export async function fetchBirdImageUrl(scientificName: string): Promise<string | null> {
  const cached = getCachedImageUrl(scientificName)
  if (cached) { return cached }

  try {
    const url = await fetchFromINaturalist(scientificName)
    if (url) {
      setCachedImageUrl(scientificName, url)
      return url
    }
  } catch (err) {
    console.warn('iNaturalist fetch failed, trying Wikimedia:', err)
  }

  try {
    const url = await fetchFromWikimedia(scientificName)
    if (url) {
      setCachedImageUrl(scientificName, url)
      return url
    }
  } catch (err) {
    console.warn('Wikimedia fetch also failed:', err)
  }

  return null
}
