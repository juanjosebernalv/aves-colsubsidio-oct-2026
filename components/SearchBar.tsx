'use client'

import { memo, useCallback, type ChangeEvent } from 'react'
import { Search, GraphicEq, PhotoCamera } from '@mui/icons-material'
import styles from './SearchBar.module.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onToast: (message: string) => void
}

export default memo(function SearchBar({ value, onChange, onToast }: SearchBarProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  )

  const handleAcoustic = useCallback(() => {
    onToast('Escuchando bioacústica ambiental...')
  }, [onToast])

  const handleVisual = useCallback(() => {
    onToast('Iniciando sensor óptico de campo...')
  }, [onToast])

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputRow}>
        <Search className={styles.searchIcon} sx={{ fontSize: 20 }} aria-hidden="true" />
        <input
          className={styles.input}
          type="search"
          placeholder="Buscar especie, binomio latino o familia..."
          value={value}
          onChange={handleChange}
          aria-label="Buscar aves"
        />
        <div className={styles.actions}>
          <button
            className={styles.actionBtn}
            aria-label="Detección Bioacústica"
            onClick={handleAcoustic}
            type="button"
          >
            <GraphicEq sx={{ fontSize: 18 }} aria-hidden="true" />
          </button>
          <button
            className={styles.actionBtnMuted}
            aria-label="Escaneo Visual Óptico"
            onClick={handleVisual}
            type="button"
          >
            <PhotoCamera sx={{ fontSize: 18 }} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
})
