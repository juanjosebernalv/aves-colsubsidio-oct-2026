'use client'

import { memo, useCallback } from 'react'
import type { Bird } from '@/data/birds.types'
import { COLOR_HEX, getDominantGradient } from '@/lib/birdColors'
import { useBirdImage } from '@/hooks/useBirdImage'
import styles from './FeaturedBirdHero.module.css'

interface FeaturedBirdHeroProps {
  bird: Bird
  onLog: (bird: Bird) => void
  onAudio: (birdName: string) => void
}

export default memo(function FeaturedBirdHero({ bird, onLog, onAudio }: FeaturedBirdHeroProps) {
  const [gradFrom, gradTo] = getDominantGradient(bird.dominantColor)
  const { imageUrl } = useBirdImage(bird.scientificName, bird.photoUrl)

  const handleLog = useCallback(() => onLog(bird), [onLog, bird])
  const handleAudio = useCallback(() => onAudio(bird.commonName), [onAudio, bird.commonName])

  return (
    <section className={styles.hero}>
      <div className={styles.decorBgTop} />
      <div className={styles.decorBgBottom} />

      <div className={styles.content}>
        <div className={styles.topBar}>
          <div className={styles.badgeGroup}>
            <span className={styles.featureBadge}>
              <span className={styles.pulseDot} />
              Observación Destacada
            </span>
            <span className={styles.herbadge}>{bird.mainType}</span>
          </div>
          <div className={styles.counterGroup}>
            <span className={styles.counter}>1 / {bird.conservationStatus}</span>
          </div>
        </div>

        <div className={styles.cardGrid}>
          <div className={styles.imageSection}>
            <div
              className={styles.imageBox}
              style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` } as React.CSSProperties}
            >
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt={bird.commonName} className={styles.birdImage} />
              ) : (
                <span className={styles.emoji} aria-hidden="true">{bird.emoji}</span>
              )}
              <div className={styles.imageGradient} />
            </div>

            <div className={styles.imageFooter}>
              <span className={styles.creditLabel}>
                {bird.photoUrl ? '📷 Photo via iNaturalist' : '🦜 Specimen'}
              </span>
              <div className={styles.altitudeLabel}>
                <span>▲ {bird.mainHabitat}</span>
                <span className={styles.separator}>|</span>
                <span className={styles.statusLabel}>{bird.conservationStatus}</span>
              </div>
            </div>
          </div>

          <div className={styles.detailsSection}>
            <div className={styles.taxonomyGroup}>
              <div className={styles.familyTags}>
                <span className={styles.familyTag}>{bird.mainType}</span>
              </div>
              <h1 className={styles.commonName}>{bird.commonName}</h1>
              <p className={styles.scientificName}>{bird.scientificName}</p>
            </div>

            <p className={styles.description}>
              {bird.behavior}
            </p>

            <div className={styles.colorsSection}>
              <span className={styles.colorsLabel}>Patrón Cromático</span>
              <div className={styles.colorDots}>
                {bird.filters.color.slice(0, 3).map((color) => (
                  <span
                    key={color}
                    className={styles.colorDot}
                    style={{ backgroundColor: COLOR_HEX[color] ?? '#64748B' } as React.CSSProperties}
                    title={color}
                  />
                ))}
                {bird.traits[0] && (
                  <span className={styles.sizeLabel}>
                    Envergadura: {bird.traits[0]}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.audioSection}>
              <button className={styles.audioBtn} onClick={handleAudio} type="button">
                <span className={styles.waveIcon}>🔊</span>
                <span>Audio: {bird.sound}</span>
              </button>
            </div>

            <div className={styles.actions}>
              <button className={styles.primaryBtn} onClick={handleLog} type="button">
                Ver detalles →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})
