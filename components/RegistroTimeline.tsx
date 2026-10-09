'use client'

import { memo } from 'react'
import { CalendarToday, CheckCircle } from '@mui/icons-material'
import styles from './RegistroTimeline.module.css'

const hourlyData = [
  { hour: 5, species: 8, individuals: 19, closed: true },
  { hour: 6, species: 14, individuals: 36, closed: true, active: true },
  { hour: 7, species: 6, individuals: 16, closed: false },
]

export default memo(function RegistroTimeline() {
  return (
    <div className={styles.timeline}>
      <div className={styles.timelineHeader}>
        <div className={styles.headerTop}>
          <CalendarToday sx={{ fontSize: 20 }} />
          <h3 className={styles.timelineTitle}>Cronología Horaria GBD</h3>
        </div>
        <span className={styles.fullDayBadge}>DÍA COMPLETO</span>
      </div>

      <div className={styles.blocksList}>
        {hourlyData.map((data, index) => (
          <div
            key={index}
            className={`${styles.blockItem} ${data.closed ? styles.blockClosed : ''} ${data.active ? styles.blockActive : ''}`}
          >
            <div className={styles.blockCheck}>
              {data.closed && <CheckCircle sx={{ fontSize: 18 }} />}
            </div>

            <div className={styles.blockInfo}>
              <h4 className={styles.blockTime}>
                {String(data.hour).padStart(2, '0')}:00 – {String(data.hour).padStart(2, '0')}:59 COT
              </h4>
              <p className={styles.blockPhase}>
                {data.hour === 5 && 'Alba & Coro Crepuscular'}
                {data.hour === 6 && 'Pico de Forrajeo Matutino'}
                {data.hour === 7 && 'Actividad Diurna'}
              </p>
            </div>

            <div className={styles.blockStats}>
              <span className={styles.statNumber}>{data.species} spp • {data.individuals} ind</span>
              {data.closed && <p className={styles.blockAction}>Revisar checklist →</p>}
              {data.active && <span className={styles.activeLabel}>Referencia Activa</span>}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.chartsSection}>
        <h4 className={styles.chartsTitle}>Abundancia por Familia (últimas 2 horas)</h4>

        <div className={styles.familyChart}>
          <div className={styles.chartRow}>
            <span className={styles.familyName}>Cotingidae</span>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{ width: '45%' }} />
              <span className={styles.barLabel}>4 spp</span>
            </div>
          </div>

          <div className={styles.chartRow}>
            <span className={styles.familyName}>Trochilidae</span>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{ width: '65%' }} />
              <span className={styles.barLabel}>5 spp</span>
            </div>
          </div>

          <div className={styles.chartRow}>
            <span className={styles.familyName}>Ramphastidae</span>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{ width: '30%' }} />
              <span className={styles.barLabel}>2 spp</span>
            </div>
          </div>

          <div className={styles.chartRow}>
            <span className={styles.familyName}>Momotidae</span>
            <div className={styles.barContainer}>
              <div className={styles.bar} style={{ width: '25%' }} />
              <span className={styles.barLabel}>1 spp</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.syncSection}>
        <h4 className={styles.syncTitle}>Estado de Sincronización</h4>
        <div className={styles.syncStatus}>
          <div className={styles.syncItem}>
            <span className={styles.syncLabel}>Registros Locales:</span>
            <span className={styles.syncValue}>18 listas</span>
          </div>
          <div className={styles.syncItem}>
            <span className={styles.syncLabel}>Pendiente de Envío:</span>
            <span className={styles.syncValueAlert}>14 listas</span>
          </div>
          <div className={styles.syncItem}>
            <span className={styles.syncLabel}>Sincronizado:</span>
            <span className={styles.syncValueSuccess}>4 listas</span>
          </div>
        </div>
        <button className={styles.syncBtn}>⬆ SINCRONIZAR AHORA</button>
      </div>
    </div>
  )
})
