'use client'

import { memo, useMemo } from 'react'
import { Schedule, SatelliteAlt, Sync, BatteryChargingFull, Add } from '@mui/icons-material'
import styles from './RegistroHeader.module.css'

export default memo(function RegistroHeader() {
  const telemetry = useMemo(() => {
    const now = new Date()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')

    return {
      time: `${hours}:${minutes}:${seconds}`,
      rtkStatus: '0.04m CEP',
      ebirdQueue: 14,
      battery: 92,
    }
  }, [])

  return (
    <header className={styles.header}>
      <div className={styles.telemetryLeft}>
        <div className={styles.timeBox}>
          <Schedule sx={{ fontSize: 18 }} />
          <span className={styles.timeCode}>COT</span>
          <span className={styles.timeValue}>{telemetry.time}</span>
        </div>

        <div className={styles.rtkBox}>
          <SatelliteAlt sx={{ fontSize: 18 }} />
          <span className={styles.rtkLabel}>RTK FIX:</span>
          <span className={styles.rtkValue}>{telemetry.rtkStatus}</span>
        </div>

        <div className={styles.queueBox}>
          <Sync sx={{ fontSize: 18 }} />
          <span>EBIRD OFFLINE QUEUE:</span>
          <span className={styles.queueCount}>{telemetry.ebirdQueue} LISTAS</span>
        </div>
      </div>

      <div className={styles.telemetryRight}>
        <div className={styles.batteryBox}>
          <BatteryChargingFull sx={{ fontSize: 18 }} />
          <span className={styles.batteryValue}>{telemetry.battery}%</span>
        </div>

        <button className={styles.newRecordBtn}>
          <Add sx={{ fontSize: 16 }} />
          <span>Nuevo Registro</span>
        </button>

        <div className={styles.userInfo}>
          <div className={styles.userDetails}>
            <span className={styles.userName}>L. Morales</span>
            <span className={styles.userRole}>Ornitólogo Líder</span>
          </div>
          <div className={styles.userAvatar}>
            <span>👤</span>
          </div>
        </div>
      </div>
    </header>
  )
})
