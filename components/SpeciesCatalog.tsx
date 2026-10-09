'use client'

import { memo, useMemo } from 'react'
import { ArrowDropDown } from '@mui/icons-material'
import type { Bird } from '@/data/birds.types'
import SpotlightCard from './SpotlightCard'
import SpecimenCard from './SpecimenCard'
import styles from './SpeciesCatalog.module.css'

interface SpeciesCatalogProps {
  birds: Bird[]
  onLog: (bird: Bird) => void
  onAudio: (birdName: string) => void
  searchQuery: string
  endemicOnly: boolean
}

function matchesBird(bird: Bird, query: string, endemicOnly: boolean): boolean {
  if (endemicOnly) {
    const isEndemic =
      bird.filters.status.some((s) => s.includes('endémico') || s.includes('endemico')) ||
      bird.filters.keywords.some((k) => k.includes('endémico') || k.includes('endemico'))
    if (!isEndemic) { return false }
  }
  if (!query) { return true }
  const q = query.toLowerCase()
  return (
    bird.commonName.toLowerCase().includes(q) ||
    bird.scientificName.toLowerCase().includes(q) ||
    bird.mainType.toLowerCase().includes(q) ||
    bird.mainHabitat.toLowerCase().includes(q) ||
    bird.behavior.toLowerCase().includes(q) ||
    bird.filters.keywords.some((k) => k.toLowerCase().includes(q))
  )
}

export default memo(function SpeciesCatalog({ birds, onLog, onAudio, searchQuery, endemicOnly }: SpeciesCatalogProps) {
  const filtered = useMemo(
    () => birds.filter((b) => matchesBird(b, searchQuery, endemicOnly)),
    [birds, searchQuery, endemicOnly],
  )

  const [spotlight, rest] = useMemo(() => {
    if (filtered.length === 0) { return [null, []] as [null, Bird[]] }
    return [filtered[0], filtered.slice(1)] as [Bird, Bird[]]
  }, [filtered])

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>Matriz de Especies</span>
          <span className={styles.countBadge}>{filtered.length} REGISTROS</span>
        </div>
        <div className={styles.sort}>
          <span className={styles.sortLabel}>ORDEN: ALFA</span>
          <ArrowDropDown className={styles.sortIcon} sx={{ fontSize: 14 }} aria-hidden="true" />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyEmoji} aria-hidden="true">🔍</span>
          <p className={styles.emptyText}>No se encontraron especies</p>
          <p className={styles.emptyHint}>Intenta con otro término de búsqueda</p>
        </div>
      ) : (
        <>
          {spotlight && <SpotlightCard bird={spotlight} onLog={onLog} />}
          <div className={styles.list}>
            {rest.map((bird) => (
              <SpecimenCard key={bird.id} bird={bird} onLog={onLog} onAudio={onAudio} />
            ))}
          </div>
        </>
      )}
    </div>
  )
})
