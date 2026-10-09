'use client'

import { memo } from 'react'
import { Cloud as CloudIcon, CloudOff as CloudOffIcon } from '@mui/icons-material'
import { useApp } from '@/context/AppContext'
import styles from './SyncStatus.module.css'

function SyncStatus() {
  const { isOnline, totalBirds, pendingBirds } = useApp()

  return (
    <div className={styles.container}>
      <span className={`${styles.badge} ${isOnline ? styles.online : styles.offline}`}>
        {isOnline
          ? <CloudIcon sx={{ fontSize: 16 }} />
          : <CloudOffIcon sx={{ fontSize: 16 }} />
        }
        {isOnline ? 'En línea' : 'Sin conexión'}
      </span>

      {totalBirds > 0 && (
        <span className={`${styles.badge} ${styles.storage}`}>
          💾 {totalBirds} registro{totalBirds !== 1 ? 's' : ''}
        </span>
      )}

      {pendingBirds > 0 && (
        <span className={`${styles.badge} ${styles.pending}`}>
          ⏳ {pendingBirds} por sincronizar
        </span>
      )}
    </div>
  )
}

export default memo(SyncStatus)
