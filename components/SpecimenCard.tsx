'use client'

import { memo, useCallback } from 'react'
import { VolumeUp, EditNote } from '@mui/icons-material'
import type { Bird } from '@/data/birds.types'
import { COLOR_HEX, getDominantGradient, getStatusVariant, isEndemicBird } from '@/lib/birdColors'
import { useBirdImage } from '@/hooks/useBirdImage'
import styles from './SpecimenCard.module.css'

interface SpecimenCardProps {
  bird: Bird
  onLog: (bird: Bird) => void
  onAudio: (birdName: string) => void
}

const STATUS_LABELS: Record<string, string> = {
  endemic: 'ENDÉMICA',
  threatened: 'CRÍTICO',
  stable: 'ESTABLE',
  rare: 'RARA',
}

const BADGE_CLASS: Record<string, keyof typeof styles> = {
  endemic: 'badgeEndemic',
  threatened: 'badgeThreatened',
  stable: 'badgeStable',
  rare: 'badgeRare',
}

export default memo(function SpecimenCard({ bird, onLog, onAudio }: SpecimenCardProps) {
  const endemic = isEndemicBird(bird)
  const statusVariant = getStatusVariant(bird.conservationStatus, endemic)
  const [gradFrom, gradTo] = getDominantGradient(bird.dominantColor)
  const colorDots = bird.filters.color.slice(0, 3)
  const traitLabel = bird.traits[0] ?? ''
  const { imageUrl } = useBirdImage(bird.scientificName, bird.photoUrl)

  const handleLog = useCallback(() => onLog(bird), [onLog, bird])
  const handleAudio = useCallback(() => onAudio(bird.commonName), [onAudio, bird.commonName])

  return (
    <article className={styles.card}>
      <div className={styles.top}>
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
          <div className={styles.imageOverlay} />
        </div>

        <div className={styles.content}>
          <div className={styles.nameRow}>
            <div className={styles.nameStack}>
              <h3 className={styles.commonName}>{bird.commonName}</h3>
              <p className={styles.scientificName}>{bird.scientificName}</p>
            </div>
            <span className={styles[BADGE_CLASS[statusVariant]]}>
              {STATUS_LABELS[statusVariant]}
            </span>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.family}>{bird.mainType}</span>
            <span className={styles.metaDot}>•</span>
            <span className={styles.habitat}>{bird.mainHabitat}</span>
          </div>

          <div className={styles.colorsRow}>
            {colorDots.map((color) => (
              <span
                key={color}
                className={styles.colorDot}
                style={{ backgroundColor: COLOR_HEX[color] ?? '#64748B' } as React.CSSProperties}
                title={color}
              />
            ))}
            {traitLabel && <span className={styles.traitLabel}>{traitLabel.toUpperCase()}</span>}
          </div>
        </div>
      </div>

      <p className={styles.description}>{bird.behavior}</p>

      <div className={styles.footer}>
        <button className={styles.audioBtn} onClick={handleAudio} type="button" aria-label={`Reproducir sonido de ${bird.commonName}`}>
          <VolumeUp className={styles.audioIcon} sx={{ fontSize: 16 }} aria-hidden="true" />
          <span className={styles.audioLabel}>{bird.sound}</span>
        </button>
        {/* TODO: Backend no implementado - reactivar cuando esté listo */}
        {/* <button className={styles.logBtn} onClick={handleLog} type="button">
          <EditNote className={styles.logIcon} sx={{ fontSize: 14 }} aria-hidden="true" />
          <span>Anotar</span>
        </button> */}
      </div>
    </article>
  )
})
