'use client'

import { memo } from 'react'
import { CloudOff, CloudDone } from '@mui/icons-material'
import styles from './TelemetryBar.module.css'

interface TelemetryBarProps {
  totalBirds: number
  isOnline: boolean
}

export default memo(function TelemetryBar({ totalBirds, isOnline }: TelemetryBarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.dot} />
        <span className={styles.ecoLabel}>MODO ECO-CAMPO ACTIVO</span>
        <span className={styles.sep}>•</span>
        <span className={styles.oledLabel}>98% OLED NEGRO</span>
      </div>
      <div className={styles.right}>
        {isOnline
          ? <CloudDone className={styles.cloudIcon} sx={{ fontSize: 14 }} aria-hidden="true" />
          : <CloudOff className={styles.cloudIcon} sx={{ fontSize: 14 }} aria-hidden="true" />
        }
        <span className={styles.cacheLabel}>
          {totalBirds} SPP CACHÉ {isOnline ? 'ONLINE' : 'OFFLINE'}
        </span>
      </div>
    </div>
  )
})
