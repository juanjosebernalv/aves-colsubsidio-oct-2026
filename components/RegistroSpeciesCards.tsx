'use client'

import { memo, useState, useCallback } from 'react'
import type { Bird } from '@/data/birds.types'
import SpeciesCard from './SpeciesCard'
import styles from './RegistroSpeciesCards.module.css'

interface DetectedSpecies {
  bird: Bird
  count: number
  detectionTime: string
}

interface RegistroSpeciesCardsProps {
  detectedSpecies: DetectedSpecies[]
  expectedSpecies: Bird[]
  currentHour: number
}

export default memo(function RegistroSpeciesCards({
  detectedSpecies,
  expectedSpecies,
  currentHour,
}: RegistroSpeciesCardsProps) {
  const [counts, setCounts] = useState<Record<number, number>>(
    detectedSpecies.reduce(
      (acc, spec, _idx) => {
        acc[_idx] = spec.count
        return acc
      },
      {} as Record<number, number>,
    ),
  )

  const handleCountChange = useCallback((index: number, newCount: number) => {
    setCounts((prev) => ({
      ...prev,
      [index]: Math.max(0, newCount),
    }))
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerLeft}>
          <h3 className={styles.sectionTitle}>Registro Directo por Especie</h3>
          <span className={styles.countBadge}>{detectedSpecies.length} DETECTADAS EN BLOQUE ACTUAL</span>
        </div>
        <div className={styles.sortControl}>
          <span>ORDEN:</span>
          <span className={styles.sortValue}>MÁS RECIENTES</span>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {detectedSpecies.slice(0, 2).map((species, index) => (
          <SpeciesCard
            key={`${species.bird.id}-large`}
            bird={species.bird}
            count={counts[index] || species.count}
            onCountChange={(newCount) => handleCountChange(index, newCount)}
            detectionTime={species.detectionTime}
            isLarge
          />
        ))}

        <div className={styles.compactGrid}>
          {detectedSpecies.slice(2).map((species, index) => (
            <SpeciesCard
              key={`${species.bird.id}-compact`}
              bird={species.bird}
              count={counts[index + 2] || species.count}
              onCountChange={(newCount) => handleCountChange(index + 2, newCount)}
              detectionTime={species.detectionTime}
              isLarge={false}
            />
          ))}
        </div>
      </div>

      <div className={styles.expectedSection}>
        <p className={styles.expectedTitle}>
          Especies Esperadas en el Transecto (Aún sin registrar en {String(currentHour).padStart(2, '0')}:00-59)
        </p>
        <p className={styles.expectedSubtitle}>Basado en checklist histórico GBD 2024</p>

        <div className={styles.expectedGrid}>
          {expectedSpecies.slice(0, 4).map((bird) => (
            <div key={bird.id} className={styles.expectedCard}>
              <div className={styles.expectedInfo}>
                <h4 className={styles.expectedName}>{bird.commonName}</h4>
                <p className={styles.expectedScientific}>{bird.scientificName} • 0 ind</p>
              </div>
              <button className={styles.addBtn}>
                <span>+</span>
                <span>REGISTRAR</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})
