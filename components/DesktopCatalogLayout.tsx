'use client'

import { memo, useState, useCallback, useRef, useMemo, useEffect } from 'react'
import { CheckCircle } from '@mui/icons-material'
import type { Bird } from '@/data/birds.types'
import FeaturedBirdHero from './FeaturedBirdHero'
import CatalogSidebar from './CatalogSidebar'
import SpecimenCard from './SpecimenCard'
import styles from './DesktopCatalogLayout.module.css'

interface DesktopCatalogLayoutProps {
  birds: Bird[]
  onLog: (bird: Bird) => void
}

function matchesBird(
  bird: Bird,
  query: string,
  endemicOnly: boolean,
  selectedColors: Set<string>,
  selectedFamilies: Set<string>,
  selectedHabitats: Set<string>,
): boolean {
  if (endemicOnly) {
    const isEndemic =
      bird.filters.status.some((s) => s.includes('endémico') || s.includes('endemico')) ||
      bird.filters.keywords.some((k) => k.includes('endémico') || k.includes('endemico'))
    if (!isEndemic) {
      return false
    }
  }

  if (query) {
    const q = query.toLowerCase()
    const matches =
      bird.commonName.toLowerCase().includes(q) ||
      bird.scientificName.toLowerCase().includes(q) ||
      bird.mainType.toLowerCase().includes(q) ||
      bird.mainHabitat.toLowerCase().includes(q) ||
      bird.behavior.toLowerCase().includes(q) ||
      bird.filters.keywords.some((k) => k.toLowerCase().includes(q))
    if (!matches) {
      return false
    }
  }

  if (selectedColors.size > 0) {
    const hasColor = bird.filters.color.some((c) => selectedColors.has(c))
    if (!hasColor) {
      return false
    }
  }

  if (selectedFamilies.size > 0) {
    if (!selectedFamilies.has(bird.mainType)) {
      return false
    }
  }

  if (selectedHabitats.size > 0) {
    if (!selectedHabitats.has(bird.mainHabitat)) {
      return false
    }
  }

  return true
}

export default memo(function DesktopCatalogLayout({ birds, onLog }: DesktopCatalogLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [endemicOnly, setEndemicOnly] = useState(false)
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set())
  const [selectedFamilies, setSelectedFamilies] = useState<Set<string>>(new Set())
  const [selectedHabitats, setSelectedHabitats] = useState<Set<string>>(new Set())
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const filtered = useMemo(
    () =>
      birds.filter((b) =>
        matchesBird(b, searchQuery, endemicOnly, selectedColors, selectedFamilies, selectedHabitats),
      ),
    [birds, searchQuery, endemicOnly, selectedColors, selectedFamilies, selectedHabitats],
  )

  const [spotlight, rest] = useMemo(() => {
    if (filtered.length === 0) {
      return [null, []] as [null, Bird[]]
    }
    return [filtered[0], filtered.slice(1)] as [Bird, Bird[]]
  }, [filtered])

  const handleSearch = useCallback((value: string) => setSearchQuery(value), [])
  const handleEndemicChange = useCallback((value: boolean) => setEndemicOnly(value), [])

  const handleColorChange = useCallback((color: string, checked: boolean) => {
    setSelectedColors((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(color)
      } else {
        next.delete(color)
      }
      return next
    })
  }, [])

  const handleFamilyChange = useCallback((family: string, checked: boolean) => {
    setSelectedFamilies((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(family)
      } else {
        next.delete(family)
      }
      return next
    })
  }, [])

  const handleHabitatChange = useCallback((habitat: string, checked: boolean) => {
    setSelectedHabitats((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(habitat)
      } else {
        next.delete(habitat)
      }
      return next
    })
  }, [])

  const handleReset = useCallback(() => {
    setSearchQuery('')
    setEndemicOnly(false)
    setSelectedColors(new Set())
    setSelectedFamilies(new Set())
    setSelectedHabitats(new Set())
  }, [])

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) {
      clearTimeout(toastTimer.current)
    }
    setToastMessage(message)
    setToastVisible(true)
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200)
  }, [])

  const handleAudio = useCallback(
    (birdName: string) => {
      showToast(`Reproduciendo audio: ${birdName}`)
    },
    [showToast],
  )

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current)
      }
    }
  }, [])

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      {spotlight && <FeaturedBirdHero bird={spotlight} onLog={onLog} onAudio={handleAudio} />}

      {/* Main Grid: Sidebar + Catalog */}
      <section className={styles.mainSection}>
        <div className={styles.innerGrid}>
          {/* Sidebar */}
          <CatalogSidebar
            searchQuery={searchQuery}
            endemicOnly={endemicOnly}
            selectedColors={selectedColors}
            selectedFamilies={selectedFamilies}
            selectedHabitats={selectedHabitats}
            onSearchChange={handleSearch}
            onEndemicChange={handleEndemicChange}
            onColorChange={handleColorChange}
            onFamilyChange={handleFamilyChange}
            onHabitatChange={handleHabitatChange}
            onReset={handleReset}
            birds={birds}
          />

          {/* Catalog Grid */}
          <main className={styles.catalogSection}>
            <div className={styles.catalogHeader}>
              <div className={styles.headerLeft}>
                <span className={styles.catalogTitle}>Catálogo de Especies</span>
                <span className={styles.countBadge}>
                  Mostrando {filtered.length} de {birds.length} aves
                </span>
              </div>
              <div className={styles.sortBox}>
                <span className={styles.sortLabel}>Ordenar por:</span>
                <select className={styles.sortSelect}>
                  <option>Taxonómico A-Z</option>
                  <option>Familia</option>
                  <option>Recientes</option>
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <span className={styles.emptyEmoji} role="img" aria-hidden="true">
                  🔍
                </span>
                <p className={styles.emptyText}>No se encontraron especies</p>
                <p className={styles.emptyHint}>Intenta con otro término de búsqueda</p>
              </div>
            ) : (
              <div className={styles.cardsGrid}>
                {rest.map((bird) => (
                  <SpecimenCard key={bird.id} bird={bird} onLog={onLog} onAudio={handleAudio} />
                ))}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* Toast */}
      <div
        className={toastVisible ? styles.toastVisible : styles.toastHidden}
        role="status"
        aria-live="polite"
      >
        <CheckCircle className={styles.toastIcon} sx={{ fontSize: 18 }} aria-hidden="true" />
        <span className={styles.toastText}>{toastMessage}</span>
      </div>
    </div>
  )
})
