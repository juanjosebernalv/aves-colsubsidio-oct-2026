'use client'

import { memo, useState, useCallback, useMemo } from 'react'
import type { Bird } from '@/data/birds.types'
import styles from './MobileRegistroLayout.module.css'

interface CurrentHourData {
  hour: number
  startTime: string
  endTime: string
  elapsed: number
}

interface MobileRegistroLayoutProps {
  birds: Bird[]
  currentHourData: CurrentHourData
}

export default memo(function MobileRegistroLayout({
  birds,
  currentHourData,
}: MobileRegistroLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [counts, setCounts] = useState<Record<number, number>>({})

  const detectedSpecies = useMemo(() => {
    return birds.slice(0, 8).map((bird, index) => ({
      bird,
      count: [4, 2, 1, 5, 3, 1, 2, 3][index] || 1,
    }))
  }, [birds])

  const handleCountChange = useCallback((index: number, delta: number) => {
    setCounts((prev) => ({
      ...prev,
      [index]: Math.max(0, (prev[index] || detectedSpecies[index].count) + delta),
    }))
  }, [detectedSpecies])

  const percentComplete = Math.round((currentHourData.elapsed / 60) * 100)

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.timeSection}>
            <span className={styles.timeLabel}>🕐 {currentHourData.startTime}</span>
            <span className={styles.timeRange}>últimas 24h</span>
          </div>
          <div className={styles.metricsSection}>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Especies</span>
              <span className={styles.metricValue}>24</span>
            </div>
            <div className={styles.metric}>
              <span className={styles.metricLabel}>Individuos</span>
              <span className={styles.metricValue}>87</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percentComplete}%` }} />
        </div>
        <div className={styles.progressLabel}>{percentComplete}% - {60 - currentHourData.elapsed} min</div>
      </header>

      {/* Search & Filters */}
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Buscar especie..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className={styles.filterChips}>
          <button className={styles.chip}>🌿 Verde</button>
          <button className={styles.chip}>🔵 Azul</button>
          <button className={styles.chip}>⭐ Endémica</button>
        </div>
      </div>

      {/* Species Cards Stack */}
      <main className={styles.cardsStack}>
        {detectedSpecies.map((species, index) => (
          <div key={species.bird.id} className={styles.mobileCard}>
            <div className={styles.mobileImageContainer}>
              {species.bird.photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={species.bird.photoUrl}
                  alt={species.bird.commonName}
                  className={styles.mobileImage}
                />
              ) : (
                <div className={styles.mobilePlaceholder}>{species.bird.emoji}</div>
              )}
              <div className={styles.mobileImageOverlay}>
                <span className={styles.timeTag}>{currentHourData.startTime}</span>
              </div>
            </div>

            <div className={styles.mobileCardContent}>
              <h3 className={styles.mobileName}>{species.bird.commonName}</h3>
              <p className={styles.mobileScientific}>{species.bird.scientificName}</p>

              <div className={styles.mobileCounterRow}>
                <button
                  className={styles.minusBtn}
                  onClick={() => handleCountChange(index, -1)}
                >
                  −
                </button>
                <div className={styles.mobileCounterDisplay}>
                  <span className={styles.mobileCount}>
                    {counts[index] ?? species.count}
                  </span>
                  <span className={styles.mobileCountLabel}>ind</span>
                </div>
                <button
                  className={styles.plusBtn}
                  onClick={() => handleCountChange(index, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        <button className={styles.navBtn}>
          📍
          <span>Campo</span>
        </button>
        <button className={styles.navBtn}>
          📊
          <span>Datos</span>
        </button>
        <button className={styles.syncBtn}>
          ⬆ Sync
        </button>
        <button className={styles.navBtn}>
          ⚙️
          <span>Config</span>
        </button>
      </div>
    </div>
  )
})
