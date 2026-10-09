'use client'

import { memo } from 'react'
import { Radar, NaturePeople, TableChart, MenuBook, GraphicEq, Polyline, Analytics } from '@mui/icons-material'
import styles from './RegistroSidebar.module.css'

const navigationItems = [
  { label: 'Estación de Campo', icon: NaturePeople, path: '#' },
  { label: 'Planillas de Conteo Horario', icon: TableChart, path: '#', active: true },
  { label: 'Catálogo Morfológico', icon: MenuBook, path: '#' },
  { label: 'Bioacústica & Espectrograma', icon: GraphicEq, path: '#' },
  { label: 'Transectos & Rutas GPS', icon: Polyline, path: '#' },
  { label: 'Dashboard Resultados GBD', icon: Analytics, path: '#' },
]

export default memo(function RegistroSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.brandIcon}>
          <Radar sx={{ fontSize: 18, color: 'currentColor' }} />
        </div>
        <div className={styles.brandText}>
          <h2 className={styles.brandTitle}>AvesColombia</h2>
          <p className={styles.brandSubtitle}>Expedición GBD 2025</p>
        </div>
      </div>

      <div className={styles.statusCard}>
        <span className={styles.statusLabel}>ESTADO NODO</span>
        <span className={styles.statusValue}>ACTIVO RTK</span>
      </div>

      <nav className={styles.navigation}>
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href={item.path}
              className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
            >
              <Icon sx={{ fontSize: 20 }} />
              <span>{item.label}</span>
            </a>
          )
        })}
      </nav>

      <div className={styles.footer}>
        <div className={styles.cacheCard}>
          <div className={styles.cacheInfo}>
            <p className={styles.cacheLabel}>MEMORIA CACHÉ</p>
            <p className={styles.cacheValue}>4.8 GB / OFFLINE</p>
          </div>
        </div>
        <div className={styles.version}>
          <span>V2.4.9 BIO-OS</span>
          <span>CHOCÓ-ANDES</span>
        </div>
      </div>
    </aside>
  )
})
