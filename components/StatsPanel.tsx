'use client'

import { memo } from 'react'
import { useApp } from '@/context/AppContext'
import styles from './StatsPanel.module.css'

const STATS_CONFIG = [
  { key: 'total' as const, icon: '🐦', label: 'Total de Aves', cardClass: 'cardPrimary' as const },
  { key: 'today' as const, icon: '📅', label: 'Hoy', cardClass: 'cardSecondary' as const },
  { key: 'synced' as const, icon: '✅', label: 'Sincronizadas', cardClass: 'cardSuccess' as const },
]

function StatsPanel() {
  const { totalBirds, todayBirds, syncedBirds } = useApp()

  const values = { total: totalBirds, today: todayBirds, synced: syncedBirds }

  return (
    <div className={styles.grid}>
      {STATS_CONFIG.map(({ key, icon, label, cardClass }) => (
        <div key={key} className={`${styles.card} ${styles[cardClass]}`}>
          <div className={styles.cardBody}>
            <div>
              <p className={styles.cardLabel}>{label}</p>
              <p className={styles.cardValue}>{values[key]}</p>
            </div>
            <div className={styles.cardIcon}>{icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default memo(StatsPanel)
