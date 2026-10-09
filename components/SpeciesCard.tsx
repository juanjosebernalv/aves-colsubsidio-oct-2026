'use client'

import { memo, useCallback } from 'react'
import type { Bird } from '@/data/birds.types'
import { useBirdImage } from '@/hooks/useBirdImage'
import styles from './SpeciesCard.module.css'

interface SpeciesCardProps {
  bird: Bird
  count: number
  onCountChange: (newCount: number) => void
  detectionTime: string
  isLarge?: boolean
}

export default memo(function SpeciesCard({
  bird,
  count,
  onCountChange,
  detectionTime,
  isLarge = true,
}: SpeciesCardProps) {
  const { imageUrl } = useBirdImage(bird.scientificName, bird.photoUrl)

  const handleIncrement = useCallback(() => onCountChange(count + 1), [count, onCountChange])
  const handleDecrement = useCallback(() => onCountChange(Math.max(0, count - 1)), [count, onCountChange])

  if (!isLarge) {
    return (
      <div className={styles.cardCompact}>
        <div className={styles.compactBody}>
          <div className={styles.compactInfo}>
            <span className={styles.compactTime}>{detectionTime} • {bird.mainType}</span>
            <h4 className={styles.compactTitle}>{bird.commonName}</h4>
            <p className={styles.compactScientific}>{bird.scientificName}</p>
          </div>
          <span className={styles.conservationBadge}>{bird.conservationStatus}</span>
        </div>

        <p className={styles.compactDescription}>{bird.behavior}</p>

        <div className={styles.compactFooter}>
          <span className={styles.eBirdCode}>{bird.commonName.substring(0, 6).toUpperCase()} • {count} ind</span>
          <div className={styles.counterCompact}>
            <button className={styles.counterBtn} onClick={handleDecrement}>
              −
            </button>
            <span className={styles.counterValue}>{count}</span>
            <button className={styles.counterBtnPrimary} onClick={handleIncrement}>
              +
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageSection}>
        <div className={styles.imageContainer}>
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={bird.commonName} className={styles.birdImage} />
          ) : (
            <span className={styles.emoji}>{bird.emoji}</span>
          )}
        </div>
        <div className={styles.imageFooter}>
          <span className={styles.timeStamp}>{detectionTime} COT</span>
          <span className={styles.elevationCode}>
            {bird.commonName.substring(0, 6).toUpperCase()} • ▲ 1,820 m
          </span>
        </div>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.titleSection}>
          <div className={styles.titleGroup}>
            <h3 className={styles.cardTitle}>{bird.commonName}</h3>
            <p className={styles.cardScientific}>{bird.scientificName}</p>
          </div>
          <div className={styles.badgeGroup}>
            <span className={styles.behaviorBadge}>ESPECIE PRINCIPAL</span>
            <span className={styles.statusBadge}>{bird.conservationStatus}</span>
            <span className={styles.familyBadge}>{bird.mainType}</span>
          </div>
        </div>

        <div className={styles.fieldsSection}>
          <span className={styles.fieldLabel}>{count} individuos registrados en esta hora</span>
          <p className={styles.fieldNote}>{bird.behavior}</p>
        </div>

        <div className={styles.counterSection}>
          <button className={styles.counterBtn} onClick={handleDecrement}>
            −
          </button>
          <div className={styles.counterDisplay}>
            <span className={styles.counterNumber}>{count}</span>
            <span className={styles.counterLabel}>INDIVIDUOS</span>
          </div>
          <button className={styles.counterBtnPrimary} onClick={handleIncrement}>
            +
          </button>
        </div>
      </div>
    </article>
  )
})
