'use client'

import { memo, useCallback } from 'react'
import { MenuBook, Tune, GraphicEq, EditNote } from '@mui/icons-material'
import styles from './BottomNav.module.css'

export type NavTab = 'catalog' | 'records'

interface BottomNavProps {
  activeTab: NavTab
  onTabChange: (tab: NavTab) => void
}

export default memo(function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const handleCatalog = useCallback(() => onTabChange('catalog'), [onTabChange])
  const handleRecords = useCallback(() => onTabChange('records'), [onTabChange])

  return (
    <nav className={styles.nav} aria-label="Navegación principal">
      <div className={styles.inner}>
        <button
          className={activeTab === 'catalog' ? styles.itemActive : styles.item}
          onClick={handleCatalog}
          aria-label="Catálogo"
          aria-current={activeTab === 'catalog' ? 'page' : undefined}
          type="button"
        >
          <MenuBook sx={{ fontSize: 22 }} aria-hidden="true" />
          <span className={styles.label}>Catálogo</span>
        </button>

        <button className={styles.itemDisabled} aria-label="Filtros" disabled type="button">
          <Tune sx={{ fontSize: 22 }} aria-hidden="true" />
          <span className={styles.label}>Filtros</span>
        </button>

        <button className={styles.itemDisabled} aria-label="Acústica" disabled type="button">
          <GraphicEq sx={{ fontSize: 22 }} aria-hidden="true" />
          <span className={styles.label}>Acústica</span>
        </button>

        <button
          className={activeTab === 'records' ? styles.itemActive : styles.item}
          onClick={handleRecords}
          aria-label="Registros"
          aria-current={activeTab === 'records' ? 'page' : undefined}
          type="button"
        >
          <EditNote sx={{ fontSize: 22 }} aria-hidden="true" />
          <span className={styles.label}>Registros</span>
        </button>
      </div>
    </nav>
  )
})
