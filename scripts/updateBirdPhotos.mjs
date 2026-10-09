/**
 * Pre-fetches real image URLs for all birds in birds-data.json
 * Sources: iNaturalist (primary) → Wikimedia Commons (fallback)
 * Run: node scripts/updateBirdPhotos.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_PATH = path.join(__dirname, '../data/birds-data.json')

async function fetchFromINaturalist(scientificName) {
  const taxonRes = await fetch(
    `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(scientificName)}&rank=species`,
  )
  const taxonData = await taxonRes.json()
  if (!taxonData.results?.length) { return null }

  const taxonId = taxonData.results[0].id
  const obsRes = await fetch(
    `https://api.inaturalist.org/v1/observations?taxon_id=${taxonId}&quality_grade=research&photos=true&per_page=5&order=desc&order_by=votes`,
  )
  const obsData = await obsRes.json()

  const firstWithPhoto = obsData.results?.find((obs) => obs.photos?.length > 0)
  if (!firstWithPhoto?.photos?.[0]) { return null }

  return firstWithPhoto.photos[0].url.replace('square', 'large')
}

async function fetchFromWikimedia(scientificName) {
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
  const data = await res.json()

  if (!data.query?.pages) { return null }
  const pages = Object.values(data.query.pages)
  const first = pages.find((p) => p.imageinfo?.[0]?.url)
  return first?.imageinfo?.[0]?.url ?? null
}

async function fetchImageUrl(scientificName) {
  try {
    const url = await fetchFromINaturalist(scientificName)
    if (url) { return { url, source: 'iNaturalist' } }
  } catch (err) {
    console.warn(`  ⚠ iNaturalist failed: ${err.message}`)
  }

  try {
    const url = await fetchFromWikimedia(scientificName)
    if (url) { return { url, source: 'Wikimedia' } }
  } catch (err) {
    console.warn(`  ⚠ Wikimedia failed: ${err.message}`)
  }

  return null
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
  const birds = data.birds
  let updated = 0

  console.log(`\n🐦 Updating photo URLs for ${birds.length} birds...\n`)

  for (const bird of birds) {
    console.log(`[${bird.id}/${birds.length}] ${bird.commonName} (${bird.scientificName})`)
    const result = await fetchImageUrl(bird.scientificName)

    if (result) {
      bird.photoUrl = result.url
      updated++
      console.log(`  ✅ ${result.source}: ${result.url.slice(0, 80)}...`)
    } else {
      console.log(`  ❌ No image found — keeping original`)
    }

    // Respect API rate limits
    await new Promise((r) => setTimeout(r, 1200))
  }

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
  console.log(`\n✅ Done — updated ${updated} of ${birds.length} birds\n`)
}

main().catch((err) => {
  console.error('Script failed:', err)
  process.exit(1)
})
