'use client'

import { memo, useCallback } from 'react'
import { Star, GraphicEq, Straighten } from '@mui/icons-material'
import type { Bird } from '@/data/birds.types'
import { getDominantGradient } from '@/lib/birdColors'
import { useBirdImage } from '@/hooks/useBirdImage'
import styles from './SpotlightCard.module.css'

interface SpotlightCardProps {
  bird: Bird
  onLog: (bird: Bird) => void
}

const RARITY_STARS = ['', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']

const WAVEFORM_HEIGHTS = [2, 4, 6, 3, 5, 7, 4, 2, 3, 5, 6, 4, 2, 5, 3, 1]

export default memo(function SpotlightCard({ bird, onLog }: SpotlightCardProps) {
  const [gradFrom, gradTo] = getDominantGradient(bird.dominantColor)
  const { imageUrl } = useBirdImage(bird.scientificName, bird.photoUrl)

  const _handleLog = useCallback(() => onLog(bird), [onLog, bird])

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div
          className={styles.mediaBox}
          style={{ background: `linear-gradient(160deg, ${gradFrom}, ${gradTo})` } as React.CSSProperties}
        >
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageUrl} alt={bird.commonName} className={styles.birdImage} />
          ) : (
            <div className={styles.emojiDisplay} aria-hidden="true">{bird.emoji}</div>
          )}
          <div className={styles.gradient} />

          <div className={styles.hudTopLeft}>
            <Star className={styles.hudIcon} sx={{ fontSize: 12 }} aria-hidden="true" />
            <span className={styles.hudText}>REGISTRO DESTACADO</span>
          </div>

          <div className={styles.hudTopRight}>
            <Straighten className={styles.hudIconTeal} sx={{ fontSize: 12 }} aria-hidden="true" />
            <span className={styles.hudTextTeal}>{bird.size}</span>
          </div>

          <div className={styles.hudBottom}>
            <div>
              <h2 className={styles.birdName}>{bird.commonName}</h2>
              <p className={styles.birdScientific}>{bird.scientificName}</p>
            </div>
            <div className={styles.conservationBadge}>
              <span className={styles.conservationText}>{bird.conservationStatus.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>{bird.behavior}</p>

          <div className={styles.biometricGrid}>
            <div className={styles.biometricCell}>
              <span className={styles.biometricLabel}>Tipo</span>
              <span className={styles.biometricValueTeal}>{bird.mainType}</span>
            </div>
            <div className={styles.biometricCell}>
              <span className={styles.biometricLabel}>Hábitat</span>
              <span className={styles.biometricValue}>{bird.mainHabitat}</span>
            </div>
            <div className={styles.biometricCell}>
              <span className={styles.biometricLabel}>Rareza</span>
              <span className={styles.biometricValue}>{RARITY_STARS[bird.rarityLevel]}</span>
            </div>
          </div>

          <div className={styles.waveformBox}>
            <div className={styles.waveformHeader}>
              <div className={styles.waveformLeft}>
                <GraphicEq className={styles.waveIcon} sx={{ fontSize: 16 }} aria-hidden="true" />
                <span className={styles.waveLabel}>BIOACÚSTICA • {bird.sound}</span>
              </div>
              <span className={styles.waveTime}>00:03 / 00:12</span>
            </div>
            <div className={styles.waveformBars} aria-hidden="true">
              {WAVEFORM_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className={i < 7 ? styles.barActive : styles.barInactive}
                  style={{ height: `${h * 4}px` } as React.CSSProperties}
                />
              ))}
            </div>
          </div>

          {/* TODO: Backend no implementado - reactivar cuando esté listo */}
          {/* <button className={styles.actionBtn} onClick={handleLog} type="button">
            <AssignmentTurnedIn className={styles.actionIcon} sx={{ fontSize: 18 }} aria-hidden="true" />
            <span>Anotar Avistamiento</span>
            <ArrowForward className={styles.actionIcon} sx={{ fontSize: 18 }} aria-hidden="true" />
          </button> */}
        </div>
      </div>
    </section>
  )
})
