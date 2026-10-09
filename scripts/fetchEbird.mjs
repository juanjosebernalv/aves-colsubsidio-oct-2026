/**
 * Fetches eBird data for every species in data/birds-data.json.
 *
 * Requires an eBird API key in the environment (never store it in the repo):
 *   export EBIRD_API_KEY="your-key"
 * Optional region (default: Cundinamarca, where Piscilago is located):
 *   export EBIRD_REGION="CO-CUN"
 *
 * Run: node scripts/fetchEbird.mjs
 * Output: data/ebird-raw.json
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_PATH = path.join(__dirname, '../data/birds-data.json')
const OUT_PATH = path.join(__dirname, '../data/ebird-raw.json')
const API = 'https://api.ebird.org/v2'
const API_KEY = process.env.EBIRD_API_KEY
const REGION = process.env.EBIRD_REGION || 'CO-CUN'
const DELAY_MS = 300

if (!API_KEY) {
  console.error('Falta la variable EBIRD_API_KEY. Ejemplo: export EBIRD_API_KEY="..."')
  process.exit(1)
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function ebirdGet(endpoint) {
  const res = await fetch(`${API}${endpoint}`, { headers: { 'X-eBirdApiToken': API_KEY } })
  if (!res.ok) {
    throw new Error(`eBird ${res.status} en ${endpoint}`)
  }
  return res.json()
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'))
  const birds = data.birds

  console.log('Descargando taxonomía de eBird...')
  const taxonomy = await ebirdGet('/ref/taxonomy/ebird?fmt=json&cat=species')
  const bySciName = new Map(taxonomy.map((t) => [t.sciName.toLowerCase(), t]))

  console.log(`Descargando lista de especies de la región ${REGION}...`)
  const regionCodes = new Set(await ebirdGet(`/product/spplist/${REGION}`))

  const results = []
  for (const bird of birds) {
    const tax = bySciName.get(bird.scientificName.toLowerCase())
    const entry = {
      id: bird.id,
      scientificName: bird.scientificName,
      matchedInEbird: Boolean(tax),
      speciesCode: tax?.speciesCode ?? null,
      eBirdCommonName: tax?.comName ?? null,
      eBirdUrl: tax ? `https://ebird.org/species/${tax.speciesCode}` : null,
      seenInRegion: tax ? regionCodes.has(tax.speciesCode) : false,
      recentObservations30d: 0,
      recentLocations30d: 0,
    }

    if (tax && entry.seenInRegion) {
      await sleep(DELAY_MS)
      const obs = await ebirdGet(`/data/obs/${REGION}/recent/${tax.speciesCode}?back=30&maxResults=10000`)
      entry.recentObservations30d = obs.length
      entry.recentLocations30d = new Set(obs.map((o) => o.locId)).size
    }

    console.log(`[${bird.id}] ${bird.scientificName} → ${entry.speciesCode ?? 'NO ENCONTRADA'} (30d: ${entry.recentObservations30d})`)
    results.push(entry)
    await sleep(DELAY_MS)
  }

  const output = {
    generatedAt: new Date().toISOString(),
    region: REGION,
    totalSpecies: results.length,
    matched: results.filter((r) => r.matchedInEbird).length,
    notMatched: results.filter((r) => !r.matchedInEbird).map((r) => r.scientificName),
    birds: results,
  }
  fs.writeFileSync(OUT_PATH, JSON.stringify(output, null, 2) + '\n')
  console.log(`\nListo: ${output.matched}/${output.totalSpecies} emparejadas. Resultado en data/ebird-raw.json`)
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
