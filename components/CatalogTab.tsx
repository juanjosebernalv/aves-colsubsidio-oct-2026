'use client'

import { memo, useState, useCallback } from 'react'
import { useMediaQuery } from '@mui/material'
import type { Bird } from '@/data/birds.types'
import { useApp } from '@/context/AppContext'
import TelemetryBar from './TelemetryBar'
import SearchBar from './SearchBar'
import FilterChips from './FilterChips'
import SpeciesCatalog from './SpeciesCatalog'
import DesktopCatalogLayout from './DesktopCatalogLayout'
import styles from './CatalogTab.module.css'

interface CatalogTabProps {
  birds: Bird[]
  onLog: (bird: Bird) => void
}

export default memo(function CatalogTab({ birds, onLog }: CatalogTabProps) {
  const { totalBirds, isOnline } = useApp()
  const [searchQuery, setSearchQuery] = useState('')
  const [endemicOnly, setEndemicOnly] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const handleSearch = useCallback((value: string) => setSearchQuery(value), [])
  const handleToggleEndemic = useCallback(() => setEndemicOnly((prev) => !prev), [])
  const handleReset = useCallback(() => {
    setSearchQuery('')
    setEndemicOnly(false)
  }, [])

  const showToast = useCallback((message: string) => {
    setToastMessage(message)
    setToastVisible(true)
    const timer = setTimeout(() => setToastVisible(false), 2200)
    return () => clearTimeout(timer)
  }, [])

  const handleAudio = useCallback((birdName: string) => {
    showToast(`Reproduciendo audio: ${birdName}`)
  }, [showToast])

  // Show desktop layout on desktop devices
  if (isDesktop) {
    return <DesktopCatalogLayout birds={birds} onLog={onLog} />
  }

  // Show mobile layout on mobile/tablet
  return (
    <div className={styles.container}>
      <TelemetryBar totalBirds={totalBirds || birds.length} isOnline={isOnline} />
      <SearchBar value={searchQuery} onChange={handleSearch} onToast={showToast} />
      <FilterChips endemicOnly={endemicOnly} onToggleEndemic={handleToggleEndemic} onReset={handleReset} />
      <SpeciesCatalog
        birds={birds}
        onLog={onLog}
        onAudio={handleAudio}
        searchQuery={searchQuery}
        endemicOnly={endemicOnly}
      />

      <div className={toastVisible ? styles.toastVisible : styles.toastHidden} role="status" aria-live="polite">
        <span className={styles.toastText}>{toastMessage}</span>
      </div>
    </div>
  )
})
