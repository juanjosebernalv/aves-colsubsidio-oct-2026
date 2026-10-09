'use client'

import { useCallback } from 'react'
import type { Bird } from '@/data/birds.types'
import type { BirdRecordInput } from '@/types/observation'
import rawBirdsData from '@/data/birds-data.json'
import AppHeader from '@/components/AppHeader'
import CatalogTab from '@/components/CatalogTab'
import AddBirdModal from '@/components/AddBirdModal'
import { useApp } from '@/context/AppContext'
import { useState } from 'react'
import styles from './page.module.css'

const catalogBirds = (rawBirdsData as { birds: Bird[] }).birds

export default function Home() {
  const { isLoading } = useApp()
  const [modalData, setModalData] = useState<Partial<BirdRecordInput> | null>(null)

  const handleLogBird = useCallback((bird: Bird) => {
    setModalData({ name: bird.commonName, scientificName: bird.scientificName })
  }, [])

  const handleCloseModal = useCallback(() => {
    setModalData(null)
  }, [])

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <span className={styles.loadingEmoji} aria-hidden="true">🦜</span>
        <p className={styles.loadingText}>Cargando catálogo...</p>
      </div>
    )
  }

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <CatalogTab birds={catalogBirds} onLog={handleLogBird} />
      </main>

      {modalData !== null && (
        <AddBirdModal onClose={handleCloseModal} initialData={modalData} />
      )}
    </>
  )
}
