'use client'

import { memo } from 'react'
import { ArrowBack, Search, GraphicEq } from '@mui/icons-material'
import styles from './AppHeader.module.css'

export default memo(function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <button className={styles.backBtn} aria-label="Atrás" type="button">
          <ArrowBack sx={{ fontSize: 20 }} aria-hidden="true" />
        </button>
        <div className={styles.titleStack}>
          <h1 className={styles.title}>LISTA AVES</h1>
          <p className={styles.subtitle}>ARF 326</p>
        </div>
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Búsqueda" type="button">
            <Search sx={{ fontSize: 20 }} aria-hidden="true" />
          </button>
          <button className={styles.iconBtnMuted} aria-label="Detección Acústica" type="button">
            <GraphicEq sx={{ fontSize: 20 }} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className={styles.subtitle2}>CATALOGO DE AVES</div>
    </header>
  )
})
