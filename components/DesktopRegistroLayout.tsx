'use client'

import { memo, useState, useCallback, useMemo } from 'react'
import type { Bird } from '@/data/birds.types'
import RegistroSidebar from './RegistroSidebar'
import RegistroHeader from './RegistroHeader'
import HourlyBlockTelemetry from './HourlyBlockTelemetry'
import RegistroSearchBox from './RegistroSearchBox'
import RegistroSpeciesCards from './RegistroSpeciesCards'
import RegistroTimeline from './RegistroTimeline'
import styles from './DesktopRegistroLayout.module.css'

interface CurrentHourData {
  hour: number
  startTime: string
  endTime: string
  elapsed: number
}

interface DesktopRegistroLayoutProps {
  birds: Bird[]
  currentHourData: CurrentHourData
}

export default memo(function DesktopRegistroLayout({
  birds,
  currentHourData,
}: DesktopRegistroLayoutProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set())
  const [selectedSizes, setSelectedSizes] = useState<Set<string>>(new Set())
  const [endemicOnly, setEndemicOnly] = useState(false)

  const handleSearch = useCallback((query: string) => setSearchQuery(query), [])

  const handleColorToggle = useCallback((color: string, checked: boolean) => {
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

  const handleSizeToggle = useCallback((size: string, checked: boolean) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(size)
      } else {
        next.delete(size)
      }
      return next
    })
  }, [])

  const handleReset = useCallback(() => {
    setSearchQuery('')
    setSelectedColors(new Set())
    setSelectedSizes(new Set())
    setEndemicOnly(false)
  }, [])

  const detectedSpecies = useMemo(() => {
    return birds.slice(0, 6).map((bird, index) => ({
      bird,
      count: [4, 2, 1, 5, 3, 1][index] || 1,
      detectionTime: `${String(currentHourData.hour).padStart(2, '0')}:${String(15 + index * 5).padStart(2, '0')}`,
    }))
  }, [birds, currentHourData.hour])

  const filteredBirds = useMemo(() => {
    return birds.filter((bird) => {
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const matches =
          bird.commonName.toLowerCase().includes(q) ||
          bird.scientificName.toLowerCase().includes(q)
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

      if (selectedSizes.size > 0) {
        const hasSize = bird.filters.size.some((s) => selectedSizes.has(s))
        if (!hasSize) {
          return false
        }
      }

      if (endemicOnly) {
        const isEndemic =
          bird.filters.status.some((s) => s.includes('endemico') || s.includes('endémico')) ||
          bird.filters.keywords.some((k) => k.includes('endemico') || k.includes('endémico'))
        if (!isEndemic) {
          return false
        }
      }

      return true
    })
  }, [birds, searchQuery, selectedColors, selectedSizes, endemicOnly])

  return (
    <div className={styles.layout}>
      <RegistroSidebar />
      <RegistroHeader />

      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          <HourlyBlockTelemetry hour={currentHourData.hour} detectedCount={detectedSpecies.length} />

          <RegistroSearchBox
            searchQuery={searchQuery}
            onSearch={handleSearch}
            onReset={handleReset}
            _availableColors={Array.from(new Set(birds.flatMap((b) => b.filters.color)))}
            availableSizes={Array.from(new Set(birds.flatMap((b) => b.filters.size)))}
            selectedColors={selectedColors}
            selectedSizes={selectedSizes}
            endemicOnly={endemicOnly}
            onColorToggle={handleColorToggle}
            onSizeToggle={handleSizeToggle}
            onEndemicToggle={() => setEndemicOnly(!endemicOnly)}
          />

          <div className={styles.splitPane}>
            <RegistroSpeciesCards
              detectedSpecies={detectedSpecies}
              expectedSpecies={filteredBirds}
              currentHour={currentHourData.hour}
            />

            <RegistroTimeline />
          </div>
        </div>
      </main>
    </div>
  )
})
