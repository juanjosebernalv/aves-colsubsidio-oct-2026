'use client'

import { memo } from 'react'
import { LocationOn, Warning, Schedule } from '@mui/icons-material'
import styles from './HourlyBlockTelemetry.module.css'

interface HourlyBlockTelemetryProps {
  hour: number
  detectedCount: number
}

export default memo(function HourlyBlockTelemetry({ hour, detectedCount }: HourlyBlockTelemetryProps) {
  const startTime = String(hour).padStart(2, '0')
  const endTime = String(hour).padStart(2, '0')
  const elapsed = 41 // Mock: 41 minutes 18 seconds elapsed
  const percentComplete = Math.round((elapsed / 60) * 100)

  return (
    <section className={styles.telemetrySection}>
      <div className={styles.topBar}>
        <div className={styles.blockLabel}>
          <div className={styles.pulseIndicator} />
          <span className={styles.blockTitle}>BLOQUE ACTIVO: {startTime}:00 – {endTime}:59 COT</span>
        </div>

        <div className={styles.countdownBox}>
          <Schedule sx={{ fontSize: 18 }} />
          <span className={styles.countdownText}>EN CURSO (18:42 min restantes)</span>
        </div>

        <div className={styles.locationBox}>
          <LocationOn sx={{ fontSize: 18 }} />
          <span className={styles.locationText}>Transecto Reserva Tatamá - Cañón Chocó Andino</span>
          <span className={styles.elevationBadge}>1,400 - 2,450 msnm</span>
        </div>
      </div>

      <div className={styles.actionBar}>
        <button className={styles.voiceBtn}>
          <span className={styles.micIcon}>🎤</span>
          <span>VOUCHER BIOACÚSTICO</span>
        </button>
        <button className={styles.blockBtn}>
          <span className={styles.lockIcon}>🔒</span>
          <span>FORZAR CIERRE Y ABRIR NUEVO BLOQUE (+1H)</span>
        </button>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.warningBox}>
          <Warning sx={{ fontSize: 16 }} />
          <span className={styles.warningText}>ALARMA CIERRE DE BLOQUE: -11 min para consolidar datos eBird</span>
        </div>

        <div className={styles.progressInfo}>
          <span>Inicio: 07:00:00</span>
          <span className={styles.elapsedTime}>Transcurrido: {elapsed}:18 ({percentComplete}%)</span>
          <span>Cierre: 07:59:59</span>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percentComplete}%` }} />
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Especies en el Día (GBD)</p>
          <div className={styles.kpiValue}>
            <span className={styles.number}>24</span>
            <span className={styles.unit}>+14 spp/h prom</span>
          </div>
          <p className={styles.kpiHint}>Meta estación: 45 spp</p>
        </div>

        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Individuos Totales Día</p>
          <div className={styles.kpiValue}>
            <span className={styles.number}>87</span>
            <span className={styles.unit}>ind contados</span>
          </div>
          <p className={styles.kpiHint}>Densidad: 72.5 ind/km</p>
        </div>

        <div className={`${styles.kpiCard} ${styles.activeCard}`}>
          <p className={styles.kpiLabel}>Hora Actual ({startTime}:00 - {startTime}:59)</p>
          <div className={styles.kpiValue}>
            <span className={styles.number}>{detectedCount}</span>
            <span className={styles.unit}>spp</span>
          </div>
          <p className={styles.kpiHint}>Lek y sobrevuelo registrados</p>
        </div>

        <div className={styles.kpiCard}>
          <p className={styles.kpiLabel}>Protocolo eBird</p>
          <div className={styles.kpiValue}>
            <span className={styles.protocolBadge}>OFFLINE LOCAL</span>
            <span className={styles.unit}>Conteo Itinerante</span>
          </div>
          <p className={styles.kpiHint}>Buffer SQLite v3.45 • 0 caídas</p>
        </div>
      </div>
    </section>
  )
})
