'use client'

import { memo, useCallback } from 'react'
import { Landscape, Flare, RestartAlt } from '@mui/icons-material'
import styles from './FilterChips.module.css'

interface FilterChipsProps {
  endemicOnly: boolean
  onToggleEndemic: () => void
  onReset: () => void
}

export default memo(function FilterChips({ endemicOnly, onToggleEndemic, onReset }: FilterChipsProps) {
  const handleToggle = useCallback(() => onToggleEndemic(), [onToggleEndemic])
  const handleReset = useCallback(() => onReset(), [onReset])

  return (
    <div className={styles.row}>
      <button
        className={endemicOnly ? styles.chipActive : styles.chipInactive}
        onClick={handleToggle}
        type="button"
      >
        {endemicOnly && <span className={styles.activeDot} aria-hidden="true" />}
        <span>⭐ Solo Endémicas</span>
        {endemicOnly && <span className={styles.countBadge}>1</span>}
      </button>

      <button className={styles.chipInactive} type="button" disabled>
        <Landscape className={styles.chipIcon} sx={{ fontSize: 14 }} aria-hidden="true" />
        <span>Hábitat: Piscilago</span>
      </button>

      <button className={styles.chipInactive} type="button" disabled>
        <Flare className={styles.chipIcon} sx={{ fontSize: 14 }} aria-hidden="true" />
        <span>Colorido</span>
      </button>

      <button className={styles.chipReset} onClick={handleReset} type="button">
        <RestartAlt className={styles.chipIcon} sx={{ fontSize: 14 }} aria-hidden="true" />
        <span>Restablecer</span>
      </button>
    </div>
  )
})
