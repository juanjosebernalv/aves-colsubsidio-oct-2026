'use client'

import { memo, useCallback, useState } from 'react'
import { VolumeUp, EditNote, Visibility, Close, Star, Straighten, GraphicEq } from '@mui/icons-material'
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

const RARITY_STARS = ['', '⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐']
const WAVEFORM_HEIGHTS = [2, 4, 6, 3, 5, 7, 4, 2, 3, 5, 6, 4, 2, 5, 3, 1]

export default memo(function SpecimenCard({ bird, onLog, onAudio }: SpecimenCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const endemic = isEndemicBird(bird)
  const statusVariant = getStatusVariant(bird.conservationStatus, endemic)
  const [gradFrom, gradTo] = getDominantGradient(bird.dominantColor)
  const colorDots = bird.filters.color.slice(0, 3)
  const traitLabel = bird.traits[0] ?? ''
  const { imageUrl } = useBirdImage(bird.scientificName, bird.photoUrl)

  const handleLog = useCallback(() => onLog(bird), [onLog, bird])
  const handleAudio = useCallback(() => onAudio(bird.commonName), [onAudio, bird.commonName])
  const handleToggleExpand = useCallback(() => setIsExpanded((prev) => !prev), [])

  if (isExpanded) {
    return (
      <div className={styles.expandedOverlay}>
        <div className={styles.expandedCard}>
          <button
            className={styles.closeBtn}
            onClick={handleToggleExpand}
            type="button"
            aria-label="Cerrar"
          >
            <Close sx={{ fontSize: 24 }} aria-hidden="true" />
          </button>

          <div
            className={styles.expandedMediaBox}
            style={{ background: `linear-gradient(160deg, ${gradFrom}, ${gradTo})` } as React.CSSProperties}
          >
            {imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imageUrl} alt={bird.commonName} className={styles.expandedBirdImage} />
            ) : (
              <div className={styles.expandedEmojiDisplay} aria-hidden="true">{bird.emoji}</div>
            )}
            <div className={styles.expandedGradient} />

            <div className={styles.expandedHudTopLeft}>
              <Star className={styles.expandedHudIcon} sx={{ fontSize: 12 }} aria-hidden="true" />
              <span className={styles.expandedHudText}>REGISTRO DESTACADO</span>
            </div>

            <div className={styles.expandedHudTopRight}>
              <Straighten className={styles.expandedHudIconTeal} sx={{ fontSize: 12 }} aria-hidden="true" />
              <span className={styles.expandedHudTextTeal}>{bird.size}</span>
            </div>

            <div className={styles.expandedHudBottom}>
              <div>
                <h2 className={styles.expandedBirdName}>{bird.commonName}</h2>
                <p className={styles.expandedBirdScientific}>{bird.scientificName}</p>
              </div>
              <div className={styles.expandedConservationBadge}>
                <span className={styles.expandedConservationText}>{bird.conservationStatus.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className={styles.expandedBody}>
            <p className={styles.expandedDescription}>{bird.behavior}</p>

            <div className={styles.expandedBiometricGrid}>
              <div className={styles.expandedBiometricCell}>
                <span className={styles.expandedBiometricLabel}>Tipo</span>
                <span className={styles.expandedBiometricValueTeal}>{bird.mainType}</span>
              </div>
              <div className={styles.expandedBiometricCell}>
                <span className={styles.expandedBiometricLabel}>Hábitat</span>
                <span className={styles.expandedBiometricValue}>{bird.mainHabitat}</span>
              </div>
              <div className={styles.expandedBiometricCell}>
                <span className={styles.expandedBiometricLabel}>Rareza</span>
                <span className={styles.expandedBiometricValue}>{RARITY_STARS[bird.rarityLevel]}</span>
              </div>
            </div>

            <div className={styles.expandedColorsSection}>
              <h3 className={styles.expandedColorsSectionTitle}>COLORACIÓN</h3>
              <div className={styles.expandedColorsList}>
                {bird.colors.map((color) => (
                  <div key={color} className={styles.expandedColorItem}>
                    <span
                      className={styles.expandedColorDot}
                      style={{ backgroundColor: COLOR_HEX[color.toLowerCase()] ?? '#64748B' } as React.CSSProperties}
                    />
                    <span className={styles.expandedColorLabel}>{color}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.expandedWaveformBox}>
              <div className={styles.expandedWaveformHeader}>
                <div className={styles.expandedWaveformLeft}>
                  <GraphicEq className={styles.expandedWaveIcon} sx={{ fontSize: 16 }} aria-hidden="true" />
                  <span className={styles.expandedWaveLabel}>BIOACÚSTICA • {bird.sound}</span>
                </div>
                <span className={styles.expandedWaveTime}>00:03 / 00:12</span>
              </div>
              <div className={styles.expandedWaveformBars} aria-hidden="true">
                {WAVEFORM_HEIGHTS.map((h, i) => (
                  <span
                    key={i}
                    className={i < 7 ? styles.expandedBarActive : styles.expandedBarInactive}
                    style={{ height: `${h * 4}px` } as React.CSSProperties}
                  />
                ))}
              </div>
            </div>

            <button className={styles.expandedAudioBtn} onClick={handleAudio} type="button" aria-label={`Reproducir sonido de ${bird.commonName}`}>
              <VolumeUp className={styles.expandedAudioIcon} sx={{ fontSize: 18 }} aria-hidden="true" />
              <span>ESCUCHAR SONIDO</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <article className={styles.card}>
      <button
        className={styles.expandBtn}
        onClick={handleToggleExpand}
        type="button"
        aria-label="Expandir"
        title="Expandir"
      >
        <Visibility sx={{ fontSize: 16 }} aria-hidden="true" />
      </button>

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

          <div className={styles.colorsSection}>
            <div className={styles.colorsRow}>
              {colorDots.map((color) => (
                <span
                  key={color}
                  className={styles.colorDot}
                  style={{ backgroundColor: COLOR_HEX[color] ?? '#64748B' } as React.CSSProperties}
                  title={color}
                />
              ))}
            </div>
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
